// Content.tsx
import React from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';

const ContentWrapper = styled.div<{
  color?: string;
  $noFooter?: boolean;
}>`
  position: relative;
  margin: 65px 0px ${({ $noFooter }) => ($noFooter ? '0px' : '65px')} 0px;
  min-height: calc(
    100vh - ${({ $noFooter }) => ($noFooter ? '65px' : '130px')}
  ); // 헤더와 푸터의 높이를 고려한 최소 높이
  overflow-y: auto;
  background-color: ${props => props.color || palette.background};
`;

interface ContentProps {
  children: React.ReactNode;
  color?: string;
  noFooter?: boolean;
}

const Content: React.FC<ContentProps> = ({ children, color, noFooter }) => {
  return (
    <ContentWrapper color={color} $noFooter={noFooter}>
      {children}
    </ContentWrapper>
  );
};

export default Content;
