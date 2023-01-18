import { Module } from '@nestjs/common';

import { VeganTypeResolver } from './vegan-type.resolver';
import { VeganTypeService } from './vegan-type.service';

@Module({
  providers: [VeganTypeResolver, VeganTypeService],
})
export class VeganTypeModule { }
