import React from 'react';
import MainLayout from '../components/layout/MainLayout'; // MainLayout 경로를 맞춰주세요.
import SearchPlanBox from '../components/plansPage/SearchPlanBox';
import PlansBox from '../components/plansPage/PlansBox';

const Plans: React.FC = () => {
  return (
    <MainLayout>
      <SearchPlanBox />
      <PlansBox />
    </MainLayout>
  );
};

export default Plans;
