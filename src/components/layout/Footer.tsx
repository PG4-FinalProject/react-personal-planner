import React from 'react';
import styled from 'styled-components';
import { Calendar, ListTodo, BarChart2, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { palette } from '../../styles/palette';

interface FooterProps {
  onPageChange: (path: string) => void;
}

const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 534px;
  height: 56px;
  background-color: ${palette.white};
  border-top: 1px solid #ebebeb;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
`;

interface FooterButtonProps {
  isActive: boolean;
}

const FooterButton = styled.button<FooterButtonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border: none;
  background: none;
  cursor: pointer;
  width: 25%;
  padding: 8px 0;
  color: ${props => (props.isActive ? palette.blue : '#666666')};
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

const ButtonText = styled.span<FooterButtonProps>`
  font-size: 11px;
  line-height: 1.2;
  color: ${props => (props.isActive ? palette.blue : '#666666')};
  transition: color 0.2s ease-in-out;
`;

const menuItems = [
  { id: 'calendar', icon: Calendar, label: '캘린더', path: '/calendar' },
  { id: 'plans', icon: ListTodo, label: '할일', path: '/plans' },
  { id: 'statistics', icon: BarChart2, label: '통계', path: '/statistics' },
  { id: 'users', icon: User, label: '프로필', path: '/users' },
];

const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <FooterWrapper>
      {menuItems.map(item => {
        const isActive =
          currentPath === item.path ||
          (currentPath === '/' && item.path === '/calendar');
        return (
          <FooterButton
            key={item.id}
            isActive={isActive}
            onClick={() => onPageChange(item.path)}
            aria-label={item.label}
          >
            <item.icon size={20} color={isActive ? palette.blue : '#666666'} />
            <ButtonText isActive={isActive}>{item.label}</ButtonText>
          </FooterButton>
        );
      })}
    </FooterWrapper>
  );
};

export default Footer;
