import React from 'react';
import styled from 'styled-components';

const StyledBox = styled.div<{ bgColor?: string }>`
  padding: 16px;
  border-radius: 4px;
  background-color: ${props => props.bgColor || '#fff'}; //박스 색 유연하게 설정
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  margin: 16px;
`;

interface ContentUIBoxProps {
  children: React.ReactNode;
  bgColor?: string;
}

const ContentUIBox: React.FC<ContentUIBoxProps> = ({ children, bgColor }) => {
  return <StyledBox bgColor={bgColor}>{children}</StyledBox>;
};

export default ContentUIBox;
