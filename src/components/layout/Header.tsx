import React from 'react';
import { Bell, Menu } from 'lucide-react';
import Logo from '../../assets/Logo.png';  // 상대 경로로 로고 import

const Header = () => {
  return (
    <header className="Header">
      <div className="header-left">
        <button 
          className="menu-button" 
          aria-label="메뉴 열기"
        >
          <Menu size={24} color="#333333" />
        </button>
        <img 
          src={Logo} 
          alt="로고" 
          className="h-8 w-auto" // 높이 32px, 너비는 비율 유지
        />
      </div>
      <button 
        className="notification-button" 
        aria-label="알림 보기"
      >
        <Bell size={20} color="#333333" />
      </button>
    </header>
  );
};

export default Header;