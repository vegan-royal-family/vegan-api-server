import { registerEnumType } from '@nestjs/graphql';

export enum VeganLevel {
  COMPLETELY = 'completely',
  preferably = 'preferably',
  INTEREST = 'interest',
}
registerEnumType(VeganLevel, { name: 'VeganLevel', description: 'VeganLevel' });
