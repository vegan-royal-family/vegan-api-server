import { ForbiddenException, Injectable, NotImplementedException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { AuthService } from '../../auth/auth.service';
import { Role } from '../../common/enum';
import { UserService } from '../../user/user.service';
import { socialCallbackUrl } from '../constant';
import { LoginType, OauthProvider } from '../enum';
import {
  ISocialAccessToken,
  ISocialCode,
  ISocialLoginResponse,
  ISocialProfile,
  ISocialProvider,
  ISocialProviderProfile,
} from '../interface';
import { IAddUserAndSocial } from '../interface/add-user-and-social.interface';
import { GoogleService } from '../provider/google.service';
import { KakaoService } from '../provider/kakao.service';
import { NaverService } from '../provider/naver.service';
import { SocialService } from './social.service';

@Injectable()
export class SocialFactoryService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly socialService: SocialService,
    private readonly kakaoService: KakaoService,
    private readonly googleService: GoogleService,
    private readonly naverService: NaverService,
  ) {}

  private of(oauthProvider: OauthProvider): ISocialProvider {
    switch (oauthProvider) {
      case OauthProvider.KAKAO:
        return this.kakaoService;
      case OauthProvider.GOOGLE:
        return this.googleService;
      case OauthProvider.NAVER:
        return this.naverService;
      default:
        throw new ForbiddenException();
    }
  }

  /**
   * apple, google에서는 바로 accessToken이 반환되어서 사용하지 않음
   */
  async getAccessTokenByCode(args: ISocialCode) {
    const callbackUrl = `${socialCallbackUrl}/${args.oauthProvider}/callback`;
    const provider = this.of(args.oauthProvider);
    if (!provider.getAccessTokenByCode) {
      throw new NotImplementedException();
    }

    return provider.getAccessTokenByCode(callbackUrl, args.code, args.state);
  }

  async getProviderProfile(args: ISocialAccessToken): Promise<ISocialProviderProfile> {
    return this.of(args.oauthProvider).getProviderProfile(args);
  }

  getSocialProfile(oauthProvider: OauthProvider, profile: ISocialProviderProfile): ISocialProfile {
    return this.of(oauthProvider).getSocialProfile(profile);
  }

  async socialLogin(args: ISocialAccessToken): Promise<ISocialLoginResponse> {
    const providerProfile = await this.getProviderProfile(args);
    const profile = this.getSocialProfile(args.oauthProvider, providerProfile);

    const loginInfoBySocialId = await this.getLoginInfoBySocialId(profile.snsId);
    if (loginInfoBySocialId) {
      return loginInfoBySocialId;
    }

    const loginInfoByEmail = await this.getLoginInfoByEmail(profile.email);
    if (loginInfoByEmail) {
      return loginInfoByEmail;
    }

    return this.addUserAndSocial({ email: profile.email, loginInfo: args, profile });
  }

  private async getLoginInfoBySocialId(socialId: string) {
    const social = await this.socialService.getSocialBySnsId(socialId);
    if (!social) {
      return null;
    }

    const newToken = this.authService.signJsonWebToken(social.userId, Role.USER);
    return { ...newToken, userId: social.userId, type: LoginType.LOGIN };
  }

  private async getLoginInfoByEmail(email: string) {
    const kinoUser = await this.userService.getUserByEmail(email);
    if (!kinoUser) {
      return null;
    }

    const newToken = this.authService.signJsonWebToken(kinoUser.id, Role.USER);
    return { ...newToken, type: LoginType.LOGIN, userId: kinoUser.id };
  }

  @Transactional()
  private async addUserAndSocial(args: IAddUserAndSocial) {
    const { email, profile, loginInfo } = args;
    const newUser = await this.userService.addUser({ email: email.toLowerCase(), role: Role.USER });

    await this.socialService.addSocial({
      userId: newUser.id,
      socialId: profile.snsId,
      socialProvider: loginInfo.oauthProvider,
      socialIdToken: loginInfo.socialAccessToken,
    });

    const newToken = this.authService.signJsonWebToken(newUser.id, Role.USER);
    return { ...newToken, type: LoginType.SIGNUP, userId: newUser.id };
  }

  async disconnectSocialLinkByWithdrawal(userId: number) {
    const socials = await this.socialService.getSocialByUserId(userId);
    for (const social of socials) {
      if (!social.socialIdToken) {
        continue;
      }

      // TODO: 각 소셜 프로바이더 서비스에서 MQ를 이용해 비동기적으로 소셜 연결 해제가 처리되어야 함
      this.of(social.socialProvider).disconnect?.(social.socialIdToken, social.socialId);
    }
    return true;
  }
}
