import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { OauthProvider } from '../enum';

@ArgsType()
export class SocialAccessTokenArgs {
  @IsEnum(OauthProvider)
  @Field(() => OauthProvider)
  oauthProvider: OauthProvider;

  @IsNotEmpty({ message: 'accessToken은 필수입니다.' })
  @IsString()
  @Field()
  socialAccessToken: string;
}
