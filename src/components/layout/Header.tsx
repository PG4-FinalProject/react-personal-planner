import React from 'react';
import styled from 'styled-components';
import { Bell, Menu } from 'lucide-react';
import { palette } from '../../styles/palette';
import Logo from '../../assets/Logo.png';

interface HeaderProps {
  onMenuClick: () => void;
  onNotificationClick: () => void;
}

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 534px;
  height: 56px;
  background-color: ${palette.white};
  border-bottom: 1px solid #ebebeb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 100;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #666666;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const LogoImage = styled.img`
  height: 24px;
  width: auto;
  object-fit: contain;
`;

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  onNotificationClick,
}) => {
  return (
    <HeaderWrapper>
      <HeaderLeft>
        <HeaderButton onClick={onMenuClick} aria-label="메뉴 열기">
          <Menu size={24} color="#4B5563" />
        </HeaderButton>
        <LogoImage src={Logo} alt="로고" />
      </HeaderLeft>
      <HeaderButton onClick={onNotificationClick} aria-label="알림 보기">
        <Bell size={20} color="#4B5563" />
      </HeaderButton>
    </HeaderWrapper>
  );
};

export default Header;
