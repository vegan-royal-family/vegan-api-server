import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { OauthProvider } from '../enum';

@ArgsType()
export class SocialCodeArgs {
  @IsEnum(OauthProvider)
  @Field(() => OauthProvider)
  oauthProvider: OauthProvider;

  @IsNotEmpty({ message: 'code는 필수입니다.' })
  @IsString()
  @Field()
  code: string;

  @IsNotEmpty({ message: 'state는 필수입니다.' })
  @IsString()
  @Field()
  state: string;
}
