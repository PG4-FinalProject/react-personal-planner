import { requestHandler } from './http';
import type { UserProfile } from '../types/user.type';

export const userApi = {
  getUserProfile: async (): Promise<UserProfile> => {
    return await requestHandler('get', '/users');
  },
  updateProfile: async (data: Partial<UserProfile>) => {
    return await requestHandler('put', '/users/edit', data);
  },
};
