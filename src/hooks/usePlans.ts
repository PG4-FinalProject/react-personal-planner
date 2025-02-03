import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { getPlans } from '../apis/plans.api';
import { getDateFormat } from '../utils/date';

export const usePlans = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const startDate = params.get('startDate');
  const endDate = params.get('endDate');

  const todayDateFormat = getDateFormat(new Date());

  const { data: plansData, isLoading: isPlansLoading } = useQuery({
    queryKey: ['plans', location.search],
    queryFn: async () =>
      getPlans({
        startDate: startDate ? startDate : todayDateFormat,
        endDate: endDate ? endDate : todayDateFormat,
      }),
  });

  return {
    plans: plansData.plans,
    isPlansLoading,
  };
};
