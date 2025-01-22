import React, { useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette'; // palette 경로를 맞춰주세요

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 47.7px;
  height: 23.33px;
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc; // 비활성화 상태 색상
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: '';
    height: 15px;
    width: 15px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${ToggleSlider} {
    background-color: ${palette.blue}; // 활성화 상태 색상
  }

  &:focus + ${ToggleSlider} {
    box-shadow: 0 0 1px #2196f3;
  }

  &:checked + ${ToggleSlider}:before {
    transform: translateX(26px);
  }
`;

interface ToggleProps {
  isActive: boolean;
  onToggle: (active: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ isActive, onToggle }) => {
  return (
    <ToggleSwitch>
      <CheckBox
        type="checkbox"
        checked={isActive}
        onChange={() => onToggle(!isActive)}
      />
      <ToggleSlider />
    </ToggleSwitch>
  );
};

export default Toggle;
