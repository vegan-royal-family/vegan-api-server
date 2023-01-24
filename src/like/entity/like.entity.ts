import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../user/entity';
import { LikeTarget } from '../enum/like.enum';

@ObjectType()
@Entity()
export class Like {
  @Field(() => ID, { description: '좋아요 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { description: 'Liker ID' })
  @Column('bigint')
  userId: number;

  @Field(() => LikeTarget, { description: '방문 타겟' })
  @Column({ type: 'enum', enum: LikeTarget })
  target: LikeTarget;

  @Field({ description: '타겟 ID' })
  @Column('varchar', { length: 50 })
  targetId: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (entity) => entity.likes, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'userId' })
  user: User;
}
