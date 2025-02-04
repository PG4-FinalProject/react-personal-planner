import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';

const StyledButton = styled.button<{
  height?: string;
  width?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
}>`
  height: ${props => props.height || '54px'};
  width: ${props => props.width || '100%'};
  background-color: ${props => props.color || palette.blue};
  font-size: ${props => props.fontSize || '16px'};
  font-weight: ${props => props.fontWeight || 'bold'};
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  height?: string;
  width?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
}

const Button = ({
  children,
  type = 'button', // 기본값을 'button'으로 설정
  height,
  width,
  color,
  fontSize,
  fontWeight,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      type={type}
      height={height}
      width={width}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
