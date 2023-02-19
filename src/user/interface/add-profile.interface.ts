import { Profile } from '../entity';

export type IAddProfile = Omit<Profile, 'id' | 'veganType' | 'user' | 'createdAt' | 'updatedAt'>;
