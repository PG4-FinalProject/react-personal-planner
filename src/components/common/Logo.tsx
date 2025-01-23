import React from 'react';
import styled from 'styled-components';
import LogoImage from '../../assets/Logo.png'; // 로고 이미지 경로

const StyledLogo = styled.img<{
  height?: string;
}>`
  height: ${props => props.height || '24px'};
  width: auto;
  object-fit: contain;
`;

interface LogoProps {
  height?: string;
}

const Logo: React.FC<LogoProps> = ({ height }) => {
  return <StyledLogo height={height} src={LogoImage} alt="로고" />;
};

export default Logo;
