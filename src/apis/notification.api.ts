import { requestHandler } from './http';
import type { Notification } from '../types/notification';
import { getDateFormat } from '../utils/date';

// Plan 타입 정의 (필요시 수정)
interface Plan {
  id: number;
  title: string;
  startTime: string; // ISO 형식의 날짜 문자열
  // 필요한 다른 필드 추가
}

export const notificationApi = {
  // 오늘의 알림 가져오기 - plans API 활용
  getTodayNotifications: async (): Promise<Notification[]> => {
    const today = getDateFormat(new Date());
    const response = await requestHandler('get', '/plans', {
      params: {
        startDate: today,
        endDate: today,
      },
    });

    // plans를 notification 형식으로 변환
    if (!response?.plans) return [];

    return response.plans.map((plan: Plan, index: number) => ({
      id: plan.id,
      scheduleId: plan.id,
      message: `${plan.title} - ${plan.startTime.split(' ')[1].substring(0, 5)}`,
      timestamp: today,
      isChecked: false,
    }));
  },

  markAsRead: async (id: number) => {
    return await requestHandler('put', `/notifications/${id}`);
  },
};
