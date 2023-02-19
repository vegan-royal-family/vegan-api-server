import * as DataLoader from 'dataloader';
import { EntityRepository, In, Repository } from 'typeorm';

import { Profile } from '../entity/profile.entity';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  private profileLoader = new DataLoader<number, Profile | undefined>(
    async (userIds: number[]) => {
      const profiles = await this.getManyByUserIds(userIds);
      return userIds.map((userId) => profiles.find((profile) => userId === profile.userId));
    },
    { cache: false },
  );

  async getOneByLoader(userId: number) {
    return this.profileLoader.load(userId);
  }

  async getManyByUserIds(userIds: number[]) {
    return this.find({ userId: In(userIds) });
  }
}
