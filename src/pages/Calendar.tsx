// Calendar.tsx
import React from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ContentUIBox from '../components/layout/ContentUIBox';
import WeatherWidget from '../components/WeatherWiget';
import TodayPriority from '../components/TodayPriority';
import CalendarWiget from '../components/calendarwiget/CalendarWiget';

const PageContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const MainContent = styled.div`
  margin: 16px 0;
  padding: 0 16px; // 좌우 패딩을 동일하게 적용
  margin: 16px 0;
`;

const SideContent = styled.div`
  width: 534px;
`;

const Calendar: React.FC = () => {
  return (
    <MainLayout>
      <TodayPriority></TodayPriority>
      <SideContent>
        <WeatherWidget />
      </SideContent>
      <div></div>
      <SideContent>
        <CalendarWiget></CalendarWiget>
      </SideContent>
    </MainLayout>
  );
};

export default Calendar;
