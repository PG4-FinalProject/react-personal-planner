import React from 'react';
import MainLayout from '../components/layout/MainLayout'; // MainLayout 경로를 맞춰주세요.
import ContentUIBox from '../components/layout/ContentUIBox';
import { palette } from '../styles/palette';
import Title from '../components/common/Title';
import styled from 'styled-components';
import ProgressBar from '../components/common/ProgressBar';
import { useStatistic } from '../hooks/useStatistic';

const PlanCountBox = styled.div`
  margin: 14px 0px;
  display: flex;
  justify-content: space-between;
`;

const PlanStateName = styled.span`
  color: ${palette.gray};
`;

const PlanCount = styled.span`
  font-weight: bold;
`;

const Statistics: React.FC = () => {
  const { weekPlanStats } = useStatistic();
  const { dailyStats, weeklyStats, weeklyCategoryStatsArr } = weekPlanStats;
  const TodayProgressPercent = Math.floor(
    (dailyStats.completedCount / dailyStats.totalCount) * 100,
  );
  const WeekProgressPercent = Math.floor(
    (weeklyStats.completedCount / weeklyStats.totalCount) * 100,
  );

  return (
    <MainLayout>
      <ContentUIBox bgColor={palette.white}>
        <Title>일간 통계</Title>
        <PlanCountBox>
          <PlanStateName>완료된 일정</PlanStateName>
          <PlanCount>{dailyStats.completedCount}건</PlanCount>
        </PlanCountBox>
        <PlanCountBox>
          <PlanStateName>남은 일정</PlanStateName>
          <PlanCount>{dailyStats.toDoCount}건</PlanCount>
        </PlanCountBox>
        <ProgressBar percent={TodayProgressPercent} />
      </ContentUIBox>
      <ContentUIBox bgColor={palette.white}>
        <Title>주간 통계</Title>
        <PlanCountBox>
          <PlanStateName>완료된 일정</PlanStateName>
          <PlanCount>{weeklyStats.completedCount}건</PlanCount>
        </PlanCountBox>
        <PlanCountBox>
          <PlanStateName>남은 일정</PlanStateName>
          <PlanCount>{weeklyStats.toDoCount}건</PlanCount>
        </PlanCountBox>
        <ProgressBar percent={WeekProgressPercent} />
      </ContentUIBox>
      <ContentUIBox>
        <Title>카테고리별 통계</Title>
      </ContentUIBox>
    </MainLayout>
  );
};

export default Statistics;
