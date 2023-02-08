import { RecipeRepository } from './../recipe/repository/recipe.repository';
import { RestaurantRepository } from './../restaurant/repository/restaurant.repository';
import { LikeRepository } from './repository/like.repository';
import { DoUndoLikeOutput, DoUndoLikeInput } from './dtos/doLike.dto';
import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { LikeTarget } from './enum/like.enum';
import { Exceptions } from '../common/exceptions';
import { User } from '../user/entity';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly restaurantRepository: RestaurantRepository,
    private readonly recipeRepository: RecipeRepository,
  ) {}

  async doUndoLike(doUndoLikeInput: DoUndoLikeInput, user: User): Promise<DoUndoLikeOutput> {
    doUndoLikeInput.userId = user.id;

    try {
      const existLike = await this.likeRepository.getLikeByInput(doUndoLikeInput);
      if (existLike) {
        await this.undoLike(doUndoLikeInput);
        return {
          ok: true,
          result: 'Undo Like',
        };
      }
      await this.createLike(doUndoLikeInput);

      return {
        ok: true,
        result: 'Do Like',
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  @Transactional()
  async createLike(doLikeInput: DoUndoLikeInput): Promise<void> {
    await this.likeRepository.createLike(doLikeInput);
    await this.plusLikeTarget(doLikeInput.target, doLikeInput.targetId, true);
    return;
  }

  @Transactional()
  async undoLike(undoLikeInput: DoUndoLikeInput) {
    await this.likeRepository.deleteLike(undoLikeInput);
    await this.plusLikeTarget(undoLikeInput.target, undoLikeInput.targetId, false);
    return;
  }

  async plusLikeTarget(target: LikeTarget, targetId: string, type: boolean): Promise<void> {
    try {
      switch (target) {
        case LikeTarget.RESTAURANT:
          const restaurant = await this.restaurantRepository.getRestaurantById(+targetId);
          if (!restaurant) throw Exceptions.notFoundLiketarget;

          if (type) restaurant.likeCount++;
          else restaurant.likeCount <= 0 ? (restaurant.likeCount = 0) : restaurant.likeCount--;

          await this.restaurantRepository.saveWithRestaurant(restaurant);
          break;
        case LikeTarget.RECIPE:
          const recipe = await this.recipeRepository.getRecipeById(+targetId);
          if (!recipe) throw Exceptions.notFoundLiketarget;
          //recipe entity에 likeCount 미존재
          break;
      }
      return;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
