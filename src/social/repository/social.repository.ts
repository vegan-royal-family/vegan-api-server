import * as DataLoader from 'dataloader';
import { EntityRepository, In, Repository } from 'typeorm';

import { Social } from '../entity/social.entity';
import { IAddSocial } from '../interface';

@EntityRepository(Social)
export class SocialRepository extends Repository<Social> {
  private socialProvidersLoader = new DataLoader<number, Social[] | undefined>(
    async (userIds: number[]) => {
      const socials = await this.getSocialsByUserIds(userIds);
      return userIds.map((userId) => socials.filter((social) => social.userId === userId));
    },
    { cache: false },
  );

  async getSocialByLoader(userId: number) {
    return this.socialProvidersLoader.load(userId);
  }

  async getSocialsByUserIds(userIds: number[]) {
    return this.find({ userId: In(userIds) });
  }

  async getSocialsByUserId(userId: number) {
    return this.find({ userId: userId });
  }

  async getOneBySnsId(socialId: string) {
    return this.findOne({ socialId });
  }

  async getManyByEmail(email: string) {
    return this.createQueryBuilder('social')
      .innerJoin('social.user', 'user')
      .where('user.email = :email', { email })
      .getMany();
  }

  async existsLinkedSocialByEmail(email: string) {
    const count = await this.createQueryBuilder('social')
      .innerJoin('social.user', 'user')
      .where('user.email = :email', { email })
      .getCount();
    return count > 0;
  }

  async addSocial(args: IAddSocial) {
    await this.save(this.create(args));
  }

  async removeByUserId(userId: number) {
    const removeResult = await this.delete({ userId });
    if (!removeResult.affected) {
      return false;
    }

    return true;
  }
}
