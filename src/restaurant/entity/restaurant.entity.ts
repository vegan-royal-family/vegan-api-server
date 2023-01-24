import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Category } from '../../category/entity';
import { Menu } from '../../menu/entity';
import { Review } from '../../review/entity/review.entity';
import { VeganType } from '../../vegan-type/entity';
import { Visit } from '../../visit/entity/visit.entity';

@ObjectType()
@Entity()
export class Restaurant {
  @Field(() => ID, { description: '음식점 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Field({ description: '상호명' })
  @Column({ length: 255 })
  title: string;

  @Field({ description: '주소' })
  @Column({ length: 255 })
  address: string;

  @Field({ description: '전화번호' })
  @Column({ length: 50 })
  tel: string;

  @Field({ description: '영업 시간' })
  @Column({ length: 255 })
  openTime: string;

  @Field(() => Int, { description: '비건 타입 ID' })
  @Column('bigint')
  veganTypeId: number;

  @Field(() => Int, { description: '카테고리 ID' })
  @Column('bigint')
  categoryId: number;

  @Field({ description: '웹주소 URL' })
  @Column({ length: 255 })
  url: string;

  @Field({ description: '별점' })
  @Column('double', { unsigned: true, default: 0 })
  star: number;

  @Field({ description: '위도', nullable: true })
  @Column('double', { unsigned: true, nullable: true })
  latitude?: number;

  @Field({ description: '경도', nullable: true })
  @Column('double', { unsigned: true, nullable: true })
  longitude?: number;

  @Field(() => Int, { description: '작성된 리뷰 개수' })
  @Column('int', { unsigned: true, default: 0 })
  reviewCount: number;

  @Field(() => Int, { description: '좋아요 개수' })
  @Column('int', { unsigned: true, default: 0 })
  likeCount: number;

  @Field(() => Int, { description: '방문 인증 횟수' })
  @Column('int', { unsigned: true, default: 0 })
  visitCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Menu, (entity) => entity.restaurant)
  menus: Menu[];

  @OneToMany(() => Visit, (entity) => entity.restaurant)
  visits: Visit[];

  @OneToMany(() => Review, (entity) => entity.restaurant, { createForeignKeyConstraints: false })
  reviews: Review[];

  @ManyToOne(() => Category, (entity) => entity.recipes, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => VeganType, (entity) => entity.restaurants, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'veganTypeId' })
  veganType: VeganType;
}
