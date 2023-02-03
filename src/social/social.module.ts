import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { GoogleService } from './provider/google.service';
import { KakaoService } from './provider/kakao.service';
import { SocialRepository } from './repository/social.repository';
import { SocialFactoryService } from './service/social-factory.service';
import { SocialService } from './service/social.service';
import { SocialController } from './social.controller';
import { SocialResolver } from './social.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([SocialRepository]), AuthModule, UserModule],
  controllers: [SocialController],
  providers: [SocialResolver, SocialService, SocialFactoryService, KakaoService, GoogleService],
})
export class SocialModule {}
