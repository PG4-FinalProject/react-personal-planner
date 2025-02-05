import { useState, useCallback, useEffect } from 'react';
import { mockNotifications } from '../mocks/notificationData';
import type { Notification } from '../types/notification';
import { useAuthStore } from '../store/authStore';
import { notificationApi } from '../apis/notification.api';
import { getDateFormat } from '../utils/date'; // 날짜 포맷 유틸 import

// useNotification.ts
export const useNotification = () => {
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
      }
      setNotifications(prev =>
        prev.map(noti =>
          noti.id === id ? { ...noti, isChecked: true } : noti,
        ),
      );
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
        setNotifications(response);
      } catch (error) {
        console.error('알림 조회 실패:', error);
        setNotifications([]); // 에러 시 빈 배열
      }
    } else {
      // 비로그인 시 목데이터
      const todayMockNotifications =
        filterTodayNotifications(mockNotifications);
      setNotifications(todayMockNotifications);
    }
  }, [isLogin, filterTodayNotifications]);

  useEffect(() => {
    fetchNotifications();
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
