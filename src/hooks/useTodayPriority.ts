import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { PlanI } from '../types/plan.type';
import { EnhancedPriorityTask } from '../types/priority';
import { getPlans } from '../apis/plans.api';
import { formatTime, getDateFormat } from '../utils/date';
import { mockSchedules } from '../mocks/scheduleDate';

export const useTodayPriority = () => {
  const [tasks, setTasks] = useState<EnhancedPriorityTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLogin } = useAuthStore();

  // useTodayPriority.ts
  const processPriorityTasks = async (): Promise<EnhancedPriorityTask[]> => {
    try {
      if (!isLogin) {
        const today = getDateFormat(new Date());
        const currentTime = new Date();

        return mockSchedules
          .filter(schedule => schedule.date === today)
          .map(schedule => ({
            name: schedule.title,
            duration: `${schedule.startTime} - ${schedule.endTime}`, // 목데이터는 이미 HH:mm 형식
            isInProgress:
              currentTime >= new Date(`${today} ${schedule.startTime}`) &&
              currentTime <= new Date(`${today} ${schedule.endTime}`),
          }));
      }

      const today = getDateFormat(new Date());
      const response = await getPlans({
        startDate: today,
        endDate: today,
      });

      if (!response?.plans || response.plans.length === 0) {
        return [];
      }

      const currentTime = new Date();

      return response.plans.map((plan: PlanI) => {
        // startTime과 endTime이 'YYYY-MM-DD HH:mm:ss' 형식으로 옴
        const [, startTimeStr] = plan.startTime.split(' '); // HH:mm:ss
        const [, endTimeStr] = plan.endTime.split(' '); // HH:mm:ss

        // 시간만 추출 (HH:mm)
        const startTime = startTimeStr.substring(0, 5);
        const endTime = endTimeStr.substring(0, 5);

        return {
          name: plan.title,
          duration: `${startTime} - ${endTime}`,
          isInProgress:
            currentTime >= new Date(plan.startTime) &&
            currentTime <= new Date(plan.endTime),
        };
      });
    } catch (err) {
      console.error('Error fetching priority tasks:', err);
      setError('일정을 불러오는 중 오류가 발생했습니다.');
      return [];
    }
  };

  useEffect(() => {
    const loadTodayPriorityTasks = async () => {
      setIsLoading(true);
      setError(null);
      const processedTasks = await processPriorityTasks();
      setTasks(processedTasks);
      setIsLoading(false);
    };

    loadTodayPriorityTasks();
    const intervalId = setInterval(loadTodayPriorityTasks, 60000);

    return () => clearInterval(intervalId);
  }, [isLogin]);

  return {
    tasks,
    isLoading,
    error,
    hasNoTasks: !isLoading && tasks.length === 0 && !error,
  };
};
