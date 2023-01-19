import { registerEnumType } from '@nestjs/graphql';

export enum LikeTarget {
  RESTAURANT = 'restaurant',
}
registerEnumType(LikeTarget, { name: 'LikeTarget', description: 'file target' });
