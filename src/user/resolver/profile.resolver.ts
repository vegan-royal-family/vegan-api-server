import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AddUserProfileArgs } from '../dto/add-user-profile.args';
import { Profile } from '../entity';
import { UserService } from '../user.service';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean)
  async addUserProfile(@Args() args: AddUserProfileArgs) {
    return this.userService.addUserProfile(args);
  }
}
