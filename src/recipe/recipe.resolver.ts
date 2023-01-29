import { Resolver } from '@nestjs/graphql';

import { RecipeService } from './recipe.service';

@Resolver()
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}
}
