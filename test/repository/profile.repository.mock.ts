import { profileMockData } from '../data/profile.data.mock';

export const MockProfileRepository = () => ({
  getManyByLoader: jest.fn().mockResolvedValue([profileMockData]),
  getManyByUserIds: jest.fn().mockResolvedValue([profileMockData]),
  getOneByUserId: jest.fn().mockResolvedValue(profileMockData),
});
