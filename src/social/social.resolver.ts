import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SocialCodeArgs, SocialLoginArgs, SocialLoginOutput } from './dto';
import { SocialFactoryService } from './service/social-factory.service';

@Resolver()
export class SocialResolver {
  constructor(private readonly socialFactoryService: SocialFactoryService) {}

  @Query(() => String)
  async socialAccessToken(@Args() args: SocialCodeArgs) {
    return this.socialFactoryService.getAccessTokenByCode(args);
  }

  @Mutation(() => SocialLoginOutput)
  async socialLogin(@Args() args: SocialLoginArgs) {
    return this.socialFactoryService.socialLogin(args);
  }
}
