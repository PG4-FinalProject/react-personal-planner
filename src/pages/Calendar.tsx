import React, { useState } from 'react';
import styled from 'styled-components';
import MainLayout from '../components/layout/MainLayout'; // MainLayout 경로를 맞춰주세요.
import ContentUIBox from '../components/layout/ContentUIBox';
import { palette } from '../styles/palette';
import Toggle from '../components/common/ToggleBtn';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; /* 제목과 버튼 사이의 공간을 균등하게 분배 */
  align-items: center; /* 수직 정렬 */
  margin: 16px; /* 버튼과 다른 콘텐츠 간의 간격 */
`;

const Calendar: React.FC = () => {
  const [isActive, setIsActive] = useState(false); // 상태 관리

  return (
    <MainLayout>
      <ContentUIBox bgColor={palette.white}>
        <h1>캘린더 페이지</h1>
        <p>여기에 캘린더 관련 콘텐츠를 추가하세요.</p>
        {/* 캘린더 컴포넌트나 기능을 여기에 추가할 수 있습니다. */}

        <ContentUIBox bgColor={palette.lightblue} padding="4px" margin="8px">
          <ButtonContainer>
            <div>
              <h2>옵션 설정</h2>
            </div>
            <Toggle
              isActive={isActive}
              onToggle={() => setIsActive(prev => !prev)}
            />
          </ButtonContainer>
          {/* 캘린더 컴포넌트나 기능을 여기에 추가할 수 있습니다. */}
        </ContentUIBox>
      </ContentUIBox>
      <ContentUIBox bgColor={palette.white}>
        <h1>캘린더 페이지</h1>
        <p>여기에 캘린더 관련 콘텐츠를 추가하세요.</p>
        {/* 캘린더 컴포넌트나 기능을 여기에 추가할 수 있습니다. */}

        <ContentUIBox bgColor={palette.lightblue} padding="4px" margin="8px">
          <ButtonContainer>
            <div>
              <h2>옵션 설정</h2>
            </div>
            <Toggle
              isActive={isActive}
              onToggle={() => setIsActive(prev => !prev)}
            />
          </ButtonContainer>
          {/* 캘린더 컴포넌트나 기능을 여기에 추가할 수 있습니다. */}
        </ContentUIBox>
      </ContentUIBox>
    </MainLayout>
  );
};

export default Calendar;
