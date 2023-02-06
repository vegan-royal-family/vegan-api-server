import { EntityRepository, Repository } from 'typeorm';
import { Recipe } from '../entity';

@EntityRepository(Recipe)
export class RecipeRepository extends Repository<Recipe> {
  getRecipeById(id: number) {
    return this.findOne({ where: { id } });
  }
}
