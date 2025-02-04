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

export interface TodayPlanResponse {
  todayPlan?: Plan;
  inProgressPlans?: Plan[];
}

export interface PlanCreateRequest {
  title: string;
  detail?: string;
  start_time: string;
  end_time: string;
  category_id?: number;
}

export interface CreatePlanReqBody {
  // 플랜 생성에 필요한 필드들
  title: string;
  // 다른 필요한 필드들 추가
}

export interface EditPlanReqBody {
  id: number;
  // 플랜 수정에 필요한 필드들
  title?: string;
  // 다른 필요한 필드들 추가
}
