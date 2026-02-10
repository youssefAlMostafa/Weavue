<script setup lang="ts">
import { computed, watchEffect, ref } from 'vue'
import BannerImage from "../assets/images/banner_image_no_bk.png"
import NavBar from './NavBar.vue'
import CurrentLocation from "./CurrentLocation.vue";
import Add from "./Add.vue";
import WeatherAnimation from './WeatherAnimation.vue'
import { useLocationStore } from '@/stores/locationStore';
import { useCityStore } from '@/stores/cityStore';
import { useWeather } from '@/composables/useWeather';

const locationStore = useLocationStore()
const cityStore = useCityStore()
const { weatherData, fetchWeatherByCoords, fetchWeatherByCity } = useWeather()
const showResetModal = ref(false)

const openResetModal = () => {
  showResetModal.value = true
}

const resetAll = () => {
  cityStore.clearCities()
  locationStore.clearLocation()
  showResetModal.value = false
}

watchEffect(() => {
  if (locationStore.lat !== 0 && locationStore.long !== 0) {
    fetchWeatherByCoords(locationStore.lat, locationStore.long)
  } else if (cityStore.list.length > 0) {
    fetchWeatherByCity(cityStore.list[cityStore.list.length - 1])
  } else {
    weatherData.value = null
  }
})

const bannerGradient = computed(() => {
  if (!weatherData.value) {
    return 'from-amber-50 via-orange-100 to-amber-50'
  }

  const condition = weatherData.value.current.condition?.code
  const isDay = weatherData.value.current.is_day === 1

  if (isDay) {
    if ([1000].includes(condition || 0)) {
      return 'from-amber-300 via-orange-300 to-yellow-200'
    } else if ([1003, 1006, 1009, 1030].includes(condition || 0)) {
      return 'from-slate-300 via-gray-200 to-slate-200'
    } else if ([1063, 1180, 1183, 1189, 1195].includes(condition || 0)) {
      return 'from-blue-400 via-cyan-300 to-blue-300'
    } else if ([1066, 1114, 1213, 1219].includes(condition || 0)) {
      return 'from-sky-200 via-blue-100 to-indigo-100'
    }
  } else {
    if ([1000].includes(condition || 0)) {
      return 'from-indigo-950 via-purple-900 to-slate-900'
    } else if ([1003, 1006, 1009, 1030].includes(condition || 0)) {
      return 'from-slate-800 via-gray-800 to-slate-700'
    } else if ([1063, 1180, 1183, 1189, 1195].includes(condition || 0)) {
      return 'from-blue-950 via-blue-900 to-slate-900'
    } else if ([1066, 1114, 1213, 1219].includes(condition || 0)) {
      return 'from-slate-900 via-blue-950 to-slate-800'
    }
  }

  return 'from-amber-50 via-orange-100 to-amber-50'
})

const textColor = computed(() => {
  if (!weatherData.value) return 'text-[#241717]'
  return weatherData.value.current.is_day === 1 ? 'text-[#241717]' : 'text-white'
})
</script>
<template>
  <section class="relative rounded-[36px] max-w-[1800px] px-12 mx-auto w-[96%] pb-[48px]
             transition-all duration-1000 bg-gradient-to-br shadow-2xl overflow-hidden
             max-md:w-[90%] max-md:px-8" :class="bannerGradient">
    <NavBar :textColor="textColor" />
    <div class="flex mt-[24px] justify-between px-[64px] relative z-10
                  max-lg:px-3 max-md:px-0">
      <div class="flex flex-col justify-center gap-7 w-[40%]
                     max-lg:w-[55%] max-md:w-full max-md:text-center">
        <div>
          <h1 class="text-7xl tracking-[5px] transition-colors duration-1000 mb-2
                          max-lg:text-[4.5rem]
                          [font-family:var(--font-lobster)]" :class="textColor">
            Weavue
          </h1>
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full
                           bg-white/10 backdrop-blur-sm max-md:mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
              :class="textColor">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path
                d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.39.39 0 0 0-.029-.518z" />
            </svg>
            <span class="text-sm font-semibold transition-colors duration-1000" :class="textColor">Real-time Weather
              Tracking</span>
          </div>
        </div>
        <p class="text-xl leading-relaxed transition-colors duration-1000" :class="textColor">
          Track real-time weather conditions for
          multiple cities around the world.
          Add your favorite locations or
          use your current position for
          instant updates.
        </p>
        <div class="max-md:flex max-md:flex-col max-md:items-center max-md:gap-3">
          <CurrentLocation />
          <Add />
          <button v-if="locationStore.lat || cityStore.list.length > 0" @click="openResetModal" class="flex items-center justify-center gap-2
                         px-6 py-3 rounded-full font-bold
                         text-base transition-all duration-300 mt-3 hover:opacity-80
                         max-md:w-full max-md:max-w-[300px]"
            :class="textColor === 'text-white' ? 'bg-white/20 text-white backdrop-blur-sm' : 'bg-gray-700/80 text-white backdrop-blur-sm'">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
              <path
                d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg>
            Reset All
          </button>
        </div>
      </div>
      <div class="relative max-md:hidden">
        <div v-if="weatherData?.current?.condition" class="w-[36vw] max-w-[550px] h-[36vw] max-h-[550px] relative z-10
                      animate-float
                      max-lg:w-[32vw] max-lg:h-[32vw]">
          <WeatherAnimation :condition="weatherData.current.condition.code" :isDay="weatherData.current.is_day === 1" />
        </div>
        <img v-else :src="BannerImage" class="w-[36vw] max-w-[550px] h-fit relative z-10
                      animate-float
                      max-lg:w-[32vw]" alt="Banner Image">
      </div>
    </div>

    <dialog :class="{ 'modal modal-open': showResetModal }" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Reset All Data?</h3>
        <p class="py-4">This will clear all saved cities and your current location. Are you sure you want to continue?
        </p>
        <div class="modal-action">
          <button @click="showResetModal = false" class="btn">Cancel</button>
          <button @click="resetAll" class="btn btn-error">Reset All</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop" @click="showResetModal = false">
        <button type="button">close</button>
      </form>
    </dialog>
  </section>
</template>
<style>
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
