import { registerEnumType } from '@nestjs/graphql';

export enum FileTarget {
  FOOD = 'food',
  REVIEW = 'review',
  RECIPE = 'recipe',
  RECIPE_STEP = 'recipe_step',
}
registerEnumType(FileTarget, { name: 'FileTarget', description: 'FileTarget' });
