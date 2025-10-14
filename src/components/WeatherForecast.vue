<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { useForecast } from '@/composables/useForecast'
import { useLocationStore } from '@/stores/locationStore'
import { useCityStore } from '@/stores/cityStore'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const locationStore = useLocationStore()
const cityStore = useCityStore()
const { forecastData, isLoading, error, fetchForecastByCoords, fetchForecastByCity } = useForecast()

watchEffect(() => {
  if (locationStore.lat !== 0 && locationStore.long !== 0) {
    fetchForecastByCoords(locationStore.lat, locationStore.long, 7)
  } else if (cityStore.list.length > 0) {
    fetchForecastByCity(cityStore.list[cityStore.list.length - 1], 7)
  } else {
    forecastData.value = null
  }
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

const chartData = computed(() => {
  if (!forecastData.value) return null

  const labels = forecastData.value.forecast.forecastday.map(day => formatDate(day.date))
  const maxTemps = forecastData.value.forecast.forecastday.map(day => day.day.maxtemp_c)
  const minTemps = forecastData.value.forecast.forecastday.map(day => day.day.mintemp_c)

  return {
    labels,
    datasets: [
      {
        label: 'Max Temperature (°C)',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 2,
        data: maxTemps,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Min Temperature (°C)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        data: minTemps,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: {
        color: '#333',
        font: {
          size: 14,
          family: 'var(--font-sans)'
        }
      }
    },
    title: {
      display: true,
      text: '3-Day Temperature Forecast',
      color: '#333',
      font: {
        size: 18,
        weight: 'bold' as const,
        family: 'var(--font-sans)'
      }
    }
  },
  scales: {
    y: {
      beginAtZero: false,
      ticks: {
        callback: (value: number | string) => `${value}°C`,
        color: '#666'
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    },
    x: {
      ticks: {
        color: '#666'
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    }
  }
}))
</script>

<template>
  <section class="forecast-section max-w-[1800px] mx-auto px-6 py-8">
    <div v-if="isLoading" class="loading-container text-center py-12">
      <p class="text-lg text-gray-600">Loading forecast data...</p>
    </div>

    <div v-else-if="error" class="error-container text-center py-12">
      <p class="text-lg text-red-600">{{ error }}</p>
    </div>

    <div v-else-if="forecastData" class="forecast-content">
      <div class="location-header text-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">
          {{ forecastData.location.name }}, {{ forecastData.location.country }}
        </h2>
        <p class="text-gray-600">Extended Weather Forecast</p>
      </div>

      <div class="chart-container bg-white rounded-2xl shadow-lg p-6 mb-8" style="height: 400px;">
        <Line v-if="chartData" :data="chartData" :options="chartOptions" />
      </div>

      <div class="forecast-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div
          v-for="(day, index) in forecastData.forecast.forecastday"
          :key="index"
          class="forecast-card bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
        >
          <p class="text-sm font-semibold text-gray-700 mb-2">{{ formatDate(day.date) }}</p>
          <img
            :src="'https:' + day.day.condition.icon"
            :alt="day.day.condition.text"
            class="w-16 h-16 mx-auto"
          />
          <p class="text-xs text-gray-600 text-center mb-2">{{ day.day.condition.text }}</p>
          <div class="temps text-center">
            <p class="text-lg font-bold text-red-500">{{ Math.round(day.day.maxtemp_c) }}°</p>
            <p class="text-sm text-blue-500">{{ Math.round(day.day.mintemp_c) }}°</p>
          </div>
          <div class="extra-info text-xs text-gray-500 mt-2 text-center">
            <p>💧 {{ day.day.avghumidity }}%</p>
            <p>🌧️ {{ day.day.totalprecip_mm }}mm</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-state text-center py-12">
      <p class="text-lg text-gray-600">Add a location to see the forecast</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.forecast-section {
  margin-top: 2rem;

  .chart-container {
    @media (max-width: 767px) {
      padding: 1rem;
    }
  }

  .forecast-grid {
    @media (max-width: 767px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .forecast-card {
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
    }
  }
}
</style>
