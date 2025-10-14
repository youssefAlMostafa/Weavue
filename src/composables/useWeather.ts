import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import { getCurrentWeatherByCoords, getCurrentWeatherByCity } from '@/services/weatherService';
import type { WeatherData } from '@/types/weather';

export function useWeather() {
  const weatherData: Ref<WeatherData | null> = ref(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const formatDateTime = (dateTimeString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString('en-US', options);
  };

  const fetchWeatherByCoords = async (latitude: number, longitude: number): Promise<void> => {
    if (!latitude || !longitude) {
      error.value = "Location coordinates unavailable";
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      weatherData.value = await getCurrentWeatherByCoords(latitude, longitude);
    } catch (err) {
      error.value = "Failed to fetch weather data. Please try again later.";
      console.error('Error fetching weather data:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchWeatherByCity = async (city: string): Promise<void> => {
    if (!city || !city.trim()) {
      error.value = "City name is required";
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      weatherData.value = await getCurrentWeatherByCity(city.trim());
    } catch (err: any) {
      error.value = "Failed to fetch weather data. Please try again later.";
      console.error('Error fetching weather data for city:', city, err);
      console.error('Error details:', err.response?.data || err.message);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    weatherData,
    isLoading,
    error,

    fetchWeatherByCoords,
    fetchWeatherByCity,
    formatDateTime,

    temperature: computed(() => weatherData.value?.current.temp_c),
    location: computed(() => weatherData.value?.location.name),
    country: computed(() => weatherData.value?.location.country),
    dateTime: computed(() => weatherData.value?.location.localtime
      ? formatDateTime(weatherData.value.location.localtime)
      : null
    ),
  };
}
