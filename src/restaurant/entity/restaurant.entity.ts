import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

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
  @Column('double', { unsigned: true, precision: 22, default: 0 })
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
}
