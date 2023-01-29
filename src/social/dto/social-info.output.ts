import { Field, ObjectType } from '@nestjs/graphql';

import { OauthProvider } from '../../social/enum';

@ObjectType()
export class SocialInfoOutput {
  @Field({ nullable: true })
  email: string;

  @Field(() => [OauthProvider])
  linkedSocialProviders: OauthProvider[];
}
