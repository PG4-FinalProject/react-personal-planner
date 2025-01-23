import React from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';

interface ContentProps {
  children: React.ReactNode;
}

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 534px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 56px;
  padding-bottom: 56px;
  min-height: 100vh;
  background-color: ${palette.background};
  position: relative;
`;

const Content: React.FC<ContentProps> = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

export default Content;
