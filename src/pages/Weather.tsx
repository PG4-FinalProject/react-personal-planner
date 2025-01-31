import React from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/layout/Header';
import Content from '../components/layout/Content';
import Footer from '../components/layout/Footer';
import ContentUIBox from '../components/layout/ContentUIBox';
import Title from '../components/common/Title';
import LucideIcon from '../components/common/LucideIcon';
import { useWeather } from '../hooks/useWeather';
import { palette } from '../styles/palette';
import type { WeatherDetail } from '../types/weather';

const SectionTitle = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
`;

const HourlyScroll = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const HourlyList = styled.div`
  display: inline-flex;
  padding: 4px 0;
  gap: 24px;
`;

const HourlyItem = styled.div`
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

const DailyList = styled.div`
  display: flex;
  flex-direction: column;
`;

const DailyItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
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

const Section = styled.section`
  margin-bottom: 24px;
  padding: 0 16px;
  width: 100%;
  box-sizing: border-box;
`;

const DetailBox = styled(ContentUIBox)`
  padding: 20px;
  background: white;
  border-radius: 16px;
  width: 100%;
  box-sizing: border-box;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const WeatherInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WeatherTemp = styled.div`
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

const WeatherDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const coords = location.state?.coords;

  const { weatherData, loading, error, formatHour, formatDay } = useWeather({
    coords,
    isWidget: false,
  });

  if (loading)
    return (
      <>
        <Header color={palette.white}>
          <HeaderContent>
            <BackButton onClick={() => navigate(-1)}>
              <LucideIcon name="ArrowLeft" size={24} />
            </BackButton>
            <Title>날씨</Title>
          </HeaderContent>
        </Header>
        <Content color={palette.background}>
          <DetailBox>로딩중...</DetailBox>
        </Content>
        <Footer color={palette.white} onPageChange={() => {}} />
      </>
    );

  if (error || !weatherData) return <Navigate to="/" />;

  const currentWeather = weatherData as WeatherDetail;

  return (
    <>
      <Header color={palette.white}>
        <HeaderContent>
          <BackButton onClick={() => navigate(-1)}>
            <LucideIcon name="ArrowLeft" size={24} />
          </BackButton>
          <Title>날씨</Title>
        </HeaderContent>
      </Header>

      <Content color={palette.background}>
        <Section>
          <DetailBox>
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
          </DetailBox>
        </Section>

        <Section>
          <SectionTitle>시간별 날씨</SectionTitle>
          <DetailBox>
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
          </DetailBox>
        </Section>

        <Section>
          <SectionTitle>7일간의 날씨</SectionTitle>
          <DetailBox>
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
          </DetailBox>
        </Section>
      </Content>

      <Footer color={palette.white} onPageChange={() => {}} />
    </>
  );
};

export default WeatherDetail;
