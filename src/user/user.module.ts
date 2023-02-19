import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from './repository';
import { ProfileRepository } from './repository/profile.repository';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, ProfileRepository])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
