export type PlanDateType = '오늘' | '예정' | '완료';

export interface GetPlansParams {
  startDate: string;
  endDate: string;
}

export interface PlanI {
  id: number;
  title: string;
  detail: string;
  startTime: string;
  endTime: string;
  color: string;
  categoryId: number;
  categoryName: string;
}

export type CreatePlanReqBody = Omit<PlanI, 'id'>;
