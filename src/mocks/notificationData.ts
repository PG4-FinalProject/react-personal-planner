import { mockSchedules } from './scheduleDate';
import type { Notification } from '../types/notification';

export const mockNotifications: Notification[] = mockSchedules.map(
  (schedule, index) => ({
    id: index + 1,
    scheduleId: schedule.id,
    message: `${schedule.title} - ${schedule.startTime}`,
    timestamp: schedule.date,
    isChecked: false,
  }),
);
