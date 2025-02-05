import { requestHandler } from './http';
import type { UserSettings } from '../types/user.type';

export const settingsApi = {
  getUserSettings: async (): Promise<UserSettings> => {
    return await requestHandler('get', '/users/settings');
  },
  updateSettings: async (settings: UserSettings) => {
    return await requestHandler('put', '/users/settings', settings);
  },
};
