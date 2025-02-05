interface PlanCountStats {
  totalCount: number;
  toDoCount: number;
  completedCount: number;
}

interface CategoryCountStats {
  id: number;
  name: string;
  color: string;
  totalCount: number;
  toDoCount: number;
  completedCount: number;
}

export interface WeekPlanStats {
  dailyStats: PlanCountStats;
  weeklyStats: PlanCountStats;
  weeklyCategoryStatsArr: CategoryCountStats[];
}
