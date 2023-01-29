import { Module } from '@nestjs/common';

import { SocialResolver } from './social.resolver';
import { SocialService } from './social.service';

@Module({
  providers: [SocialResolver, SocialService],
})
export class SocialModule {}
