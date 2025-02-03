export type PlanDateType = '오늘' | '예정' | '완료';

export interface GetPlansParams {
  startDate: string;
  endDate: string;
}
