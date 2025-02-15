import { ReactNode } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { palette } from '../../styles/palette';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #efefef;
`;

const LayoutWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 534px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

interface LayoutProps {
  children: ReactNode;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
  onPageChange: (path: string) => void; // onPageChange 추가
}

const Layout = ({ children, headerContent, footerContent }: LayoutProps) => {
  return (
    <LayoutContainer>
      <LayoutWrapper>
        <Header color={palette.white}>{headerContent}</Header>
        <Content color={palette.background}>{children}</Content>
        <Footer color={palette.white}>{footerContent}</Footer>
      </LayoutWrapper>
    </LayoutContainer>
  );
};

export default Layout;
