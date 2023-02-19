import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { saltCost } from '../auth/constant';
import { IAddUser } from './interface/add-user.interface';
import { UserRepository } from './repository';
import { ProfileRepository } from './repository/profile.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  async getUserById(id: number) {
    return this.userRepository.getOneById(id);
  }

  async getUserByEmail(email: string) {
    return this.userRepository.getOneByEmail(email);
  }

  /**
   * 로그인을 위한 기능으로 비밀번호도 같이 조회
   */
  async getUserForLogin(email: string) {
    return this.userRepository.getUserForLogin(email);
  }

  async getUserProfileById(id: number) {
    return this.profileRepository.getOneByUserId(id);
  }

  async addUser(args: IAddUser) {
    if (args.password) {
      const hashedPassword = await bcrypt.hash(args.password, saltCost);
      return this.userRepository.addUser({ ...args, password: hashedPassword });
    }

    return this.userRepository.addUser(args);
  }
}
