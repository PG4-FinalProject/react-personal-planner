import React, { ForwardedRef } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input<{
  height: string;
  width: string;
  $bgColor: string;
  fontSize: string;
  fontWeight?: string;
  $borderColor: string; // 테두리 색상
  $borderWidth: string; // 테두리 두께
  $borderStyle: string; // 테두리 스타일
}>`
  height: ${props => props.height};
  width: ${props => props.width};
  background-color: ${props => props.$bgColor};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  color: #333;
  border: ${props =>
    `${props.$borderWidth} ${props.$borderStyle} ${props.$borderColor}`};
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
  fontWeight?: string;
  type?: string;
  borderColor?: string;
  borderWidth?: string;
  borderStyle?: string;
}

const InputText = React.forwardRef(
  (
    {
      height = '40px',
      width = '200px',
      bgColor = '#fff',
      fontSize = '16px',
      fontWeight,
      type = 'text',
      borderColor = '#ccc',
      borderWidth = '1px',
      borderStyle = 'solid',
      ...props
    }: InputTextProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <StyledInput
        height={height}
        width={width}
        $bgColor={bgColor}
        fontSize={fontSize}
        fontWeight={fontWeight}
        type={type}
        $borderColor={borderColor}
        $borderWidth={borderWidth}
        $borderStyle={borderStyle}
        {...props}
        ref={ref}
      />
    );
  },
);

export default InputText;
