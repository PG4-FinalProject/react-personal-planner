import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { palette } from '../../styles/palette';

interface FooterProps {
  onPageChange: (path: string) => void;
}

// 스타일 정의
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

const Footer: React.FC<FooterProps> = () => {
  return (
    <FooterWrapper>
      {/* 레이아웃만 잡기 위해 내용은 비워둡니다. */}
      {/* 필요한 경우 여기에 자식 컴포넌트를 추가할 수 있습니다. */}
    </FooterWrapper>
  );
};

export default Footer;
