import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Restaurant } from '../../restaurant/entity';
import { Review } from '../../review/entity/review.entity';
import { User } from '../../user/entity';

@ObjectType()
@Entity()
export class Visit {
  @Field(() => ID, { description: '방문 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { description: '유저 ID' })
  @Column('bigint')
  userId: number;

  @Field(() => Int, { description: '가게 ID' })
  @Column('bigint')
  restaurantId: number;

  @Field(() => Int, { description: '리뷰 ID', nullable: true })
  @Column('bigint', { nullable: true })
  reviewId?: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => Review, (item) => item.visit)
  review: Review;

  @ManyToOne(() => Restaurant, (entity) => entity.visits, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Restaurant;

  @ManyToOne(() => User, (entity) => entity.visits, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'userId' })
  user: User;
}
