import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
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

import { Gender, Role } from '../../common/enum';
import { Like } from '../../like/entity/like.entity';
import { Recipe } from '../../recipe/entity';
import { Review } from '../../review/entity/review.entity';
import { Social } from '../../social/entity/social.entity';
import { VeganType } from '../../vegan-type/entity';
import { Visit } from '../../visit/entity/visit.entity';
import { VeganLevel } from '../enum';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID, { description: '유저 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: '아이디' })
  @Column({ length: 255 })
  username: string;

  @Column({ length: 255, select: false })
  password: string;

  @Field({ description: '닉네임' })
  @Column({ length: 20 })
  nickname: string;

  @Field(() => Role, { description: '역할' })
  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: Role;

  @Field(() => Gender, { description: '성별' })
  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Field({ description: '생년월일' })
  @Column({ length: 8 })
  birth: string;

  @Field(() => GraphQLJSON, { description: '비건 실천 이유' })
  @Column({ type: 'json' })
  veganFor: number[];

  @Field(() => VeganLevel, { description: '비건 실천 정도' })
  @Column({ type: 'enum', enum: VeganLevel })
  veganLevel: VeganLevel;

  @Field(() => Int, { description: '비건 타입 ID' })
  @Column('bigint')
  veganTypeId: number;

  @Field(() => Int, { description: '프로필 파일 ID' })
  @Column('bigint')
  profileFileId: number;

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

  @ManyToOne(() => VeganType, (entity) => entity.users, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'veganTypeId' })
  veganType: VeganType;
}
