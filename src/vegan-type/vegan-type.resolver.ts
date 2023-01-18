import { Resolver } from '@nestjs/graphql';
import { VeganTypeService } from './vegan-type.service';

@Resolver()
export class VeganTypeResolver {
  constructor(private readonly veganTypeService: VeganTypeService) {}
}
