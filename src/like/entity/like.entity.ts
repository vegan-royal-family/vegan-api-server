import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Like {
  @Field(() => ID, { description: '좋아요 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { description: '방문자 ID' })
  @Column('bigint')
  userId: number;

  @Field(() => String, { description: '방문 타겟' })
  @Column({ type: 'enum', enum: String })
  target: string;

  @Field({ description: '타겟 ID' })
  @Column('varchar', { length: 50 })
  targetId: string;

  @CreateDateColumn()
  createdAt: Date;
}
