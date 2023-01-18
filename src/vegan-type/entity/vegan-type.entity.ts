import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

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
}
