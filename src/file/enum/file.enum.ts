import { registerEnumType } from '@nestjs/graphql';

export enum FileTarget {
  REVIEW = 'review',
  RECIPE = 'recipe',
}
registerEnumType(FileTarget, { name: 'FileTarget', description: 'FileTarget' });
