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

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  height?: string;
  width?: string;
  bgColor?: string;
  fontSize?: string;
  type?: string;
  borderColor?: string;
  borderWidth?: string;
  borderStyle?: string;
}

const InputText = ({
  height,
  width,
  bgColor,
  fontSize,
  type = 'text',
  borderColor,
  borderWidth,
  borderStyle,
  ...props
}: InputTextProps) => {
  return (
    <StyledInput
      height={height}
      width={width}
      $bgColor={bgColor}
      fontSize={fontSize}
      type={type}
      borderColor={borderColor}
      $borderWidth={borderWidth}
      borderStyle={borderStyle}
      {...props}
    />
  );
};

export default InputText;
