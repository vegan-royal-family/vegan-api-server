import { registerEnumType } from '@nestjs/graphql';

export enum VeganLevel {
  COMPLETELY = 'completely',
  PREFERABLY = 'preferably',
  INTEREST = 'interest',
}
registerEnumType(VeganLevel, { name: 'VeganLevel', description: '비건 레벨' });
