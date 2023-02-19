import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { SentryService } from '@ntegral/nestjs-sentry';
import axios, { AxiosInstance } from 'axios';
import * as config from 'config';
import { Agent } from 'https';

import { Exceptions } from '../../common/exceptions';
import { OauthProvider } from '../enum';
import {
  IAccessToken,
  IKakaoProfile,
  ISocialAccessToken,
  ISocialProfile,
  ISocialProvider,
} from '../interface';

@Injectable()
export class KakaoService implements ISocialProvider {
  private readonly axiosInstance: AxiosInstance;
  private readonly clientId = config.get<string>('oauth.kakao.id');
  private readonly clientSecret = config.get<string>('oauth.kakao.secret');
  private readonly baseAuthUrl = 'https://kauth.kakao.com';
  private readonly baseApiUrl = 'https://kapi.kakao.com';
  private readonly accessTokenUrl = '/oauth/token';
  private readonly profileUrl = '/v2/user/me';
  private readonly disconnectUrl = '/v1/user/unlink';

  constructor(private readonly sentry: SentryService) {
    const httpsAgent = new Agent({ keepAlive: true });
    this.axiosInstance = axios.create({ httpsAgent });
  }

  /**
   * 카카오 액세스 토큰 에러 관련 문서
   *
   * @see {@link https://developers.kakao.com/docs/latest/ko/kakaologin/trouble-shooting#token}
   */
  async getAccessTokenByCode(callbackUrl: string, code: string) {
    return this.axiosInstance
      .get<IAccessToken>(`${this.baseAuthUrl}${this.accessTokenUrl}`, {
        params: {
          client_id: this.clientId,
          redirect_uri: callbackUrl,
          grant_type: 'authorization_code',
          client_secret: this.clientSecret,
          code,
        },
      })
      .then((response) => {
        if (!response.data?.access_token) {
          throw new ServiceUnavailableException(
            `${OauthProvider.KAKAO}에서 Access Token을 받아올 수 없습니다.`,
          );
        }
        return response.data.access_token;
      })
      .catch((err) => {
        const expectedErrorCodes = ['KOE320'];
        const kakaoErrorCode = err.response.data.error_code;

        if (expectedErrorCodes.includes(kakaoErrorCode)) {
          throw Exceptions.socialError;
        }

        this.sentry.instance().captureException(err);
        throw Exceptions.socialError;
      });
  }

  async getProviderProfile<IKakaoProfile>(args: ISocialAccessToken) {
    return this.axiosInstance
      .get<IKakaoProfile>(`${this.baseApiUrl}${this.profileUrl}`, {
        headers: {
          Authorization: `Bearer ${args.socialAccessToken}`,
        },
      })
      .then((response) => {
        if (!response.data) {
          throw new ServiceUnavailableException(
            `${OauthProvider.KAKAO}에서 사용자 프로필을 받아올 수 없습니다.`,
          );
        }
        return response.data;
      })
      .catch((err) => {
        this.sentry.instance().captureException(err);
        throw Exceptions.socialError;
      });
  }

  getSocialProfile(profile: IKakaoProfile): ISocialProfile {
    return { snsId: profile.id, email: profile.kakao_account?.email ?? '' };
  }

  async disconnect(socialAccessToken: string) {
    return this.axiosInstance
      .post(`${this.baseApiUrl}${this.disconnectUrl}`, undefined, {
        headers: {
          Authorization: `Bearer ${socialAccessToken}`,
        },
      })
      .catch((err) => {
        this.sentry.instance().captureException(err);
      });
  }
}
