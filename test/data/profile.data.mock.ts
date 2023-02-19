import { Gender } from '../../src/common/enum';
import { Profile, User } from '../../src/user/entity';
import { VeganLevel } from '../../src/user/enum';
import { VeganType } from '../../src/vegan-type/entity';

export const profileMockData: Readonly<Profile> = Object.freeze<Profile>({
  id: 1,
  userId: 1,
  nickname: 'pirit',
  gender: Gender.MALE,
  birth: '19960405',
  veganFor: [2, 3],
  veganLevel: VeganLevel.COMPLETELY,
  veganTypeId: 1,
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-01-01'),
  veganType: new VeganType(),
  user: new User(),
});
