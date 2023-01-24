import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Recipe } from './recipe.entity';

@ObjectType()
@Entity()
export class RecipeStep {
  @Field(() => ID, { description: '레시피 스텝 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { description: '레시피 ID' })
  @Column('bigint')
  recipeId: number;

  @Field(() => Int, { description: '스텝 번호(순서)' })
  @Column('int', { unsigned: true, default: 0 })
  step: number;

  @Field({ description: '조리 방법, 필요재료 및 양' })
  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Recipe, (entity) => entity.steps, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'recipeId' })
  recipe: Recipe;
}
