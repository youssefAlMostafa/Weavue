<script setup lang="ts">
import { onMounted, watchEffect } from 'vue';
import { useWeather } from '@/composables/useWeather';
import { weatherGif } from '@/stores/weatherGif';
import type { WeatherData } from '@/types/weather';

const props = defineProps({
  cityName: {
    type: String,
    required: false
  },
  lat: {
    type: Number,
    required: false
  },
  long: {
    type: Number,
    required: false
  }
});

const {
  weatherData,
  isLoading,
  error,
  fetchWeatherByCoords,
  fetchWeatherByCity,
  temperature,
  location: locationName,
  country,
  dateTime
} = useWeather();

watchEffect(() => {
  if (props.lat && props.long) {
    fetchWeatherByCoords(props.lat, props.long);
  }
  if (props.cityName) {
    fetchWeatherByCity(props.cityName);
  }
});

const getWeatherGif = (weatherData: WeatherData) => {
 if (weatherData.current.is_day === 1) {
   switch (weatherData.current.condition?.code) {
     case 1003:
     case 1006:
     case 1009:
     case 1030:
       return weatherGif.day.cloudy;
     case 1063:
     case 1183:
     case 1189:
     case 1195:
       return weatherGif.day.rainy;
     case 1066:
     case 1114:
     case 1213:
     case 1219:
       return weatherGif.day.snowy;
     default:
       return weatherGif.day.clear;
   }
 } else {
   switch (weatherData.current.condition?.code) {
     case 1003:
     case 1006:
     case 1009:
     case 1030:
       return weatherGif.night.cloudy;
     case 1063:
     case 1183:
     case 1189:
     case 1195:
       return weatherGif.night.rainy;
     case 1066:
     case 1114:
     case 1213:
     case 1219:
       return weatherGif.night.snowy;
     default:
       return weatherGif.night.clear;
   }
 }
};

onMounted(() => {
  //console.log('Latitude:', location.lat, 'Longitude:', location.long);
  if (props.lat && props.long) {
    fetchWeatherByCoords(props.lat, props.long);
  }
});
</script>

<template>
  <div class="w-[16%] text-black rounded-[16px] bg-gradient-to-b from-transparent to-white py-4 mt-2 mx-auto
              max-[1100px]:w-[24%] max-lg:w-[33%] max-md:w-full">
    <div class="p-4" v-if="isLoading || error || weatherData">
      <div v-if="isLoading" class="italic text-gray-600">
        Loading weather data...
      </div>

      <div v-else-if="error" class="text-red-600 p-2 rounded bg-red-100/10">
        {{ error }}
      </div>

      <div v-else-if="weatherData" class="flex flex-col gap-2">
        <iframe class="rounded-[12px]" :src="getWeatherGif(weatherData)"></iframe>
        <h1 class="text-2xl font-bold">{{ temperature }}°C</h1>
        <p class="text-lg">{{ dateTime }}</p>
        <p>{{ locationName }}, {{ country }}</p>
      </div>
    </div>
  </div>
</template>
