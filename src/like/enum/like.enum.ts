import { registerEnumType } from '@nestjs/graphql';

export enum LikeTarget {
  RESTAURANT = 'restaurant',
  RECIPE = 'recipe',
}
registerEnumType(LikeTarget, { name: 'LikeTarget', description: 'file target' });
