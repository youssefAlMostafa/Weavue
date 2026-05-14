export interface WeatherLocation {
  name: string;
  country: string;
  localtime: string;
  region?: string;
  lat?: number;
  lon?: number;
  tz_id?: string;
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
  wind_dir?: string;
  humidity?: number;
  feelslike_c?: number;
  cloud: number;
  uv?: number;
  pressure_mb?: number;
  vis_km?: number;
  last_updated?: string;
  air_quality?: {
    pm2_5?: number;
    'us-epa-index'?: number;
  };
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
    daily_chance_of_rain: number;
    uv: number;
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
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    chance_of_rain: number;
    chance_of_snow: number;
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
