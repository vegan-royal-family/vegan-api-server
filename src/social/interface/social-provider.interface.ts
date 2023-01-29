import { ISocialAccessToken } from './social-access-token.interface';
import { ISocialProfile } from './social-profile.interface';
import { ISocialProviderProfile } from './social-provider-profile.interface';

export interface ISocialProvider {
  getAccessTokenByCode?(callbackUrl: string, code: string, state?: string): Promise<string>;
  getProviderProfile(args: ISocialAccessToken): Promise<ISocialProviderProfile>;
  getSocialProfile(profile: ISocialProviderProfile): ISocialProfile;
  disconnect?(socialAccessToken: string, socialId?: string): void;
}
