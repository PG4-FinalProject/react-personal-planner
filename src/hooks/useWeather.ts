import { useState, useEffect } from 'react';
import { fetchCurrentWeather, fetchDetailedWeather } from '../apis/weather.api';
import type { ProcessedWeatherData, WeatherDetail } from '../types/weather';

interface UseWeatherProps {
  isWidget?: boolean;
  coords?: {
    lat: number;
    lon: number;
  } | null;
}

type WeatherHookReturn<T> = {
  weatherData: T | null;
  coords: { lat: number; lon: number } | null;
  loading: boolean;
  error: string | null;
  formatHour: (timestamp: number) => string;
  formatDay: (timestamp: number) => string;
};

export function useWeather(
  props: UseWeatherProps & { isWidget: true },
): WeatherHookReturn<ProcessedWeatherData>;
export function useWeather(
  props: UseWeatherProps & { isWidget: false },
): WeatherHookReturn<WeatherDetail>;
export function useWeather(props: UseWeatherProps = { isWidget: false }) {
  const [weatherData, setWeatherData] = useState<
    ProcessedWeatherData | WeatherDetail | null
  >(null);
  const [currentCoords, setCurrentCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
      }
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        setLoading(true);
        let locationCoords = props.coords;

        if (!locationCoords) {
          const position = await getCurrentPosition();
          const { latitude: lat, longitude: lon } = position.coords;
          locationCoords = { lat, lon };
          setCurrentCoords(locationCoords);
        }

        if (!locationCoords) {
          throw new Error('위치 정보를 가져올 수 없습니다.');
        }

        if (props.isWidget) {
          const data = await fetchCurrentWeather(
            locationCoords.lat,
            locationCoords.lon,
          );
          setWeatherData({
            location: data.name,
            temperature: Math.round(data.main.temp),
            humidity: data.main.humidity,
            weatherIcon: data.weather[0].icon,
            description: data.weather[0].description,
            date: new Date().toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            day: new Date().toLocaleDateString('ko-KR', {
              weekday: 'long',
            }),
            precipitation: data.pop ? Math.round(data.pop * 100) : 0,
          } as ProcessedWeatherData);
        } else {
          const data = await fetchDetailedWeather(
            locationCoords.lat,
            locationCoords.lon,
          );
          setWeatherData(data as WeatherDetail);
        }

        setError(null);
      } catch (err) {
        setError('날씨 정보를 불러오는데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, [props.coords, props.isWidget]);

  const formatHour = (timestamp: number) => {
    return new Date(timestamp * 1000).getHours() + '시';
  };

  const formatDay = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
  };

  return {
    weatherData,
    coords: currentCoords,
    loading,
    error,
    formatHour,
    formatDay,
  };
}
