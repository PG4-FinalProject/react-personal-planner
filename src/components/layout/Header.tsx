import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';

const HeaderWrapper = styled.header<{
  $borderWidth?: string;
  borderColor?: string;
}>`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 534px;
  height: 65px;
  background-color: ${props => props.bgColor || palette.white};
  border-bottom: ${props => props.$borderWidth || '1px'} solid
    ${props => props.borderColor || '#ebebeb'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 100;
`;

interface HeaderProps {
  children: ReactNode; // children의 타입을 ReactNode로 설정
  color?: string; // 배경색
  borderColor?: string; // 하단 테두리 색상
  borderWidth?: string; // 하단 테두리 두께
}

const Header: React.FC<HeaderProps> = ({
  children,
  color,
  borderColor,
  borderWidth,
}) => {
  return (
    <HeaderWrapper
      bgColor={color}
      borderColor={borderColor}
      $borderWidth={borderWidth}
    >
      {children}
    </HeaderWrapper>
  );
};

export default Header;
