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

  const processPriorityTasks = async (): Promise<EnhancedPriorityTask[]> => {
    try {
      if (!isLogin) {
        const today = getDateFormat(new Date());
        const currentTime = new Date();

        return mockSchedules
          .filter(schedule => schedule.date === today)
          .map(schedule => {
            const startTime = new Date(`${today} ${schedule.startTime}`);
            const endTime = new Date(`${today} ${schedule.endTime}`);

            return {
              name: schedule.title,
              duration: `${schedule.startTime} - ${schedule.endTime}`,
              isInProgress: currentTime >= startTime && currentTime <= endTime,
            };
          })
          .filter(task => {
            const currentTime = new Date();
            return (
              currentTime <=
              new Date(`${today} ${task.duration.split(' - ')[1]}`)
            );
          }); // 종료 시간이 지나지 않은 태스크만 필터링
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

      return response.plans
        .map((plan: PlanI) => {
          const [, startTimeStr] = plan.startTime.split(' ');
          const [, endTimeStr] = plan.endTime.split(' ');

          const startTime = startTimeStr.substring(0, 5);
          const endTime = endTimeStr.substring(0, 5);

          return {
            name: plan.title,
            duration: `${startTime} - ${endTime}`,
            isInProgress:
              currentTime >= new Date(plan.startTime) &&
              currentTime <= new Date(plan.endTime),
          };
        })
        .filter((task: EnhancedPriorityTask) => {
          // 종료 시간이 현재 시간보다 이후인 태스크만 필터링
          const today = getDateFormat(new Date());
          const endTime = new Date(`${today} ${task.duration.split(' - ')[1]}`);
          return currentTime <= endTime;
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
