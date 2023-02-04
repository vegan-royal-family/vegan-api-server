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
import { Profile } from '../../user/entity/profile.entity';

@ObjectType()
@Entity()
export class VeganType {
  @Field(() => ID, { description: '비건 유형 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: '비건 유형명' })
  @Column({ length: 255 })
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Recipe, (entity) => entity.veganType)
  recipes: Recipe[];

  @OneToMany(() => Profile, (entity) => entity.veganType)
  profiles: Profile[];

  @OneToMany(() => Restaurant, (entity) => entity.veganType)
  restaurants: Restaurant[];
}
