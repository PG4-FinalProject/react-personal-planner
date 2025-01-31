import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ContentUIBox from './layout/ContentUIBox';
import LucideIcon from './common/LucideIcon';
import { useWeather } from '../hooks/useWeather';

const StyledWeatherContainer = styled(ContentUIBox)`
  width: 600px;
  cursor: pointer;
  transition: transform 0.2s;
  border-radius: 8px;
  &:hover {
    transform: translateY(-2px);
  }
`;

const LocationText = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 4px;
`;

const DateText = styled.p`
  font-size: 0.875rem;
  color: #666;
`;

const WeatherInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

const WeatherTemp = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const HumidityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #4a90e2;
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
      state: { coords }, // 위치 정보만 전달
    });
  };

  return (
    <div onClick={handleClick}>
      <StyledWeatherContainer>
        <div>
          <LocationText>{weatherData.location}</LocationText>
          <DateText>
            {weatherData.date} {weatherData.day}
          </DateText>
        </div>
        <WeatherInfo>
          <WeatherTemp>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weatherIcon}@2x.png`}
              alt={weatherData.description}
              width="40"
              height="40"
            />
            <span>{weatherData.temperature}°</span>
          </WeatherTemp>
          <HumidityWrapper>
            <LucideIcon name="Droplets" size={20} />
            <span>{weatherData.humidity}%</span>
          </HumidityWrapper>
        </WeatherInfo>
      </StyledWeatherContainer>
    </div>
  );
};

export default WeatherWidget;
