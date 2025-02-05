//명확하게 관리하기 위해서 schedule.api와 분리
import { requestHandler } from './http';
import type { Notification } from '../types/notification';

export const notificationApi = {
  // 오늘의 알림 가져오기
  getTodayNotifications: async (): Promise<Notification[]> => {
    return await requestHandler('get', '/notifications');
  },

  // 특정 알림 읽음 처리
  markAsRead: async (id: number) => {
    return await requestHandler('put', `/notifications/${id}`);
  },
};
