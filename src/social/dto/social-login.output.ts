import { Field, ObjectType } from '@nestjs/graphql';

import { TokenOutput } from '../../auth/dto';
import { LoginType } from '../enum';

@ObjectType()
export class SocialLoginOutput extends TokenOutput {
  @Field(() => LoginType)
  type: LoginType;
}
