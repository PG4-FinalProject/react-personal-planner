export type PlanDateType = '오늘' | '예정' | '완료';

//Plan 인터페이스에 dateType 선택적 속성 추가
export interface Plan {
  id?: number;
  title: string;
  detail?: string;
  start_time: string;
  end_time: string;
  user_id?: number;
  category_id?: number;
  dateType?: PlanDateType;
}

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

export interface EditPlanReqBody {
  id: number;
  title: string;
  detail: string;
  startTime: string;
  endTime: string;
  categoryId: number;
}

export type CreatePlanReqBody = Omit<EditPlanReqBody, 'id'>;

export interface CreatePlanFormI {
  id: number;
  title: string;
  detail: string;
  date: string;
  startTime: string;
  endTime: string;
  categoryId: number;
}

export interface TodayPlanResponse {
  todayPlan?: PlanI;
  inProgressPlans?: PlanI[];
}
