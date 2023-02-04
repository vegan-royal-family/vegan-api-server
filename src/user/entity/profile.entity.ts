import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Gender } from '../../common/enum';
import { VeganType } from '../../vegan-type/entity';
import { VeganLevel } from '../enum';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class Profile {
  @Field(() => ID, { description: '유저 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { description: '유저 ID' })
  @Column('bigint')
  userId: number;

  @Field({ description: '닉네임' })
  @Column({ length: 20 })
  nickname: string;

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

  @Field(() => Int, { description: '프로필 파일 ID', nullable: true })
  @Column('bigint', { nullable: true })
  profileFileId?: number;

  @ManyToOne(() => VeganType, (entity) => entity.profiles, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'veganTypeId' })
  veganType: VeganType;

  @OneToOne(() => User, (entity) => entity.profile, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
