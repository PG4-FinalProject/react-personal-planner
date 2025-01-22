import React from 'react';
import styled from 'styled-components';

const StyledBox = styled.div<{
  bgColor?: string;
  padding?: string;
  margin?: string; // margin을 선택적으로 수정
}>`
  padding: ${props => props.padding || '16px'}; // 패딩을 유연하게 설정
  border-radius: 8px;
  background-color: ${props => props.bgColor || '#fff'};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  margin: ${props => props.margin || '16px'}; // 마진을 유연하게게 설정
`;

interface ContentUIBoxProps {
  children: React.ReactNode;
  bgColor?: string;
  padding?: string;
  margin?: string;
}

const ContentUIBox: React.FC<ContentUIBoxProps> = ({
  children,
  bgColor,
  padding,
  margin,
}) => {
  return (
    <StyledBox bgColor={bgColor} padding={padding} margin={margin}>
      {children}
    </StyledBox>
  );
};

export default ContentUIBox;
