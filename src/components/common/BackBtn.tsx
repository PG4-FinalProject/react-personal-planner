import React from 'react';
import { ArrowLeft } from 'lucide-react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';

const Button = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: ${palette.gray};

  &:hover {
    background-color: #f5f5f5;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${palette.blue}20;
  }
`;

interface BackBtnProps {
  onClick?: () => void;
  size?: number;
  color?: string;
  ariaLabel?: string;
}

const BackBtn = ({
  onClick,
  size = 24,
  color = palette.gray,
  ariaLabel = '뒤로 가기',
}: BackBtnProps) => {
  return (
    <Button onClick={onClick} aria-label={ariaLabel}>
      <ArrowLeft size={size} color={color} />
    </Button>
  );
};

export default BackBtn;
