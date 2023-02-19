import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Role } from '../common/enum';
import { Exceptions } from '../common/exceptions';
import * as request from '../common/interface/request';
import { IAddUser } from '../user/interface';
import { UserService } from '../user/user.service';
import { LoginArgs, TokenOutput } from './dto';
import { IJwtToken } from './interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  signJsonWebToken(userId: number, role: Role): IJwtToken {
    const accessToken = this.jwtService.sign({ _id: userId, _role: role }, { expiresIn: '10m' });
    const refreshToken = this.jwtService.sign(
      { _id: userId, _role: role, _refresh: true },
      { expiresIn: '7d' },
    );

    return { accessToken, refreshToken };
  }

  async login(args: LoginArgs) {
    const user = await this.userService.getUserForLogin(args.email);
    if (!user) {
      throw Exceptions.userNotFoundError;
    }

    if (user.password) {
      const validateResult = await bcrypt.compare(args.password, user.password);
      if (!validateResult) {
        throw Exceptions.invalidPassword;
      }
    }

    return this.signJsonWebToken(user.id, user.role);
  }

  async loginByRefreshToken(user: request.IUser): Promise<TokenOutput> {
    return this.signJsonWebToken(user.id, user.role);
  }

  async signup(args: IAddUser) {
    const existsUser = await this.userService.getUserByEmail(args.email);
    if (existsUser) {
      throw Exceptions.alreadyExistUserEmail;
    }

    const user = await this.userService.addUser(args);
    return { ...this.signJsonWebToken(user.id, Role.USER), user };
  }
}
