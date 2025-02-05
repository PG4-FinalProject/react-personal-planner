import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { PlanI, TodayPlanResponse } from '../types/plan.type';
import { EnhancedPriorityTask } from '../types/priority';
import { notifyTodayPlan } from '../apis/plan.api';
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
      // 비로그인 상태에서만 목 데이터 사용
      if (!isLogin) {
        const today = getDateFormat(new Date());
        const currentTime = new Date().getTime();

        const inProgressTasks = mockSchedules
          .filter(schedule => schedule.date === today)
          .map(schedule => {
            const startTime = new Date(
              `${today} ${schedule.startTime}`,
            ).getTime();
            const endTime = new Date(`${today} ${schedule.endTime}`).getTime();

            return {
              name: schedule.title,
              duration: `${schedule.startTime} - ${schedule.endTime}`,
              isInProgress: currentTime >= startTime && currentTime <= endTime,
            };
          })
          .filter(task => task.isInProgress);

        const upcomingTasks = mockSchedules
          .filter(schedule => schedule.date === today)
          .map(schedule => {
            const startTime = new Date(
              `${today} ${schedule.startTime}`,
            ).getTime();

            return {
              name: schedule.title,
              duration: `${schedule.startTime} - ${schedule.endTime}`,
              isInProgress: false,
              remainingTime: formatRemainingTime(
                startTime - new Date().getTime(),
              ),
            };
          })
          .filter(task => !task.isInProgress && task.remainingTime);

        return [...inProgressTasks, ...upcomingTasks];
      }

      // 로그인 상태에서는 API 데이터만 사용
      const response: TodayPlanResponse = await notifyTodayPlan();

      // 진행 중인 플랜 처리
      const inProgressPlans =
        response.inProgressPlans?.map(plan => ({
          name: plan.title,
          duration: `${formatTime(plan.startTime.split(' ')[1])} - ${formatTime(plan.endTime.split(' ')[1])}`,
          isInProgress: true,
        })) || [];

      // 다가오는 플랜 처리
      const upcomingPlans: EnhancedPriorityTask[] = [];
      if (response.todayPlan && inProgressPlans.length > 0) {
        const diffInMilliseconds = calculateTimeDifference(
          response.todayPlan.startTime,
        );
        const remainingTimeText = formatRemainingTime(diffInMilliseconds);

        if (remainingTimeText) {
          upcomingPlans.push({
            name: response.todayPlan.title,
            duration: `${formatTime(response.todayPlan.startTime.split(' ')[1])} - ${formatTime(response.todayPlan.endTime.split(' ')[1])}`,
            isInProgress: false,
            remainingTime: remainingTimeText,
          });
        }
      }

      return [...inProgressPlans, ...upcomingPlans];
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
