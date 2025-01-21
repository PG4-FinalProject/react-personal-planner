import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import { palette } from '../../styles/palette';

interface MainLayoutProps {
  children: React.ReactNode;
}

const LayoutWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
`;

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
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

  return (
    <LayoutWrapper>
      <Header
        onMenuClick={handleMenuClick}
        onNotificationClick={handleNotificationClick}
      />
      <Content>{children}</Content>

      <Footer onPageChange={handlePageChange} />
    </LayoutWrapper>
  );
};

export default MainLayout;
