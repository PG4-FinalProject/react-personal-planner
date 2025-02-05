import styled from 'styled-components';
import { palette } from '../../styles/palette';

const ProgressBarStyle = styled.div<{
  $width: string;
}>`
  width: ${props => props.$width};
  height: 12px;
  background-color: ${palette.lightgray};
  border-radius: 999px;
`;

const Progress = styled.div<{
  $percent: number;
  $bgColor: string;
}>`
  width: ${props => props.$percent + '%'};
  height: 100%;
  background-color: ${props => props.$bgColor};
  border-radius: 999px;
`;

interface ProgressBarProps {
  percent: number;
  width?: string;
  bgColor?: string;
}

export const ProgressBar = ({
  percent,
  width = '100%',
  bgColor = palette.blue,
}: ProgressBarProps) => {
  if (!percent) percent = percent + 5;
  return (
    <ProgressBarStyle $width={width}>
      <Progress $percent={percent} $bgColor={bgColor} />
    </ProgressBarStyle>
  );
};

export default ProgressBar;
