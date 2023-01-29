import { Gender, Role } from '../../common/enum';

export interface IAddUser {
  email: string;
  role: Role;
  password?: string;
  nickname?: string;
  gender?: Gender;
  birth?: string;
}
