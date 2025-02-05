import styled from 'styled-components';
import { palette } from '../../styles/palette';

const ProgressBarStyle = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${palette.lightgray};
  border-radius: 999px;
`;

const Progress = styled.div<{
  $percent: number;
}>`
  width: ${props => props.$percent + '%'};
  height: 100%;
  background-color: ${palette.blue};
  border-radius: 999px;
`;

interface ProgressBarProps {
  percent: number;
}

export const ProgressBar = ({ percent }: ProgressBarProps) => {
  return (
    <ProgressBarStyle>
      <Progress $percent={percent} />
    </ProgressBarStyle>
  );
};

export default ProgressBar;
