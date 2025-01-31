import React from 'react';
import styled from 'styled-components';
import { Bell } from 'lucide-react';
import { useNotification } from '../../hooks/useNotification';
import NotificationModal from './NotificationModal';

const ButtonContainer = styled.button`
  position: relative;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  background-color: #ef4444;
  border-radius: 50%;
`;

const NotificationButton: React.FC = () => {
  const { notifications, unreadCount, isOpen, toggleModal, markAsRead } =
    useNotification();

  return (
    <>
      <ButtonContainer onClick={toggleModal}>
        <Bell size={20} />
        {unreadCount > 0 && <Badge />}
      </ButtonContainer>
      <NotificationModal
        isOpen={isOpen}
        onClose={toggleModal}
        notifications={notifications}
        onMarkAsRead={markAsRead}
      />
    </>
  );
};

export default NotificationButton;
