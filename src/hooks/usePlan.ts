import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  createPlanReq,
  deletePlanReq,
  editPlanReq,
  getPlans,
} from '../apis/plans.api';
import { getDateFormat } from '../utils/date';
import { useState } from 'react';
import { CreatePlanReqBody, EditPlanReqBody, PlanI } from '../types/plan.type';
import { useAlert } from './useAlert';

export const usePlan = () => {
  const [plans, setPlans] = useState<PlanI[]>([]);
  const [plansCount, setPlansCount] = useState<number>(0);

  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const startDate = params.get('startDate');
  const endDate = params.get('endDate');

  const todayDateFormat = getDateFormat(new Date());

  const { isLoading, isError } = useQuery({
    queryKey: ['plans', location.search],
    queryFn: async () =>
      getPlans({
        startDate: startDate ? startDate : todayDateFormat,
        endDate: endDate ? endDate : todayDateFormat,
      }).then(res => {
        setPlans(res.plans);
        setPlansCount(res.plans.length);
        return res;
      }),
  });

  const createPlan = (data: CreatePlanReqBody) => {
    createPlanReq(data).then(
      res => {
        navigate(-1);
      },
      err => {
        showAlert('plan 생성을 실패했습니다.');
      },
    );
  };

  const editPlan = (data: EditPlanReqBody) => {
    editPlanReq(data).then(
      res => {
        navigate(-1);
      },
      err => {
        showAlert('plan 수정을 실패했습니다.');
      },
    );
  };

  const deletePlan = (planId: number) => {
    deletePlanReq(planId).then(
      res => {
        setPlans(plans.filter(plan => plan.id !== planId));
        setPlansCount(plansCount - 1);
      },
      err => {
        showAlert('plan 제거에 실패했습니다!');
      },
    );
  };

  return {
    plans,
    plansCount,
    createPlan,
    editPlan,
    deletePlan,
    isLoading,
    isError,
  };
};
