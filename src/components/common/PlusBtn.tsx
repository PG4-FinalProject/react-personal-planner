import React from 'react';
import styled from 'styled-components';
import { Plus } from 'lucide-react';
import { palette } from '../../styles/palette';

interface PlusButtonProps {
  onClick: () => void;
}

const StyledButton = styled.button`
  background-color: ${palette.blue};
  color: ${palette.white};
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const PlusButton: React.FC<PlusButtonProps> = ({ onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      <Plus color={palette.white} size={24} />
    </StyledButton>
  );
};
