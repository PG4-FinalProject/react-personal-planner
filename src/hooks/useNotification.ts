// src/hooks/useNotification.ts
import { useState, useCallback, useEffect } from 'react';
import { mockNotifications } from '../mocks/notificationData';
import type { Notification } from '../types/notification';
import { useAuthStore } from '../store/authStore';

export const useNotification = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin } = useAuthStore();

  // 읽지 않은 알림 개수
  const unreadCount = notifications.filter(noti => !noti.isChecked).length;

  // 알림 읽음 처리
  const markAsRead = useCallback(
    async (id: number) => {
      if (isLogin) {
        // TODO: API 연동
        // await notificationApi.markAsRead(id);
      }
      setNotifications(prev =>
        prev.map(noti =>
          noti.id === id ? { ...noti, isChecked: true } : noti,
        ),
      );
    },
    [isLogin],
  );

  // 모달 열기/닫기
  const toggleModal = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // 알림 목록 가져오기
  const fetchNotifications = useCallback(async () => {
    if (isLogin) {
      // TODO: API 연동
      // const response = await notificationApi.getNotifications();
      // setNotifications(response.data);
    } else {
      setNotifications(mockNotifications);
    }
  }, [isLogin]);

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
