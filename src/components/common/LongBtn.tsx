import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button<{
  height?: string;
  width?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
}>`
  height: ${props => props.height || '40px'};
  width: ${props => props.width || '100%'};
  background-color: ${props => props.color || '#3B82F6'};
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

interface ButtonProps {
  children: React.ReactNode;
  height?: string;
  width?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset'; // type prop 추가
}

const Button: React.FC<ButtonProps> = ({
  children,
  height,
  width,
  color,
  fontSize,
  fontWeight,
  onClick,
  type = 'button', // 기본값을 'button'으로 설정
}) => {
  return (
    <StyledButton
      height={height}
      width={width}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      onClick={onClick}
      type={type}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
