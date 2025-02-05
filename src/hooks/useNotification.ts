import { useState, useCallback, useEffect } from 'react';
import { mockNotifications } from '../mocks/notificationData';
import type { Notification } from '../types/notification';
import { useAuthStore } from '../store/authStore';
import { notificationApi } from '../apis/notification.api';
import { getDateFormat } from '../utils/date'; // 날짜 포맷 유틸 import

// src/hooks/useNotification.ts
export const useNotification = () => {
  // 초기 상태를 빈 배열로 설정
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin } = useAuthStore();

  const today = getDateFormat(new Date());

  const filterTodayNotifications = useCallback(
    (notis: Notification[]) => {
      return notis.filter(noti => noti.timestamp === today);
    },
    [today],
  );

  const unreadCount = notifications.filter(noti => !noti.isChecked).length;

  const markAsRead = useCallback(
    async (id: number) => {
      if (isLogin) {
        await notificationApi.markAsRead(id);
        // API 호출 후 상태 업데이트
        setNotifications(prev =>
          prev.map(noti =>
            noti.id === id ? { ...noti, isChecked: true } : noti,
          ),
        );
      } else {
        // 비로그인 상태에서만 목데이터 수정
        setNotifications(prev =>
          prev.map(noti =>
            noti.id === id ? { ...noti, isChecked: true } : noti,
          ),
        );
      }
    },
    [isLogin],
  );

  const toggleModal = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const fetchNotifications = useCallback(async () => {
    if (isLogin) {
      try {
        const response = await notificationApi.getTodayNotifications();
        const todayNotifications = filterTodayNotifications(response);
        setNotifications(todayNotifications);
      } catch (error) {
        console.error('알림 조회 실패:', error);
        setNotifications([]); // 에러 시 빈 배열로 설정
      }
    } else {
      // 비로그인 상태에서만 목데이터 사용
      const todayMockNotifications =
        filterTodayNotifications(mockNotifications);
      setNotifications(todayMockNotifications);
    }
  }, [isLogin, filterTodayNotifications]);

  useEffect(() => {
    fetchNotifications();
    // 주기적으로 알림을 갱신하는 interval 설정
    const intervalId = setInterval(fetchNotifications, 60000);
    return () => clearInterval(intervalId);
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    isOpen,
    toggleModal,
    markAsRead,
  };
};
