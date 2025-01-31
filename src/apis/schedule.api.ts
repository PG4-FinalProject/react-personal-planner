import axios from 'axios';
import type {
  Schedule,
  ApiResponse,
  CreateScheduleRequest,
  UpdateScheduleRequest,
} from '../types/schedule';

const API_URL = import.meta.env.VITE_API_URL;
export const scheduleApi = {
  // 특정 날짜의 일정 목록 조회
  getSchedulesByDate: async (
    date: string,
  ): Promise<ApiResponse<Schedule[]>> => {
    const response = await axios.get(`${API_URL}/schedules`, {
      params: { date },
    });
    return response.data;
  },

  // 새 일정 생성
  createSchedule: async (
    schedule: CreateScheduleRequest,
  ): Promise<ApiResponse<Schedule>> => {
    const response = await axios.post(`${API_URL}/schedules`, schedule);
    return response.data;
  },

  // 일정 수정
  updateSchedule: async (
    schedule: UpdateScheduleRequest,
  ): Promise<ApiResponse<Schedule>> => {
    const response = await axios.put(
      `${API_URL}/schedules/${schedule.id}`,
      schedule,
    );
    return response.data;
  },

  // 일정 삭제
  deleteSchedule: async (id: number): Promise<ApiResponse<void>> => {
    const response = await axios.delete(`${API_URL}/schedules/${id}`);
    return response.data;
  },
};
