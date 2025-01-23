import React from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';

interface ContentProps {
  children: React.ReactNode;
  color?: string;
}

const ContentWrapper = styled.div<{
  color?: string;
}>`
  width: 100%;
  max-width: 534px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 56px;
  padding-bottom: 56px;
  min-height: 100vh;
  background-color: ${props => props.color || palette.background};
  position: relative;
`;

const Content: React.FC<ContentProps> = ({ children, color }) => {
  return <ContentWrapper color={color}>{children}</ContentWrapper>;
};

export default Content;
