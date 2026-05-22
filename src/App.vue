<script setup lang="ts">
import { ref, watchEffect, watch, onMounted } from 'vue'
import { useForecast } from '@/composables/useForecast'
import { useLocationStore } from '@/stores/locationStore'
import { useCityStore } from '@/stores/cityStore'

import WeatherIconSprite from './components/ui/WeatherIconSprite.vue'
import SearchRow from './components/app/SearchRow.vue'
import HeroSection from './components/sections/HeroSection.vue'
import HourlyRow from './components/sections/HourlyRow.vue'
import WeekForecast from './components/sections/WeekForecast.vue'
import CitiesGrid from './components/app/CitiesGrid.vue'
import DetailCards from './components/sections/DetailCards.vue'
import Footer from './components/core/Footer.vue'
import NavBar from './components/core/NavBar.vue'

const locationStore = useLocationStore()
const cityStore = useCityStore()
const { forecastData, isLoading, fetchForecastByCoords, fetchForecastByCity } = useForecast()

const activeCityName = ref<string | null>(
  locationStore.lat === 0 && locationStore.long === 0 && cityStore.list.length > 0
    ? cityStore.list[0]
    : null
)

watchEffect(() => {
  if (activeCityName.value) {
    fetchForecastByCity(activeCityName.value, 7)
  } else if (locationStore.lat !== 0 && locationStore.long !== 0) {
    fetchForecastByCoords(locationStore.lat, locationStore.long, 7)
  } else if (cityStore.list.length > 0) {
    activeCityName.value = cityStore.list[0]
  }
})

watch(() => locationStore.lat, (lat) => {
  if (lat !== 0) activeCityName.value = null
})

const stopLoadWatch = watch(isLoading, (val) => {
  if (!val) {
    hideLoader()
    stopLoadWatch()
  }
})

function hideLoader() {
  const loader = document.getElementById('app-loader')
  if (!loader) return
  loader.classList.add('fade-out')
  setTimeout(() => loader.remove(), 400)
}

function setActiveCity(name: string | null) {
  activeCityName.value = name
}

function resetAll() {
  cityStore.clearCities()
  locationStore.clearLocation()
  activeCityName.value = null
}

onMounted(() => {
  if (!isLoading.value) hideLoader()

  if (locationStore.lat === 0 && cityStore.list.filter(c => c !== 'Beirut').length === 0) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => locationStore.setLocation(pos.coords.latitude, pos.coords.longitude),
        () => {}
      )
    }
  }
})
</script>

<template>
  <WeatherIconSprite />

  <div class="max-w-[1670px] mx-auto">
    <NavBar />
    <SearchRow @reset-all="resetAll" @location-set="setActiveCity(null)" @city-added="setActiveCity" />
    <HeroSection :forecast-data="forecastData" :is-loading="isLoading" />

    <div class="flex items-baseline justify-between mx-1 mt-9 mb-[18px]">
      <h2 class="[font-family:var(--serif)] text-[32px] font-normal tracking-[-.01em]">
        Next 24 hours <em class="italic text-[var(--muted)]"> hour by hour</em>
      </h2>
      <span class="[font-family:var(--mono)] text-[11px] tracking-[.14em] uppercase text-[var(--muted)]">
        Forecast confidence · live
      </span>
    </div>
    <HourlyRow :forecast-data="forecastData" />

    <div class="flex items-baseline justify-between mx-1 mt-9 mb-[18px]">
      <h2 class="[font-family:var(--serif)] text-[32px] font-normal tracking-[-.01em]">
        The week ahead <em class="italic text-[var(--muted)]"> and your other places</em>
      </h2>
      <span class="[font-family:var(--mono)] text-[11px] tracking-[.14em] uppercase text-[var(--muted)]">
        Updated every 15 minutes
      </span>
    </div>
    <div class="grid grid-cols-[1.1fr_1fr] gap-6 items-start max-[1180px]:grid-cols-1">
      <WeekForecast :forecast-data="forecastData" />
      <CitiesGrid :active-city="activeCityName" @set-active="setActiveCity" />
    </div>

    <div class="flex items-baseline justify-between mx-1 mt-9 mb-[18px]">
      <h2 class="[font-family:var(--serif)] text-[32px] font-normal tracking-[-.01em]">
        The full picture
      </h2>
      <span class="[font-family:var(--mono)] text-[11px] tracking-[.14em] uppercase text-[var(--muted)]">
        Atmospheric detail
      </span>
    </div>
    <DetailCards :forecast-data="forecastData" />

    <Footer />
  </div>
</template>
