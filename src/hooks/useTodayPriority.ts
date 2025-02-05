import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { Plan, TodayPlanResponse } from '../types/plan.type';
import { EnhancedPriorityTask } from '../types/priority';
import { notifyTodayPlan } from '../apis/plans.api';
import { formatTime } from '../utils/date';
import { getDateFormat } from '../utils/date';
import { mockSchedules } from '../mocks/scheduleDate';

const formatRemainingTime = (diffInMilliseconds: number): string | null => {
  if (diffInMilliseconds < 0) return null;

  const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(
    (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
  );

  return hours > 0 ? `${hours}시간 ${minutes}분 후` : `${minutes}분 후`;
};

const calculateTimeDifference = (startTimeStr: string): number => {
  const startTime = new Date(startTimeStr);
  const currentTime = new Date();
  return startTime.getTime() - currentTime.getTime();
};

export const useTodayPriority = () => {
  const [tasks, setTasks] = useState<EnhancedPriorityTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLogin } = useAuthStore();

  const processPriorityTasks = async (): Promise<EnhancedPriorityTask[]> => {
    try {
      if (!isLogin) {
        const today = getDateFormat(new Date());

        return mockSchedules
          .filter(schedule => schedule.date === today)
          .map(schedule => ({
            name: schedule.title,
            duration: `${schedule.startTime} - ${schedule.endTime}`,
            isInProgress: false,
          }));
      }

      const response: TodayPlanResponse = await notifyTodayPlan();

      // 진행 중인 플랜이 있으면 진행 중인 플랜 표시
      if (response.inProgressPlans?.length) {
        return response.inProgressPlans.map(plan => ({
          name: plan.title,
          duration: `${formatTime(plan.start_time.split(' ')[1])} - ${formatTime(plan.end_time.split(' ')[1])}`,
          isInProgress: true,
        }));
      }

      // 진행 중인 플랜 없으면 다가오는 플랜 계산
      if (response.todayPlan) {
        const diffInMilliseconds = calculateTimeDifference(
          response.todayPlan.start_time,
        );
        const remainingTimeText = formatRemainingTime(diffInMilliseconds);

        if (remainingTimeText) {
          return [
            {
              name: response.todayPlan.title,
              duration: `${formatTime(response.todayPlan.start_time.split(' ')[1])} - ${formatTime(response.todayPlan.end_time.split(' ')[1])}`,
              isInProgress: false,
              remainingTime: remainingTimeText,
            },
          ];
        }
      }

      return [];
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : '일정을 불러오는 중 알 수 없는 오류가 발생했습니다.';

      setError(errorMessage);
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
