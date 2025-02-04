import React from 'react';
import styled from 'styled-components';
import { ClockAlert } from 'lucide-react';
import { palette } from '../styles/palette';
import ContentUIBox from './layout/ContentUIBox';
import { useTodayPriority } from '../hooks/useTodayPriority';

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${palette.blue};
  margin-bottom: 16px;
`;

const PriorityItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${palette.lightblue};
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const TaskInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TaskName = styled.span`
  font-size: 16px;
  color: ${palette.black};
`;

const TimeInfo = styled.div`
  font-size: 16px;
  color: ${palette.red};
`;

const LoadingPlaceholder = styled.div`
  text-align: center;
  color: ${palette.gray};
  padding: 16px;
`;

const TodayPriority: React.FC = () => {
  const { tasks, isLoading, error } = useTodayPriority();

  if (isLoading) {
    return (
      <ContentUIBox bgColor={palette.lightblue}>
        <LoadingPlaceholder>일정을 불러오는 중...</LoadingPlaceholder>
      </ContentUIBox>
    );
  }

  if (error) {
    return (
      <ContentUIBox bgColor={palette.lightblue}>
        <LoadingPlaceholder>{error}</LoadingPlaceholder>
      </ContentUIBox>
    );
  }

  if (tasks.length === 0) {
    return null;
  }

  return (
    <ContentUIBox bgColor={palette.lightblue}>
      <Title>오늘의 우선순위</Title>
      {tasks.map((task, index) => (
        <PriorityItem key={index}>
          <TaskInfo>
            <ClockAlert size={20} color={palette.red} />
            <TaskName>{task.name}</TaskName>
          </TaskInfo>
          <TimeInfo>{task.duration}</TimeInfo>
        </PriorityItem>
      ))}
    </ContentUIBox>
  );
};

export default TodayPriority;
