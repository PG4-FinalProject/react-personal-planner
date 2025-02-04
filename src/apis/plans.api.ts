import { GetPlansParams } from '../types/plan.type';
import { requestHandler } from './http';
import { FormData } from '../types/createplans';
import { getDateTimeFormat } from '../utils/date';
import axios from 'axios';
import { TodayPlanResponse } from '../types/plan.type';

export const getPlans = async (params: GetPlansParams) => {
  return await requestHandler('get', '/plans', { params });
};

export const createPlan = async (planData: FormData) => {
  try {
    // POST 요청으로 플랜 생성
    const response = await requestHandler('post', 'plans', planData);
    return response;
  } catch (error) {
    console.error('플랜 생성 중 오류 발생:', error);
    throw error;
  }
};

export const notifyTodayPlan = async (): Promise<TodayPlanResponse> => {
  try {
    // getDateTimeFormat 유틸리티 함수 사용
    const currentTime = getDateTimeFormat(new Date());

    const response = await requestHandler('get', '/plans/notifications/today', {
      params: { currentTime }, // 쿼리 파라미터로 전달
    });

    return {
      todayPlan: response.todayPlan || null,
      inProgressPlans: response.inProgressPlans || [],
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('오늘의 우선순위 플랜 조회 실패:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });

      // 400 에러 시 빈 데이터 반환
      if (error.response?.status === 400) {
        return {
          todayPlan: undefined,
          inProgressPlans: [],
        };
      }
    }

    // 다른 에러인 경우 다시 throw
    throw error;
  }
};
