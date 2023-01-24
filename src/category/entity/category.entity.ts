import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Recipe } from '../../recipe/entity';
import { Restaurant } from '../../restaurant/entity';

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

  @OneToMany(() => Recipe, (entity) => entity.category)
  recipes: Recipe[];

  @OneToMany(() => Restaurant, (entity) => entity.category)
  restaurant: Restaurant[];
}
