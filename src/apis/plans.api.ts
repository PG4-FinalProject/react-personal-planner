import { GetPlansParams } from '../types/plan.type';
import { requestHandler } from './http';

export const getPlans = async (params: GetPlansParams) => {
  return await requestHandler('get', '/plans', { params });
};
