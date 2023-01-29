import { LoginType } from '../enum';

export interface ISocialLoginResponse {
  accessToken: string;
  refreshToken: string;
  type: LoginType;
}
