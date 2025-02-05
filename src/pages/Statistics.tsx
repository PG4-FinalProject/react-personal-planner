import React from 'react';
import MainLayout from '../components/layout/MainLayout'; // MainLayout 경로를 맞춰주세요.
import ContentUIBox from '../components/layout/ContentUIBox';
import { palette } from '../styles/palette';
import Title from '../components/common/Title';
import styled from 'styled-components';

const StatCountBox = styled.div`
  margin: 14px 0px;
  display: flex;
  justify-content: space-between;
`;

const StatCountName = styled.span`
  color: ${palette.gray};
`;

const StatCount = styled.span`
  font-weight: bold;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${palette.blue};
`;

const Statistics: React.FC = () => {
  const TodayProgressPercent = 60;

  return (
    <MainLayout>
      <ContentUIBox bgColor={palette.white}>
        <Title>일간 통계</Title>
        <StatCountBox>
          <StatCountName>완료된 일정</StatCountName>
          <StatCount>3건</StatCount>
        </StatCountBox>
        <StatCountBox>
          <StatCountName>진행중 일정</StatCountName>
          <StatCount>2건</StatCount>
        </StatCountBox>
        <ProgressBar></ProgressBar>
      </ContentUIBox>
    </MainLayout>
  );
};

export default Statistics;
