import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input<{
  height?: string;
  width?: string;
  $bgColor?: string;
  fontSize?: string;

  borderColor?: string; // 테두리 색상
  $borderWidth?: string; // 테두리 두께
  borderStyle?: string; // 테두리 스타일
}>`
  height: ${props => props.height || '40px'};
  width: ${props => props.width || '200px'};
  background-color: ${props => props.$bgColor || '#fff'};
  font-size: ${props => props.fontSize || '16px'};
  color: #333;
  border: ${props =>
    `${props.$borderWidth || '1px'} ${props.borderStyle || 'solid'} ${props.borderColor || '#ccc'}`};
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
  type?: string;
  style?: React.CSSProperties;
  borderColor?: string;
  borderWidth?: string;
  borderStyle?: string;
  name?: string; // name prop 추가
}

const InputText: React.FC<InputTextProps> = ({
  height,
  width,
  bgColor,
  fontSize,
  placeholder,
  value,
  onChange,
  type = 'text',
  style,
  borderColor,
  borderWidth,
  borderStyle,
  name, // name prop 추가
}) => {
  return (
    <StyledInput
      height={height}
      width={width}
      $bgColor={bgColor}
      fontSize={fontSize}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      style={style}
      borderColor={borderColor}
      $borderWidth={borderWidth}
      borderStyle={borderStyle}
      name={name} // name prop 전달
    />
  );
};

export default InputText;
