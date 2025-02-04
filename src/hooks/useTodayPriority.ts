import { useState, useEffect } from 'react';
import { PriorityTask, fetchTodayPriorityPlans } from '../apis/plans.api';

export const useTodayPriority = () => {
  const [tasks, setTasks] = useState<PriorityTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTodayPriorityTasks = async () => {
      try {
        setIsLoading(true);
        const priorityTasks = await fetchTodayPriorityPlans();
        setTasks(priorityTasks);
      } catch (err) {
        setError('오늘의 우선순위 일정을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadTodayPriorityTasks();
  }, []);

  return { tasks, isLoading, error };
};
