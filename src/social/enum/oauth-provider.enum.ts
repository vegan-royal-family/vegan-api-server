import { registerEnumType } from '@nestjs/graphql';

export enum OauthProvider {
  GOOGLE = 'google',
  KAKAO = 'kakao',
  NAVER = 'naver',
}
registerEnumType(OauthProvider, { name: 'OauthProvider' });
