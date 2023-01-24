import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Food {
  @Field(() => ID, { description: '식재료 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => GraphQLJSON, { description: '전성분' })
  @Column({ type: 'json' })
  ingredients: string[];

  @Field(() => Int, { description: '썸네일 파일 ID' })
  @Column('bigint')
  thumbnailFileId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
