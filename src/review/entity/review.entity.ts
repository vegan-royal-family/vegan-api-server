import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Restaurant } from '../../restaurant/entity';
import { User } from '../../user/entity';
import { Visit } from '../../visit/entity/visit.entity';

@ObjectType()
@Entity()
export class Review {
  @Field(() => ID, { description: '리뷰 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { description: '식당 ID' })
  @Column('bigint')
  restaurantId: number;

  @Field(() => Int, { description: '작성자 ID' })
  @Column('bigint')
  authorId: number;

  @Field(() => Int, { description: '방문 인증 ID' })
  @Column('bigint')
  visitId: number;

  @Field({ description: '별점' })
  @Column('double', { unsigned: true, default: 0 })
  star: number;

  @Index()
  @Field({ description: '리뷰 내용' })
  @Column({ length: 255 })
  content: string;

  @Field()
  @Column('boolean', { comment: '공개 여부', default: true })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (entity) => entity.reviews, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'authorId' })
  user: User;

  @ManyToOne(() => Restaurant, (entity) => entity.reviews, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Restaurant;

  @OneToOne(() => Visit, (entity) => entity.review, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'visitId' })
  visit: Visit;
}
