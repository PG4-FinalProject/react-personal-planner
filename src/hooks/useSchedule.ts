import { useState, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import type { Schedule } from '../types/schedule';
import { formatDate } from '../utils/date';
import { mockSchedules } from '../mocks/scheduleDate';

export const useSchedule = () => {
  // 전체 일정 데이터를 상태로 관리
  const [schedules, setSchedules] = useState<Schedule[]>(mockSchedules);
  const [isLoading, setIsLoading] = useState(false);
  const { isLogin } = useAuthStore();

  // src/hooks/useSchedule.ts
  const getSchedulesByDate = useCallback(
    (date: Date) => {
      const dateString = formatDate(date);
      return schedules.filter(schedule => schedule.date === dateString);
    },
    [schedules],
  );

  const createSchedule = async (schedule: Omit<Schedule, 'id'>) => {
    if (!isLogin) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: 실제 API 연동 시 구현
      // const response = await scheduleApi.createSchedule(schedule);
      const newSchedule = {
        ...schedule,
        id: Math.max(...schedules.map(s => s.id), 0) + 1,
      };
      setSchedules(prev => [...prev, newSchedule]);
    } catch (error) {
      console.error('일정 생성 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSchedule = async (id: number, updateData: Partial<Schedule>) => {
    if (!isLogin) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: 실제 API 연동 시 구현
      // const response = await scheduleApi.updateSchedule(id, updateData);
      setSchedules(prev =>
        prev.map(schedule =>
          schedule.id === id ? { ...schedule, ...updateData } : schedule,
        ),
      );
    } catch (error) {
      console.error('일정 수정 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSchedule = async (id: number) => {
    if (!isLogin) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: 실제 API 연동 시 구현
      // await scheduleApi.deleteSchedule(id);
      setSchedules(prev => prev.filter(schedule => schedule.id !== id));
    } catch (error) {
      console.error('일정 삭제 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    schedules, // 전체 일정 목록
    getSchedulesByDate, // 특정 날짜의 일정을 가져오는 함수
    isLoading,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  };
};
