// weatherAPI.ts
import { WeatherData, ForecastData, WeatherDetail } from '../utils/weather';
const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchCurrentWeather = async (
  lat: number,
  lon: number,
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`,
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Weather data fetch failed: ${errorData.message}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const fetchForecast = async (
  lat: number,
  lon: number,
): Promise<ForecastData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`,
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Forecast data fetch failed: ${errorData.message}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const fetchDetailedWeather = async (
  lat: number,
  lon: number,
): Promise<WeatherDetail> => {
  try {
    const [currentData, forecastData] = await Promise.all([
      fetchCurrentWeather(lat, lon),
      fetchForecast(lat, lon),
    ]);

    const dailyData = processDailyForecast(forecastData.list);

    return {
      current: {
        temp: currentData.main.temp,
        weather: currentData.weather,
      },
      hourly: forecastData.list.slice(0, 8).map(item => ({
        dt: item.dt,
        temp: item.main.temp,
        weather: item.weather,
      })),
      daily: dailyData,
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

function processDailyForecast(forecastList: ForecastData['list']) {
  const dailyMap = new Map<
    string,
    {
      dt: number;
      temp: {
        min: number;
        max: number;
      };
      weather: WeatherData['weather'];
    }
  >();

  forecastList.forEach(forecast => {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        dt: forecast.dt,
        temp: {
          min: forecast.main.temp,
          max: forecast.main.temp,
        },
        weather: forecast.weather,
      });
    } else {
      const existing = dailyMap.get(date)!;
      existing.temp.min = Math.min(existing.temp.min, forecast.main.temp);
      existing.temp.max = Math.max(existing.temp.max, forecast.main.temp);
    }
  });

  return Array.from(dailyMap.values()).slice(0, 7);
}
