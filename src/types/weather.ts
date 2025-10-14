export interface WeatherLocation {
  name: string;
  country: string;
  localtime: string;
  region?: string;
}

export interface WeatherCurrent {
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition?: {
    text: string;
    icon: string;
    code: number;
  };
  wind_kph?: number;
  humidity?: number;
  feelslike_c?: number;
  cloud: number;
}

export interface WeatherData {
  location: WeatherLocation;
  current: WeatherCurrent;
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    avghumidity: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
  hour: Array<{
    time: string;
    temp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  }>;
}

export interface ForecastData {
  location: WeatherLocation;
  current: WeatherCurrent;
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface WeatherError {
  message: string;
  code?: number;
}

export interface WeatherState {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}