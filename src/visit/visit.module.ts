import { Module } from '@nestjs/common';

import { VisitResolver } from './visit.resolver';
import { VisitService } from './visit.service';

@Module({
  providers: [VisitResolver, VisitService],
})
export class VisitModule {}
