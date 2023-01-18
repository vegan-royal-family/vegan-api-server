import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@ObjectType()
@Entity()
export class Menu {
  @Field(() => ID, { description: '메뉴 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { description: '가게 ID' })
  @Column('bigint')
  restaurantId: number;

  @Field({ description: '메뉴명' })
  @Column({ length: 255 })
  title: string;

  @Field(() => Int, { description: '가격' })
  @Column('int', { unsigned: true })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
