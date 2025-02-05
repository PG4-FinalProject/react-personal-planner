import { useState, useCallback, useEffect } from 'react';
import { mockNotifications } from '../mocks/notificationData';
import type { Notification } from '../types/notification';
import { useAuthStore } from '../store/authStore';
import { notificationApi } from '../apis/notification.api';
import { getDateFormat } from '../utils/date'; // 날짜 포맷 유틸 import

export const useNotification = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin } = useAuthStore();

  // 오늘 날짜 구하기
  const today = getDateFormat(new Date());

  // 오늘의 알림만 필터링하는 함수
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
        // API에서 가져온 데이터도 오늘 날짜로 필터링
        const todayNotifications = filterTodayNotifications(response);
        setNotifications(todayNotifications);
      } catch (error) {
        console.error('알림 조회 실패:', error);
        // 목 데이터도 오늘 날짜로 필터링
        const todayMockNotifications =
          filterTodayNotifications(mockNotifications);
        setNotifications(todayMockNotifications);
      }
    } else {
      // 목 데이터 오늘 날짜로 필터링
      const todayMockNotifications =
        filterTodayNotifications(mockNotifications);
      setNotifications(todayMockNotifications);
    }
  }, [isLogin, filterTodayNotifications]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    isOpen,
    toggleModal,
    markAsRead,
  };
};
