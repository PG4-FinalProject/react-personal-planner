import { ChevronRight } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button<{
  height: string;
  width: string;
  $bgColor: string;
  color: string;
  fontSize: string;
}>`
  height: ${props => props.height};
  width: ${props => props.width};
  background-color: ${props => props.$bgColor};
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between; // 텍스트와 아이콘 사이 공간을 자동으로 조절
  padding: 0 10px; // 좌우 패딩 추가
`;

const Icon = styled(ChevronRight)<{ iconSize?: string }>`
  font-size: ${props => props.iconSize || '16px'};
`;

interface IconButtonProps {
  children: React.ReactNode;
  height?: string;
  width?: string;
  bgColor?: string;
  color?: string;
  fontSize?: string;
  iconSize?: string;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  height = '40px',
  width = '200px',
  bgColor = '#007BFF',
  color = '#FFFFFF',
  fontSize = '16px',
  iconSize,
  onClick,
}) => {
  return (
    <StyledButton
      height={height}
      width={width}
      $bgColor={bgColor}
      color={color}
      fontSize={fontSize}
      onClick={onClick}
    >
      {children}
      <Icon iconSize={iconSize} />
    </StyledButton>
  );
};

export default IconButton;
