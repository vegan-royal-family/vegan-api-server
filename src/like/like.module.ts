import { RecipeRepository } from './../recipe/repository/recipe.repository';
import { RestaurantRepository } from './../restaurant/repository/restaurant.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikeResolver } from './like.resolver';
import { LikeService } from './like.service';
import { LikeRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([LikeRepository, RestaurantRepository, RecipeRepository])],
  providers: [LikeResolver, LikeService],
})
export class LikeModule {}
