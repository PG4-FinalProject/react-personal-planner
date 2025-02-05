import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1<{
  fontSize: string;
  fontWeight?: string;
  color: string;
  $textAlign: string;
  $absCenter?: boolean;
}>`
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  color: ${props => props.color};
  text-align: ${props => props.$textAlign};
  position: ${props => props.$absCenter && 'absolute'};
  left: ${props => props.$absCenter && '50%'};
  transform: ${props => props.$absCenter && 'translateX(-50%)'};
`;

interface TitleProps {
  children: React.ReactNode;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  textAlign?: string;
  absoluteCenter?: boolean;
}

const Title: React.FC<TitleProps> = ({
  children,
  fontSize = '24px',
  fontWeight = 'bold',
  color = '#000',
  textAlign = 'left',
  absoluteCenter,
}) => {
  return (
    <StyledTitle
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      $textAlign={textAlign}
      $absCenter={absoluteCenter}
    >
      {children}
    </StyledTitle>
  );
};

export default Title;
