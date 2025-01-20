import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode; // props의 타입을 명확하게 정의
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer currentPage="Calendar" /> {/* 현재 페이지를 prop으로 전달 */}
    </>
  );
};

export default MainLayout;
