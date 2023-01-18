import { Resolver } from '@nestjs/graphql';
import { VisitService } from './visit.service';

@Resolver()
export class VisitResolver {
  constructor(private readonly visitService: VisitService) {}
}
