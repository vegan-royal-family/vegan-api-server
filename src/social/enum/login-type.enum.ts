import { registerEnumType } from '@nestjs/graphql';

export enum LoginType {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
}
registerEnumType(LoginType, { name: 'LoginType', description: '로그인 타입' });
