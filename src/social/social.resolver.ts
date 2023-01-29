import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SocialAccessTokenArgs, SocialCodeArgs, SocialLoginOutput } from './dto';
import { SocialFactoryService } from './service/social-factory.service';

@Resolver()
export class SocialResolver {
  constructor(private readonly socialFactoryService: SocialFactoryService) {}

  @Query(() => String)
  async socialAccessToken(@Args() args: SocialCodeArgs) {
    return this.socialFactoryService.getAccessTokenByCode(args);
  }

  @Mutation(() => SocialLoginOutput)
  async socialLogin(@Args() args: SocialAccessTokenArgs) {
    return this.socialFactoryService.socialLogin(args);
  }
}
