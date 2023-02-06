import { Profile } from './../user/entity/profile.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Role } from 'src/common/enum/role.enum';
import { Review } from 'src/review/entity/review.entity';
import { User } from 'src/user/entity';
import { DoUndoLikeInput, DoUndoLikeOutput } from './dtos/doLike.dto';
import { Like } from './entity/like.entity';

import { LikeService } from './like.service';

const USER: User = {
  id: 3,
  email: 'test@naver.com',
  role: Role.USER,
  reportedCount: 0,
  reviewCount: 0,
  recipeCount: 0,
  likeCount: 0,
  visitCount: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
  reviews: [],
  likes: [],
  visits: [],
  recipes: [],
  socials: [],
  profile: new Profile(),
};

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Mutation((returns) => DoUndoLikeOutput)
  doUndoLike(@Args('input') doLikeInput: DoUndoLikeInput): Promise<DoUndoLikeOutput> {
    return this.likeService.doUndoLike(doLikeInput, USER);
  }
}
