import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import { PlusButton } from '../common/PlusBtn';

interface MainLayoutProps {
  children: React.ReactNode; // props의 타입을 명확하게 정의
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleClick = () => {
    navigate('/createPlans'); // createPlans 페이지로 이동
  };

  return (
    <>
      <Header />
      <Content>{children}</Content> {/* Content에 children 전달 */}
      <PlusButton onClick={handleClick} /> {/* onClick 핸들러 전달 */}
      <Footer currentPage="Calendar" /> {/* 현재 페이지를 prop으로 전달 */}
    </>
  );
};

export default MainLayout;
