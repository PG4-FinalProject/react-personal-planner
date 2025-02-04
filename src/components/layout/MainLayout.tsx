import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { palette } from '../../styles/palette';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import { PlusButton } from '../common/PlusBtn';
import LucideIcon, { type LucideIconProps } from '../common/LucideIcon';
import Logo from '../common/Logo';
import SidebarMenu from './Sidebar';
import NotificationButton from '../notifications/NotificationBtn';

interface MainLayoutProps {
  children: ReactNode;
}

interface NavItem {
  path: string;
  icon: LucideIconProps['name'];
  label: string;
}

export const LayoutWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 534px;
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
`;

const FloatingButtonWrapper = styled.div`
  position: fixed;
  bottom: 80px;
  right: 16px;

  @media (min-width: 768px) {
    right: 50%;
    margin-right: -250px;
  }
`;

const FooterIconButton = styled.button<{ $isActive: boolean }>`
  background: none;
  border: none;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: ${({ $isActive }) =>
    $isActive ? palette.blue : '#666666'}; /* 활성화된 색상 */
  font-size: 12px;

  &:hover {
    color: ${palette.blue}; /* 호버 시 텍스트 색상 변경 */

    /* 호버 시 아이콘 색상 변경 */
    svg {
      color: ${palette.blue}; /* 아이콘 색상 변경 */
    }
  }
`;

const IconLabel = styled.span`
  margin-top: 2px;
  font-size: 12px;
`;

const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname; // 현재 경로 가져오기
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handlePageChange = (path: string) => {
    navigate(path);
  };

  const handleMenuClick = () => {
    setIsSidebarOpen(true);
    console.log('Menu clicked, sidebar state:', true); // 디버깅용 로그 추가
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleNotificationClick = () => {
    console.log('Notification clicked');
  };

  const headerContent = (
    <>
      <HeaderLeft>
        <HeaderButton onClick={handleMenuClick} aria-label="메뉴 열기">
          <LucideIcon name="Menu" size={24} />
        </HeaderButton>
        <Logo height="24px" />
      </HeaderLeft>
      <HeaderButton onClick={handleNotificationClick} aria-label="알림 보기">
        <NotificationButton />
      </HeaderButton>
    </>
  );

  const navItems: NavItem[] = [
    { path: '/calendar', icon: 'Calendar', label: '캘린더' },
    { path: '/plans', icon: 'ListTodo', label: '할일' },
    { path: '/statistics', icon: 'ChartBar', label: '통계' },
    { path: '/users', icon: 'User', label: '프로필' },
  ];

  const footerContent = (
    <>
      {navItems.map(({ path, icon, label }) => (
        <FooterIconButton
          key={path}
          onClick={() => handlePageChange(path)}
          $isActive={currentPath === path} // 현재 경로와 비교하여 활성화 상태 결정
        >
          <LucideIcon name={icon} size={24} /> {/* 색상 prop 제거 */}
          <IconLabel>{label}</IconLabel>
        </FooterIconButton>
      ))}
    </>
  );

  return (
    <LayoutWrapper>
      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      <Header>{headerContent}</Header>
      <Content>{children}</Content>
      <FloatingButtonWrapper>
        <PlusButton onClick={() => navigate('/plans/create')} />
      </FloatingButtonWrapper>
      <Footer>{footerContent}</Footer>
    </LayoutWrapper>
  );
};

export default MainLayout;
