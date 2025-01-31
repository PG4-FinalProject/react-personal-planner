// Calendar.tsx
import React from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ContentUIBox from '../components/layout/ContentUIBox';
import WeatherWidget from '../components/WeatherWiget';

const PageContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const MainContent = styled.div`
  flex: 1;
`;

const SideContent = styled.div`
  width: 542px; // 542px는 너무 넓어 보여서 수정
`;

const Calendar: React.FC = () => {
  return (
    <MainLayout>
      <PageContainer>
        <MainContent>{/* 캘린더 메인 콘텐츠 */}</MainContent>
        <SideContent>
          <WeatherWidget />
        </SideContent>
      </PageContainer>
    </MainLayout>
  );
};

export default Calendar;
