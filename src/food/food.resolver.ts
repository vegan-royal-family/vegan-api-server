import { Resolver } from '@nestjs/graphql';
import { FoodService } from './food.service';

@Resolver()
export class FoodResolver {
  constructor(private readonly foodService: FoodService) {}
}
