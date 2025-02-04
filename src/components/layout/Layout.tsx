import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { palette } from '../../styles/palette';
import { LayoutWrapper } from './MainLayout';

interface LayoutProps {
  children: ReactNode;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
}

const Layout = ({ children, headerContent, footerContent }: LayoutProps) => {
  return (
    <LayoutWrapper>
      <Header color={palette.white}>{headerContent}</Header>
      <Content color={palette.background}>{children}</Content>
      <Footer color={palette.white}>{footerContent}</Footer>
    </LayoutWrapper>
  );
};

export default Layout;
