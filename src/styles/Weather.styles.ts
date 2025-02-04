import styled from 'styled-components';
import Content from '../components/layout/Content';
import { palette } from '../styles/palette';

export const StyledContent = styled(Content)`
  margin-top: 65px; /* 헤더 높이만큼 마진 */
  padding-bottom: 65px; /* 푸터 높이만큼 패딩 */
  background-color: ${palette.background};
  min-height: calc(100vh - 65px); /* 헤더 높이를 뺀 전체 높이 */
`;

export const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 502px;
  padding: 8px;
  margin: 8px;
  margin-top: 65px;
  gap: 16px;
  min-height: calc(100vh - 65px); /* 헤더 높이를 뺀 전체 높이 */
`;

export const Section = styled.section`
  width: 100%;
`;

export const SectionTitle = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
`;

export const WeatherInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const WeatherTemp = styled.div`
  h2 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  p {
    color: #666;
    margin: 4px 0;
  }
`;

export const HourlyScroll = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const HourlyList = styled.div`
  display: inline-flex;
  padding: 4px 0;
  gap: 24px;
`;

export const HourlyItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 52px;

  time {
    font-size: 13px;
    color: #666;
    margin-bottom: 8px;
  }

  img {
    width: 36px;
    height: 36px;
    margin: 4px 0;
  }

  span {
    font-size: 15px;
    font-weight: 600;
  }
`;

export const DailyList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DailyItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #f2f2f2;

  &:last-child {
    border-bottom: none;
  }

  .day {
    width: 48px;
    font-size: 15px;
    color: #333;
  }

  .icon {
    width: 36px;
    height: 36px;
  }

  .temp {
    display: flex;
    gap: 8px;
    font-size: 15px;

    .max {
      font-weight: 600;
      color: #333;
    }

    .min {
      color: #666;
    }
  }
`;
