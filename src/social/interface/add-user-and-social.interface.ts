import { ISocialAccessToken } from './social-access-token.interface';
import { ISocialProfile } from './social-profile.interface';

export interface IAddUserAndSocial {
  email: string;
  loginInfo: ISocialAccessToken;
  profile: ISocialProfile;
}
