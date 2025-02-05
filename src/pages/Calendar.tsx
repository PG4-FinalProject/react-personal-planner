// Calendar.tsx
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import WeatherWidget from '../components/WeatherWiget';
import TodayPriority from '../components/TodayPriority';
import CalendarWiget from '../components/calendarwiget/CalendarWiget';

const Calendar: React.FC = () => {
  return (
    <MainLayout>
      <TodayPriority></TodayPriority>
      <WeatherWidget />
      <CalendarWiget></CalendarWiget>
    </MainLayout>
  );
};

export default Calendar;
