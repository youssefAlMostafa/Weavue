import axios from 'axios';
import type { WeatherData, ForecastData } from '@/types/weather';
import { env } from '@/config/env';

const weatherApi = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
});

const API_KEY = env.WEATHER_API_KEY;

export interface CitySearchResult {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export const getCurrentWeatherByCoords = async (
  latitude: number,
  longitude: number
): Promise<WeatherData> => {
  const response = await weatherApi.get<WeatherData>('/current.json', {
    params: {
      key: API_KEY,
      q: `${latitude},${longitude}`,
      aqi: 'yes',
      days: 2
    },
  });
  return response.data;
};

export const getCurrentWeatherByCity = async (city: string): Promise<WeatherData> => {
  const response = await weatherApi.get<WeatherData>('/current.json', {
    params: {
      key: API_KEY,
      q: city,
      aqi: 'yes',
    },
  });

  return response.data;
};

export const getForecastByCoords = async (
  latitude: number,
  longitude: number,
  days: number = 7
): Promise<ForecastData> => {
  const response = await weatherApi.get<ForecastData>('/forecast.json', {
    params: {
      key: API_KEY,
      q: `${latitude},${longitude}`,
      days: days,
      aqi: 'yes',
    },
  });
  return response.data;
};

export const getForecastByCity = async (
  city: string,
  days: number = 7
): Promise<ForecastData> => {
  const response = await weatherApi.get<ForecastData>('/forecast.json', {
    params: {
      key: API_KEY,
      q: city,
      days: days,
      aqi: 'yes',
    },
  });
  return response.data;
};

export const searchCities = async (query: string): Promise<CitySearchResult[]> => {
  if (!query || query.length < 2) {
    return [];
  }

  const response = await weatherApi.get<CitySearchResult[]>('/search.json', {
    params: {
      key: API_KEY,
      q: query,
    },
  });
  return response.data;
};
