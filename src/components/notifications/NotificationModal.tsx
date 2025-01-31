// src/components/notifications/NotificationModal.tsx
import React from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';
import type { Notification } from '../../types/notification';

// src/components/notifications/NotificationModal.tsx
const ModalOverlay = styled.div`
  position: fixed;
  top: 65px; // 헤더 높이만큼 내림
  right: 0;
  width: 100%;
  height: calc(100% - 65px); // 헤더 높이만큼 뺌
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 98; // 헤더보다 낮은 z-index
  display: flex;
  justify-content: flex-end;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 0; // top 값 수정
  right: 16px;
  width: 320px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 99; // overlay보다 높고 헤더보다 낮은 z-index
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
`;

const Title = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  &:hover {
    opacity: 0.7;
  }
`;

const NotificationList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const NotificationItem = styled.div<{ isChecked: boolean }>`
  padding: 16px;
  border-bottom: 1px solid #eee;
  opacity: ${props => (props.isChecked ? 0.6 : 1)};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => (props.isChecked ? 'transparent' : '#f5f5f5')};
  }
`;

const Message = styled.p`
  margin: 0;
  margin-bottom: 4px;
  font-size: 0.9rem;
`;

const Timestamp = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
}) => {
  if (!isOpen) return null;

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isChecked) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <Title>알림</Title>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        <NotificationList>
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <NotificationItem
                key={notification.id}
                isChecked={notification.isChecked}
                onClick={() => handleNotificationClick(notification)}
              >
                <Message>{notification.message}</Message>
                <Timestamp>{notification.timestamp}</Timestamp>
              </NotificationItem>
            ))
          ) : (
            <div
              style={{ padding: '16px', textAlign: 'center', color: '#666' }}
            >
              알림이 없습니다
            </div>
          )}
        </NotificationList>
      </ModalContent>
    </ModalOverlay>
  );
};

export default NotificationModal;
