import { useEffect, useState } from 'react';
import { WeekPlanStats } from '../types/statistic.type';
import { getWeekPlanStats } from '../apis/plan.api';
import { getDateTimeFormat } from '../utils/date';

export const useStatistic = () => {
  const [weekPlanStats, setWeekPlanStats] = useState<WeekPlanStats>({
    dailyStats: {
      totalCount: 0,
      toDoCount: 0,
      completedCount: 0,
    },
    weeklyStats: {
      totalCount: 0,
      toDoCount: 0,
      completedCount: 0,
    },
    weeklyCategoryStatsArr: [],
  });

  useEffect(() => {
    getWeekPlanStats(getDateTimeFormat(new Date())).then(
      res => {
        setWeekPlanStats(res);
      },
      err => {
        console.log('통계 조회 실패!');
      },
    );
  }, []);

  return {
    weekPlanStats,
  };
};
