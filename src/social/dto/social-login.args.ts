import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';

import { SocialAccessTokenArgs } from './social-access-token.args';

@ArgsType()
export class SocialLoginArgs extends SocialAccessTokenArgs {
  @IsOptional()
  @IsEmail()
  @Field({ nullable: true })
  email?: string;
}
