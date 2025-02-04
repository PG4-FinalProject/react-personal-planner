// Weather.tsx
import React from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import ContentUIBox from '../components/layout/ContentUIBox';
import LucideIcon from '../components/common/LucideIcon';
import { useWeather } from '../hooks/useWeather';
import { palette } from '../styles/palette';
import type { WeatherDetail } from '../types/weather';
import {
  StyledContent,
  WeatherContainer,
  Section,
  SectionTitle,
  WeatherInfo,
  WeatherTemp,
  HourlyScroll,
  HourlyList,
  HourlyItem,
  DailyList,
  DailyItem,
} from '../styles/Weather.styles';

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const WeatherDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const coords = location.state?.coords;

  const { weatherData, loading, error, formatHour, formatDay } = useWeather({
    coords,
    isWidget: false,
  });

  const headerContent = (
    <HeaderContent>
      <BackButton onClick={() => navigate(-1)}>
        <LucideIcon name="ArrowLeft" size={24} />
      </BackButton>
      <span>날씨</span>
    </HeaderContent>
  );

  const handlePageChange = (path: string) => {
    navigate(path);
  };

  if (loading) {
    return (
      <Layout headerContent={headerContent} onPageChange={handlePageChange}>
        <StyledContent>
          <WeatherContainer>
            <ContentUIBox>로딩중...</ContentUIBox>
          </WeatherContainer>
        </StyledContent>
      </Layout>
    );
  }

  if (error || !weatherData) return <Navigate to="/" />;

  const currentWeather = weatherData as WeatherDetail;

  return (
    <Layout headerContent={headerContent} onPageChange={handlePageChange}>
      <StyledContent>
        <WeatherContainer>
          <Section>
            <SectionTitle>현재위치</SectionTitle>
            <ContentUIBox>
              <WeatherInfo>
                <WeatherTemp>
                  <h2>{Math.round(currentWeather.current.temp)}°</h2>
                  <p>{currentWeather.current.weather[0].description}</p>
                  <p>
                    최고 {Math.round(currentWeather.daily[0].temp.max)}° 최저{' '}
                    {Math.round(currentWeather.daily[0].temp.min)}°
                  </p>
                </WeatherTemp>
                <img
                  src={`http://openweathermap.org/img/wn/${currentWeather.current.weather[0].icon}@2x.png`}
                  alt="현재 날씨"
                  width="80"
                  height="80"
                />
              </WeatherInfo>
            </ContentUIBox>
          </Section>

          <Section>
            <SectionTitle>시간별 날씨</SectionTitle>
            <ContentUIBox>
              <HourlyScroll>
                <HourlyList>
                  {currentWeather.hourly.slice(0, 24).map(hour => (
                    <HourlyItem key={hour.dt}>
                      <time>{formatHour(hour.dt)}</time>
                      <img
                        src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                        alt={hour.weather[0].description}
                      />
                      <span>{Math.round(hour.temp)}°</span>
                    </HourlyItem>
                  ))}
                </HourlyList>
              </HourlyScroll>
            </ContentUIBox>
          </Section>

          <Section>
            <SectionTitle>6일간의 날씨</SectionTitle>
            <ContentUIBox>
              <DailyList>
                {currentWeather.daily.slice(0, 7).map(day => (
                  <DailyItem key={day.dt}>
                    <span className="day">{formatDay(day.dt)}</span>
                    <img
                      className="icon"
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                      alt={day.weather[0].description}
                    />
                    <div className="temp">
                      <span className="max">{Math.round(day.temp.max)}°</span>
                      <span className="min">{Math.round(day.temp.min)}°</span>
                    </div>
                  </DailyItem>
                ))}
              </DailyList>
            </ContentUIBox>
          </Section>
        </WeatherContainer>
      </StyledContent>
    </Layout>
  );
};

export default WeatherDetail;
