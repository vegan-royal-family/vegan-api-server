import { OauthProvider } from '../enum';

export interface ISocialAccessToken {
  oauthProvider: OauthProvider;
  socialAccessToken: string;
}
