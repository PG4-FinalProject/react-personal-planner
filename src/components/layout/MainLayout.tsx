import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import { PlusButton } from '../common/PlusBtn';
import LucideIcon from '../common/LucideIcon';
import Logo from '../common/Logo';

interface MainLayoutProps {
  children: ReactNode;
}

const LayoutWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
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

const FloatingButtonWrapper = styled.div`
  position: fixed;
  bottom: 80px;
  right: 16px;

  @media (min-width: 768px) {
    right: 50%;
    margin-right: -250px;
  }
`;

const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();

  const handlePageChange = (path: string) => {
    navigate(path);
  };

  const handleMenuClick = () => {
    console.log('Menu clicked');
  };

  const handleNotificationClick = () => {
    console.log('Notification clicked');
  };

  const headerContent = (
    <>
      <HeaderLeft>
        <HeaderButton onClick={handleMenuClick} aria-label="메뉴 열기">
          <LucideIcon name="Menu" size={24} color="#4B5563" />
        </HeaderButton>
        <Logo height="24px" />
      </HeaderLeft>
      <HeaderButton onClick={handleNotificationClick} aria-label="알림 보기">
        <LucideIcon name="Bell" size={20} color="#4B5563" />
      </HeaderButton>
    </>
  );

  return (
    <LayoutWrapper>
      <Header>{headerContent}</Header>
      <Content>
        {children}
        <FloatingButtonWrapper>
          <PlusButton onClick={() => navigate('/plans/create')} />
        </FloatingButtonWrapper>
      </Content>
      <Footer onPageChange={handlePageChange} />
    </LayoutWrapper>
  );
};

export default MainLayout;
