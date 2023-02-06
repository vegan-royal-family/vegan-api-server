import { RecipeRepository } from './../recipe/repository/recipe.repository';
import { RestaurantRepository } from './../restaurant/repository/restaurant.repository';
import { LikeRepository } from './repository/like.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { LikeService } from './like.service';
import { MockLikeRepository } from '../../test/repository/like.repository.mock';
import { MockRestaurantRepository } from '../../test/repository/restaurant.repository.mock';
import { MockRecipeRepository } from '../../test/repository/recipe.repository.mock';

describe('LikeService', () => {
  let service: LikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikeService,
        {
          provide: LikeRepository,
          useValue: MockLikeRepository(),
        },
        {
          provide: RestaurantRepository,
          useValue: MockRestaurantRepository(),
        },
        {
          provide: RecipeRepository,
          useValue: MockRecipeRepository(),
        },
      ],
    }).compile();

    service = module.get<LikeService>(LikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
