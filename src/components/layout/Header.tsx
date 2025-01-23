import React, { ReactNode } from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 534px;
  height: 65px;
  background-color: #ffffff; /* 배경색을 직접 지정 */
  border-bottom: 1px solid #ebebeb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 100;
`;

interface HeaderProps {
  children: ReactNode; // children의 타입을 ReactNode로 설정
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return <HeaderWrapper>{children}</HeaderWrapper>;
};

export default Header;
