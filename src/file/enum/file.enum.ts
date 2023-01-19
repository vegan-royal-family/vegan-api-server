import { registerEnumType } from '@nestjs/graphql';

export enum FileTarget {
  DEFAULT = 'default',
}
registerEnumType(FileTarget, { name: 'FileTarget', description: 'file target' });
