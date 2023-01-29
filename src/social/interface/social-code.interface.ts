import { OauthProvider } from '../enum';

export interface ISocialCode {
  oauthProvider: OauthProvider;
  code: string;
  state: string;
}
