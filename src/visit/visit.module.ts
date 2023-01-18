import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitResolver } from './visit.resolver';

@Module({
  providers: [VisitResolver, VisitService]
})
export class VisitModule {}
