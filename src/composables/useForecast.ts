import { ref } from 'vue';
import type { Ref } from 'vue';
import { getForecastByCoords, getForecastByCity } from '@/services/weatherService';
import type { ForecastData } from '@/types/weather';

export function useForecast() {
  const forecastData: Ref<ForecastData | null> = ref(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchForecastByCoords = async (latitude: number, longitude: number, days: number = 7): Promise<void> => {
    if (!latitude || !longitude) {
      error.value = "Location coordinates unavailable";
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      forecastData.value = await getForecastByCoords(latitude, longitude, days);
    } catch (err) {
      error.value = "Failed to fetch forecast data. Please try again later.";
      console.error('Error fetching forecast data:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchForecastByCity = async (city: string, days: number = 7): Promise<void> => {
    if (!city) {
      error.value = "City name is required";
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      forecastData.value = await getForecastByCity(city, days);
    } catch (err) {
      error.value = "Failed to fetch forecast data. Please try again later.";
      console.error('Error fetching forecast data:', err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    forecastData,
    isLoading,
    error,
    fetchForecastByCoords,
    fetchForecastByCity,
  };
}
