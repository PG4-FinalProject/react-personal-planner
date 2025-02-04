import { GetPlansParams } from '../types/plan.type';
import { requestHandler } from './http';
import { FormData } from '../types/createplans';

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
