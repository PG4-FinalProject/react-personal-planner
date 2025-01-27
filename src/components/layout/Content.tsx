// Content.tsx
import React from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';

const ContentWrapper = styled.div<{
  color?: string;
}>`
  flex: 1;
  max-width: 534px;
  min-height: calc(100vh - 130px); // 헤더와 푸터의 높이를 고려한 최소 높이
  margin: 0 auto;
  margin-bottom: 65px;
  margin-top: 65px;
  overflow-y: auto;
  background-color: ${props => props.color || palette.background};
`;

const ContentInner = styled.div`
  width: 100%;
  height: 100%;
`;

interface ContentProps {
  children: React.ReactNode;
  color?: string;
}

const Content: React.FC<ContentProps> = ({ children, color }) => {
  return (
    <ContentWrapper color={color}>
      <ContentInner>{children}</ContentInner>
    </ContentWrapper>
  );
};

export default Content;
