import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { FileTarget } from '../enum/file.enum';

@ObjectType()
@Index('target', ['targetId', 'target', 'sequence'])
@Entity()
export class File {
  @Field(() => ID, { description: '파일 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => FileTarget, { description: '타겟' })
  @Column({ type: 'enum', enum: FileTarget })
  target: FileTarget;

  @Field({ description: '타겟 ID, -로 시작하는 경우 일정시간 이상 지난 후 삭제' })
  @Column('varchar', { length: 50 })
  targetId: string;

  @Field({ description: '파일명' })
  @Column('varchar', { length: 255 })
  name: string;

  @Field({ description: '경로' })
  @Column('varchar', { length: 255 })
  path: string;

  @Field({ description: 'mime 타입' })
  @Column('varchar', { length: 50 })
  mimeType: string;

  @Field(() => Int, { description: '파일 크기' })
  @Column('int', { unsigned: true })
  size: number;

  @Field(() => Int, { description: '순서' })
  @Column('smallint', { unsigned: true, default: 1 })
  sequence: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
