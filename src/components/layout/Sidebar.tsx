import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../common/BackBtn';
import styled from 'styled-components';
import { palette } from '../../styles/palette';
import IconButton from '../common/CheckBtn';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 150;
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: calc(50% - 265px);
  width: 387px;
  height: 100%;
  background-color: white;
  z-index: 200;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;

  @media (max-width: 1068px) {
    left: 0;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 16px;
  border-bottom: 1px solid #ebebeb;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${palette.gray};

  &:hover {
    background-color: #f5f5f5;
    border-radius: 50%;
  }
`;

const ButtonWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
`;

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLogin = () => {
    onClose(); // 사이드바를 먼저 닫고
    navigate('/users/login'); // 로그인 페이지로 이동
  };

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <SidebarContainer>
        <SidebarHeader>
          <CloseButton onClick={onClose} aria-label="메뉴 닫기">
            <BackBtn size={24} />
          </CloseButton>
        </SidebarHeader>
        <ButtonWrapper>
          <IconButton
            width="90%"
            bgColor={palette.white}
            color={palette.gray}
            onClick={handleLogin}
            fontSize="20px"
          >
            로그인하기
          </IconButton>
        </ButtonWrapper>
      </SidebarContainer>
    </>
  );
};

export default SidebarMenu;
