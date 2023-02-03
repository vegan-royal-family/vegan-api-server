import { registerEnumType } from '@nestjs/graphql';

export enum OauthProvider {
  APPLE = 'apple',
  GOOGLE = 'google',
  KAKAO = 'kakao',
}
registerEnumType(OauthProvider, { name: 'OauthProvider' });
