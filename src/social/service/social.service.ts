import { Injectable } from '@nestjs/common';

import { IAddSocial } from '../interface';
import { SocialRepository } from '../repository/social.repository';

@Injectable()
export class SocialService {
  constructor(private readonly socialRepository: SocialRepository) {}

  async getLinkedSocialProvidersByLoader(userId: number) {
    const social = await this.socialRepository.getSocialByLoader(userId);
    return social?.map((social) => social.socialProvider) ?? [];
  }

  async getSocialByUserId(userId: number) {
    return this.socialRepository.getSocialsByUserId(userId);
  }

  async getSocialBySnsId(snsId: string) {
    return this.socialRepository.getOneBySnsId(snsId);
  }

  async existsLinkedSocialByEmail(email: string) {
    return this.socialRepository.existsLinkedSocialByEmail(email);
  }

  async addSocial(args: IAddSocial) {
    return this.socialRepository.addSocial(args);
  }

  async removeByWithdrawal(userId: number) {
    return this.socialRepository.removeByUserId(userId);
  }
}
