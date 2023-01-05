import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { Role } from '../../common/enum';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID, { description: '유저 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Index('email')
  @Column({ length: 255 })
  email: string;

  @Column({ length: 255, select: false })
  password: string;

  @Field()
  @Column({ length: 20 })
  name: string;

  @Field(() => Role)
  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
