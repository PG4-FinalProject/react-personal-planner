import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input<{
  height?: string;
  width?: string;
  bgColor?: string;
  fontSize?: string;
}>`
  height: ${props => props.height || '40px'};
  width: ${props => props.width || '200px'};
  background-color: ${props => props.bgColor || '#fff'};
  font-size: ${props => props.fontSize || '16px'};
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  outline: none;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: #007bff;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
  }
`;

interface InputTextProps {
  height?: string;
  width?: string;
  bgColor?: string;
  fontSize?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText: React.FC<InputTextProps> = ({
  height,
  width,
  bgColor,
  fontSize,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <StyledInput
      height={height}
      width={width}
      bgColor={bgColor}
      fontSize={fontSize}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputText;
