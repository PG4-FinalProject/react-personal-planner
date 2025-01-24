import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1<{
  fontSize?: string;
  color?: string;
  textAlign?: string;
}>`
  font-size: ${props => props.fontSize || '24px'};
  color: ${props => props.color || '#000'};
  text-align: ${props => props.textAlign || 'left'};
  margin: 0;
`;

interface TitleProps {
  children: React.ReactNode;
  fontSize?: string; // 글자 크기 prop
  color?: string; // 글자 색상 prop
  textAlign?: string; // 정렬 방식 prop
}

const Title: React.FC<TitleProps> = ({
  children,
  fontSize,
  color,
  textAlign,
}) => {
  return (
    <StyledTitle fontSize={fontSize} color={color} textAlign={textAlign}>
      {children}
    </StyledTitle>
  );
};

export default Title;
