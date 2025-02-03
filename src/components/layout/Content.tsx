// Content.tsx
import React from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';

const ContentWrapper = styled.div<{
  color?: string;
}>`
  position: relative;
  min-height: calc(100vh - 130px); // 헤더와 푸터의 높이를 고려한 최소 높이
  overflow-y: auto;
  background-color: ${props => props.color || palette.background};
`;

interface ContentProps {
  children: React.ReactNode;
  color?: string;
}

const Content: React.FC<ContentProps> = ({ children, color }) => {
  return <ContentWrapper color={color}>{children}</ContentWrapper>;
};

export default Content;
