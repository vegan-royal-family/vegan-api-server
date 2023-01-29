import { Module } from '@nestjs/common';

import { RestaurantResolver } from './restaurant.resolver';
import { RestaurantService } from './restaurant.service';

@Module({
  providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantModule {}
