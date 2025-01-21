import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PlusButton } from '../common/PlusBtn';
import { palette } from '../../styles/palette';

interface ContentProps {
  children: React.ReactNode;
}

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 534px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 56px;
  padding-bottom: 56px;
  min-height: 100vh;
  background-color: ${palette.background};
  position: relative; // PlusButton의 기준점이 되도록 설정
`;

// PlusButton의 위치를 잡아주는 컨테이너
const ButtonWrapper = styled.div`
  position: absolute; // ContentWrapper를 기준으로 위치 지정
  bottom: 80px;
  right: 20px;
  z-index: 90;
`;

const Content: React.FC<ContentProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/plans/create');
  };

  return (
    <ContentWrapper>
      {children}
      <ButtonWrapper>
        <PlusButton onClick={handleAddClick} />
      </ButtonWrapper>
    </ContentWrapper>
  );
};

export default Content;
