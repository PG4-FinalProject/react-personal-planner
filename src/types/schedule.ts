// src/types/schedule.ts
export interface Schedule {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  date: string;
  category?: string;
  description?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

// API 요청 타입
export interface CreateScheduleRequest {
  title: string;
  startTime: string;
  endTime: string;
  date: string;
  category?: string;
  description?: string;
}

export interface UpdateScheduleRequest extends Partial<CreateScheduleRequest> {
  id: number;
}

// 일정 관련 상태 타입
export interface ScheduleState {
  schedules: Schedule[];
  isLoading: boolean;
  error: string | null;
}
