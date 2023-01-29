import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { SentryService } from '@ntegral/nestjs-sentry';
import axios, { AxiosInstance } from 'axios';
import * as config from 'config';
import { Agent } from 'https';

import { Exceptions } from '../../common/exceptions';
import { getGender } from '../../common/lib/util';
import { OauthProvider } from '../enum';
import {
  IAccessToken,
  INaverProfile,
  INaverProfileResponse,
  ISocialAccessToken,
  ISocialProfile,
  ISocialProvider,
} from '../interface';

@Injectable()
export class NaverService implements ISocialProvider {
  private readonly axiosInstance: AxiosInstance;
  private readonly clientId = config.get<string>('oauth.naver.id');
  private readonly clientSecret = config.get<string>('oauth.naver.secret');
  private readonly accessTokenUrl = 'https://nid.naver.com/oauth2.0/token';
  private readonly profileUrl = 'https://openapi.naver.com/v1/nid/me';

  constructor(private readonly sentry: SentryService) {
    const httpsAgent = new Agent({ keepAlive: true });
    this.axiosInstance = axios.create({ httpsAgent });
  }

  async getAccessTokenByCode(callbackUrl: string, code: string, state: string) {
    return this.axiosInstance
      .get<IAccessToken>(this.accessTokenUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_uri: callbackUrl,
          grant_type: 'authorization_code',
          state,
          code,
        },
      })
      .then((response) => {
        if (!response.data?.access_token) {
          throw new ServiceUnavailableException(
            `${OauthProvider.NAVER}에서 Access Token을 받아올 수 없습니다.`,
          );
        }
        return response.data.access_token;
      })
      .catch((err) => {
        this.sentry.instance().captureException(err);
        throw Exceptions.socialError;
      });
  }

  async getProviderProfile(args: ISocialAccessToken): Promise<INaverProfile> {
    return this.axiosInstance
      .get<INaverProfileResponse>(this.profileUrl, {
        headers: {
          Authorization: `Bearer ${args.socialAccessToken}`,
        },
      })
      .then((response) => {
        if (!response.data?.response) {
          throw new ServiceUnavailableException(
            `${OauthProvider.NAVER}에서 사용자 프로필을 받아올 수 없습니다.`,
          );
        }
        return response.data.response;
      })
      .catch((err) => {
        this.sentry.instance().captureException(err);
        throw Exceptions.socialError;
      });
  }

  getSocialProfile(profile: INaverProfile): ISocialProfile {
    return {
      snsId: profile.id,
      email: profile.email,
      gender: getGender(profile?.gender),
      birthYear: profile?.birthyear ? +profile.birthyear : undefined,
    };
  }

  async disconnect(socialAccessToken: string) {
    return this.axiosInstance
      .get(this.accessTokenUrl, {
        params: {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'delete',
          access_token: socialAccessToken,
          service_provider: 'NAVER', // https://developers.naver.com/forum/posts/21714
        },
      })
      .then((response) => {
        if (response.data?.error) {
          throw new ServiceUnavailableException(response.data.error);
        }
        return response;
      })
      .catch((err) => {
        this.sentry.instance().captureException(err);
      });
  }
}
