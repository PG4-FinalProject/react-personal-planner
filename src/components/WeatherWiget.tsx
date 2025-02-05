import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ContentUIBox from './layout/ContentUIBox';
import LucideIcon from './common/LucideIcon';
import { useWeather } from '../hooks/useWeather';

const WeatherInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

const StyledWeatherContainer = styled(ContentUIBox)`
  width: 100%;
  max-width: 100%;
  min-width: 280px; // 최소 너비 설정
  cursor: pointer;

  @media (max-width: 1200px) {
    padding: 12px; // 패딩 조정
  }

  @media (max-width: 768px) {
    padding: 8px; // 더 작은 화면에서 패딩 추가 축소
  }

  // 내부 요소들의 반응형 스타일도 조정
  ${WeatherInfo} {
    @media (max-width: 480px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }
`;

const LocationText = styled.h2`
  font-size: 0.875rem;
  color: #666;
`;

const WeatherTemp = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const WeatherIconGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const WeatherIconAndTemp = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Temperature = styled.span`
  font-size: 1.55rem;
  font-weight: 600;
`;

const PrecipitationText = styled.div`
  font-size: 0.85rem;
  color: #4a90e2;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 18px;
  margin-top: -32px;
`;

const DateText = styled.p`
  font-size: 0.875rem;
  color: #666;
`;

const DayText = styled.p`
  font-size: 1.355rem;
  font-weight: 600;
  color: #333;
`;

const WeatherWidget: React.FC = () => {
  const navigate = useNavigate();
  const { weatherData, coords, loading, error } = useWeather({
    isWidget: true,
  });

  if (loading)
    return <StyledWeatherContainer>로딩중...</StyledWeatherContainer>;
  if (error) return <StyledWeatherContainer>{error}</StyledWeatherContainer>;
  if (!weatherData) return null;

  const handleClick = () => {
    navigate('/weather', {
      state: { coords },
    });
  };

  return (
    <div onClick={handleClick}>
      <StyledWeatherContainer>
        <div>
          <LocationText>{weatherData.location}</LocationText>
        </div>
        <WeatherInfo>
          <WeatherTemp>
            <WeatherIconGroup>
              <WeatherIconAndTemp>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weatherIcon}@2x.png`}
                  alt={weatherData.description}
                  width="40"
                  height="40"
                />
                <Temperature>{weatherData.temperature}°</Temperature>
              </WeatherIconAndTemp>
              <PrecipitationText>
                <LucideIcon name="Droplet" size={14} />
                <span>강수확률</span>
                <span>{weatherData.precipitation}%</span>
              </PrecipitationText>
            </WeatherIconGroup>
          </WeatherTemp>

          <DateWrapper>
            <DateText>{weatherData.date}</DateText>
            <DayText>{weatherData.day}</DayText>
          </DateWrapper>
        </WeatherInfo>
      </StyledWeatherContainer>
    </div>
  );
};

export default WeatherWidget;
