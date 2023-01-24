import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Category } from '../../category/entity';
import { User } from '../../user/entity';
import { VeganType } from '../../vegan-type/entity';
import { RecipeStep } from './recipe-step.entity';

@ObjectType()
@Entity()
export class Recipe {
  @Field(() => ID, { description: '레시피 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { description: '작성자 ID' })
  @Column('bigint')
  authorId: number;

  @Field({ description: '레시피명' })
  @Column({ length: 255 })
  title: string;

  @Field({ description: '조리 방법, 필요재료 및 양' })
  @Column({ type: 'text' })
  description: string;

  @Field({ description: '준비물' })
  @Column({ length: 255 })
  materials: string;

  @Field(() => Int, { description: '비건 타입 ID' })
  @Column('bigint')
  veganTypeId: number;

  @Field(() => Int, { description: '카테고리 ID' })
  @Column('bigint')
  categoryId: number;

  @Field(() => Int, { description: '썸네일 파일 ID' })
  @Column('bigint')
  thumbnailFileId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => RecipeStep, (entity) => entity.recipe)
  steps: RecipeStep[];

  @ManyToOne(() => User, (entity) => entity.recipes, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'authorId' })
  user: User;

  @ManyToOne(() => VeganType, (entity) => entity.recipes, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'veganTypeId' })
  veganType: VeganType;

  @ManyToOne(() => Category, (entity) => entity.recipes, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
