import {
  GetPlansParams,
  CreatePlanReqBody,
  EditPlanReqBody,
} from '../types/plan.type';
import { requestHandler } from './http';

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
