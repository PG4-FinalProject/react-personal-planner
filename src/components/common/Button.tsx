import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';

const StyledButton = styled.button<{
  $margin?: string;
  height: string;
  width: string;
  $bgColor: string;
  fontSize: string;
  fontWeight: string;
}>`
  margin: ${props => props.$margin};
  height: ${props => props.height};
  width: ${props => props.width};
  background-color: ${props => props.$bgColor};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
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
  margin?: string;
  height?: string;
  width?: string;
  bgColor?: string;
  fontSize?: string;
  fontWeight?: string;
}

const Button = ({
  children,
  type = 'button', // 기본값을 'button'으로 설정
  margin,
  height = '40px',
  width = '100%',
  bgColor = palette.blue,
  fontSize = '16px',
  fontWeight = 'bold',
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      type={type}
      $margin={margin}
      height={height}
      width={width}
      $bgColor={bgColor}
      fontSize={fontSize}
      fontWeight={fontWeight}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
