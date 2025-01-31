import React from 'react';
import styled from 'styled-components';
import { ClockAlert } from 'lucide-react';
import { palette } from '../styles/palette';
import ContentUIBox from './layout/ContentUIBox';

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
`;

const TaskInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TaskName = styled.span`
  font-size: 24px;
  color: ${palette.black};
`;

const TimeInfo = styled.div`
  font-size: 24px;
  color: ${palette.red};
`;

interface TodayPriorityProps {
  tasks?: Array<{
    name: string;
    duration: string;
  }>;
}

const TodayPriority: React.FC<TodayPriorityProps> = ({
  tasks = [{ name: '팀 미팅', duration: '2시간 남음' }],
}) => {
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
