import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@ObjectType()
@Entity()
export class Category {
  @Field(() => ID, { description: '카테고리 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: '카테고리명' })
  @Column({ length: 255 })
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
