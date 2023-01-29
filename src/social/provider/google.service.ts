import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { SentryService } from '@ntegral/nestjs-sentry';
import axios, { AxiosInstance } from 'axios';
import { Agent } from 'https';

import { Exceptions } from '../../common/exceptions';
import { OauthProvider } from '../enum';
import { IGoogleProfile, ISocialAccessToken, ISocialProfile, ISocialProvider } from '../interface';

@Injectable()
export class GoogleService implements ISocialProvider {
  private readonly axiosInstance: AxiosInstance;
  private readonly baseUrl = 'https://www.googleapis.com';
  private readonly profileUrl = '/oauth2/v3/userinfo';
  private readonly disconnectUrl = '/revoke';

  constructor(private readonly sentry: SentryService) {
    const httpsAgent = new Agent({ keepAlive: true });
    this.axiosInstance = axios.create({ httpsAgent });
  }

  async getProviderProfile(args: ISocialAccessToken) {
    return this.axiosInstance
      .get<IGoogleProfile>(`${this.baseUrl}${this.profileUrl}`, {
        headers: {
          Authorization: `Bearer ${args.socialAccessToken}`,
        },
      })
      .then((response) => {
        if (!response.data) {
          throw new ServiceUnavailableException(
            `${OauthProvider.GOOGLE}에서 사용자 프로필을 받아올 수 없습니다.`,
          );
        }
        return response.data;
      })
      .catch((err) => {
        this.sentry.instance().captureException(err);
        throw Exceptions.socialError;
      });
  }

  getSocialProfile(profile: IGoogleProfile): ISocialProfile {
    return { snsId: profile.sub, email: profile.email };
  }

  async disconnect(socialAccessToken: string) {
    return this.axiosInstance
      .delete(`${this.baseUrl}${this.disconnectUrl}`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        params: {
          token: socialAccessToken,
        },
      })
      .catch((err) => this.sentry.instance().captureException(err));
  }
}
