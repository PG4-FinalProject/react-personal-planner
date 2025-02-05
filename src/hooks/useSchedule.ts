import { useState, useCallback, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useQuery } from '@tanstack/react-query';
import type { Schedule } from '../types/schedule';
import type { PlanI } from '../types/plan.type';
import { getDateFormat } from '../utils/date';
import { mockSchedules } from '../mocks/scheduleDate';
import {
  getPlans,
  createPlanReq,
  editPlanReq,
  deletePlanReq,
} from '../apis/plans.api';
import { useAlert } from './useAlert';
import { useCategory } from './useCategory';

// PlanI를 Schedule 형식으로 변환하는 함수
const convertPlanToSchedule = (plan: PlanI): Schedule => ({
  id: plan.id,
  title: plan.title,
  startTime: plan.startTime.split(' ')[1],
  endTime: plan.endTime.split(' ')[1],
  date: plan.startTime.split(' ')[0],
  category: plan.categoryName,
  description: plan.detail,
});

export const useSchedule = () => {
  const [schedules, setSchedules] = useState<Schedule[]>(mockSchedules);
  const { isLogin } = useAuthStore();
  const { showAlert } = useAlert();
  const { categories } = useCategory();

  // React Query로 해당 월의 plans 데이터 가져오기
  const { data: plansData, isLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      if (!isLogin) return null;

      const currentDate = new Date();
      const startDate = getDateFormat(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      );
      const endDate = getDateFormat(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
      );

      return getPlans({ startDate, endDate });
    },
    enabled: isLogin,
  });

  useEffect(() => {
    if (isLogin && plansData?.plans) {
      const convertedSchedules = plansData.plans.map(convertPlanToSchedule);
      setSchedules(convertedSchedules);
    } else {
      setSchedules(mockSchedules);
    }
  }, [isLogin, plansData]);

  const getSchedulesByDate = useCallback(
    (date: Date) => {
      const dateString = getDateFormat(date);
      return schedules.filter(schedule => schedule.date === dateString);
    },
    [schedules],
  );

  const updateSchedule = async (id: number, updateData: Partial<Schedule>) => {
    try {
      if (isLogin) {
        const category = categories.find(c => c.name === updateData.category);
        const planData = {
          id,
          title: updateData.title!,
          detail: updateData.description || '',
          startTime: `${updateData.date} ${updateData.startTime}`,
          endTime: `${updateData.date} ${updateData.endTime}`,
          categoryId: category?.id || categories[0]?.id || 1,
        };
        await editPlanReq(planData);
        showAlert('일정이 수정되었습니다.');
      } else {
        // 목데이터 수정
        setSchedules(prev =>
          prev.map(schedule =>
            schedule.id === id ? { ...schedule, ...updateData } : schedule,
          ),
        );
        showAlert('일정이 수정되었습니다.');
      }
    } catch (error) {
      showAlert('일정 수정에 실패했습니다.');
      console.error('일정 수정 실패:', error);
    }
  };

  const deleteSchedule = async (id: number) => {
    try {
      if (isLogin) {
        await deletePlanReq(id);
      }
      // 로그인 상태와 관계없이 로컬 상태 업데이트
      setSchedules(prev => prev.filter(schedule => schedule.id !== id));
      showAlert('일정이 삭제되었습니다.');
    } catch (error) {
      showAlert('일정 삭제에 실패했습니다.');
      console.error('일정 삭제 실패:', error);
    }
  };

  const createSchedule = async (schedule: Omit<Schedule, 'id'>) => {
    try {
      if (isLogin) {
        const category = categories.find(c => c.name === schedule.category);
        const planData = {
          title: schedule.title,
          detail: schedule.description || '',
          startTime: `${schedule.date} ${schedule.startTime}`,
          endTime: `${schedule.date} ${schedule.endTime}`,
          categoryId: category?.id || categories[0]?.id || 1,
        };
        await createPlanReq(planData);
      } else {
        // 목데이터에 새 일정 추가
        const newSchedule = {
          ...schedule,
          id: Math.max(...schedules.map(s => s.id), 0) + 1,
        };
        setSchedules(prev => [...prev, newSchedule]);
      }
      showAlert('일정이 생성되었습니다.');
    } catch (error) {
      showAlert('일정 생성에 실패했습니다.');
      console.error('일정 생성 실패:', error);
    }
  };

  return {
    schedules,
    getSchedulesByDate,
    isLoading,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  };
};
