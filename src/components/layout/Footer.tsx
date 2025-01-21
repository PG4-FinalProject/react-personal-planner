import React from 'react';
import { Calendar, ListTodo, BarChart2, User } from 'lucide-react';
import { palette } from '../../styles/palette'; // 팔레트 임포트

interface FooterProps {
  currentPage: string;
}

const menuItems = [
  { id: 'calendar', icon: Calendar, label: '캘린더' },
  { id: 'todo', icon: ListTodo, label: '할일' },
  { id: 'statistics', icon: BarChart2, label: '통계' },
  { id: 'profile', icon: User, label: '프로필' }
];

const Footer: React.FC<FooterProps> = ({ currentPage }) => {
  return (
    <footer className="Footer">
      {menuItems.map((item) => (
        <button
          key={item.id}
          className={`footer-item ${currentPage === item.id ? 'active' : ''}`}
          aria-label={item.label} // 접근성 향상
        >
          <item.icon size={20} />
          <span>{item.label}</span>
        </button>
      ))}
    </footer>
  );
};

export default Footer;
