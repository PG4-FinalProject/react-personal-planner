import React, { ReactNode } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  headerContent?: ReactNode;
  onPageChange: (path: string) => void;
}

const Layout = ({ children, headerContent, onPageChange }: LayoutProps) => {
  return (
    <div className="relative min-h-screen w-full">
      <Header>{headerContent}</Header>
      <Content>{children}</Content>
      <Footer onPageChange={onPageChange} />
    </div>
  );
};

export default Layout;
