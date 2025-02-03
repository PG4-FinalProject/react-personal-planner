import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { deletePlanReq, getPlans } from '../apis/plans.api';
import { getDateFormat } from '../utils/date';
import { useState } from 'react';
import { PlanI } from '../types/plan.type';

export const usePlans = () => {
  const [plans, setPlans] = useState<PlanI[]>([]);
  const [plansCount, setPlansCount] = useState<number>(0);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const startDate = params.get('startDate');
  const endDate = params.get('endDate');

  const todayDateFormat = getDateFormat(new Date('2025-01-26 8:30:00'));

  const { isLoading, isError } = useQuery({
    queryKey: ['plans', location.search],
    queryFn: async () =>
      getPlans({
        startDate: startDate ? startDate : todayDateFormat,
        endDate: endDate ? endDate : todayDateFormat,
      }).then(res => {
        console.log(res);
        setPlans(res.plans);
        setPlansCount(res.plans.length);
        return res;
      }),
  });

  const deletePlan = (planId: number) => {
    deletePlanReq(planId).then(req => {
      setPlans(plans.filter(plan => plan.id !== planId));
      setPlansCount(plansCount - 1);
    });
  };

  return {
    plans,
    plansCount,
    deletePlan,
    isLoading,
    isError,
  };
};
