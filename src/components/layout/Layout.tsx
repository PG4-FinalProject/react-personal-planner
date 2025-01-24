import React, { ReactNode } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { palette } from '../../styles/palette';

interface LayoutProps {
  children: ReactNode;
  headerContent?: ReactNode;
  onPageChange: (path: string) => void;
}

const Layout = ({ children, headerContent, onPageChange }: LayoutProps) => {
  return (
    <div className="relative min-h-screen w-full">
      <Header color={palette.white}>{headerContent}</Header>
      <Content color={palette.background}>{children}</Content>
      <Footer color={palette.white} onPageChange={onPageChange} />
    </div>
  );
};

export default Layout;
