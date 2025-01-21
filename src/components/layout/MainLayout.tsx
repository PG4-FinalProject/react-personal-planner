import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import { PlusButton } from '../common/PlusBtn';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/plans/create');
  };

  const handlePageChange = (path: string) => {
    navigate(path);
  };

  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        <Content>{children}</Content>
      </main>
      <PlusButton onClick={handleAddClick} />
      <Footer onPageChange={handlePageChange} />
    </div>
  );
};

export default MainLayout;