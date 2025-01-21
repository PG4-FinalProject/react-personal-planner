import React from 'react';
import { Calendar, ListTodo, BarChart2, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { palette } from '../../styles/palette';

interface FooterProps {
  onPageChange: (path: string) => void;
}

const menuItems = [
  { 
    id: 'calendar', 
    icon: Calendar, 
    label: '캘린더',
    path: '/calendar'
  },
  { 
    id: 'plans', 
    icon: ListTodo, 
    label: '할일',
    path: '/plans'
  },
  { 
    id: 'statistics', 
    icon: BarChart2, 
    label: '통계',
    path: '/statistics'
  },
  { 
    id: 'users', 
    icon: User, 
    label: '프로필',
    path: '/users'
  }
];

const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <footer className="Footer">
      {menuItems.map((item) => {
        const isActive = currentPath === item.path || 
                        (currentPath === '/' && item.path === '/calendar');
        return (
          <button
            key={item.id}
            onClick={() => onPageChange(item.path)}
            className={`footer-item ${isActive ? 'active' : ''}`}
            aria-label={item.label}
          >
            <item.icon 
              size={20} 
              color={isActive ? palette.blue : '#666666'}
            />
            <span>{item.label}</span>
          </button>
        );
      })}
    </footer>
  );
};

export default Footer;