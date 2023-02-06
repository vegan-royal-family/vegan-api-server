import { Restaurant } from './../entity/restaurant.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant> {
  getRestaurantById(id: number) {
    return this.findOne({ where: { id } });
  }

  saveWithRestaurant(restaurant: Restaurant) {
    return this.save(restaurant);
  }
}
