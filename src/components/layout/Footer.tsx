import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';

interface FooterProps {
  onPageChange: (path: string) => void;
  children?: ReactNode; // children prop 추가
  color?: string;
}

// 스타일 정의
const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 534px;
  height: 65px;
  background-color: ${props => props.color || palette.white};
  border-top: 1px solid #ebebeb;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
`;

const Footer: React.FC<FooterProps> = ({ children, color }) => {
  // children 추가
  return (
    <FooterWrapper color={color}>
      {children} {/* children을 사용하여 외부에서 전달된 내용 표시 */}
    </FooterWrapper>
  );
};

export default Footer;
