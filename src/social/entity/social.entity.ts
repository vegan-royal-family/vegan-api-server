import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../user/entity';
import { OauthProvider } from '../enum';

@Entity()
export class Social {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  userId: number;

  @Column('varchar', { length: 255 })
  socialId: string;

  @Column('varchar', { length: 10 })
  socialProvider: OauthProvider;

  @Column('varchar', { nullable: true, length: 255 })
  socialName?: string;

  @Column('varchar', { nullable: true, length: 3000 })
  socialIdToken?: string;

  @Column('varchar', { nullable: true, length: 500 })
  socialRefreshToken?: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (entity) => entity.socials, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
