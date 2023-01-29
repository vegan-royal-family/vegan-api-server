import { Gender } from '../../common/enum';

export interface ISocialProfile {
  snsId: string;
  email: string;
  gender?: Gender;
  birthYear?: number;
}
