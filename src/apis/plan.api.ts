import {
  GetPlansParams,
  CreatePlanReqBody,
  EditPlanReqBody,
  TodayPlanResponse,
} from '../types/plan.type';
import { requestHandler } from './http';
import { getDateTimeFormat } from '../utils/date';
import axios, { AxiosError } from 'axios';

export const notifyTodayPlan = async (): Promise<TodayPlanResponse> => {
  try {
    const currentTime = getDateTimeFormat(new Date());

    const response = await requestHandler('get', '/plans/notifications/today', {
      params: { currentTime },
    });

    return {
      todayPlan: response.todayPlan || null,
      inProgressPlans: response.inProgressPlans || [],
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('오늘의 우선순위 플랜 조회 실패:', {
        message: axiosError.message,
        status: axiosError.response?.status,
        data: axiosError.response?.data,
      });

      if (axiosError.response?.status === 400) {
        return {
          todayPlan: undefined,
          inProgressPlans: [],
        };
      }
    }

    throw error;
  }
};

export const getPlans = async (params: GetPlansParams) => {
  return await requestHandler('get', '/plans', { params });
};

export const createPlanReq = async (data: CreatePlanReqBody) => {
  return await requestHandler('post', '/plans', data);
};

export const editPlanReq = async (data: EditPlanReqBody) => {
  return await requestHandler('put', `/plans/${data.id}`, data);
};

export const deletePlanReq = async (planId: number) => {
  return await requestHandler('delete', `/plans/${planId}`);
};

export const getWeekPlanStats = async (currentTime: string) => {
  return await requestHandler('get', '/plans/statistics/week', {
    params: { currentTime },
  });
};
