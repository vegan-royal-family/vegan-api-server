import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Role } from '../../common/enum';
import { Like } from '../../like/entity/like.entity';
import { Recipe } from '../../recipe/entity';
import { Review } from '../../review/entity/review.entity';
import { Social } from '../../social/entity';
import { Visit } from '../../visit/entity/visit.entity';
import { Profile } from './profile.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID, { description: '유저 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: '이메일' })
  @Column({ length: 255 })
  email: string;

  @Column({ length: 255, nullable: true, select: false })
  password?: string;

  @Field(() => Role, { description: '역할' })
  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: Role;

  @Field(() => Int, { description: '신고 당한 횟수' })
  @Column('int', { unsigned: true, default: 0 })
  reportedCount: number;

  @Field(() => Int, { description: '작성한 리뷰 개수' })
  @Column('int', { unsigned: true, default: 0 })
  reviewCount: number;

  @Field(() => Int, { description: '작성한 레시피 개수' })
  @Column('int', { unsigned: true, default: 0 })
  recipeCount: number;

  @Field(() => Int, { description: '좋아요한 개수' })
  @Column('int', { unsigned: true, default: 0 })
  likeCount: number;

  @Field(() => Int, { description: '방문 인증 횟수' })
  @Column('int', { unsigned: true, default: 0 })
  visitCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Review, (entity) => entity.user)
  reviews: Review[];

  @OneToMany(() => Like, (entity) => entity.user)
  likes: Like[];

  @OneToMany(() => Visit, (entity) => entity.user)
  visits: Visit[];

  @OneToMany(() => Recipe, (entity) => entity.user)
  recipes: Recipe[];

  @OneToMany(() => Social, (entity) => entity.user)
  socials: Social[];

  @OneToOne(() => Profile, (entity) => entity.user)
  profile: Profile;
}
