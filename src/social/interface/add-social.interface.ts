import { OauthProvider } from '../enum';

export interface IAddSocial {
  userId: number;
  socialId: string;
  socialProvider: OauthProvider;
  socialIdToken: string;
}
