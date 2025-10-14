<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import BannerImage from "../assets/images/banner_image_no_bk.png"
import NavBar from './NavBar.vue'
import CurrentLocation from "./CurrentLocation.vue";
import Add from "./Add.vue";
import { useLocationStore } from '@/stores/locationStore';
import { useCityStore } from '@/stores/cityStore';
import { useWeather } from '@/composables/useWeather';

const locationStore = useLocationStore()
const cityStore = useCityStore()
const { weatherData, fetchWeatherByCoords, fetchWeatherByCity } = useWeather()

const resetAll = () => {
  cityStore.clearCities()
  locationStore.clearLocation()
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
    return 'from-[#F9F7F6] to-transparent'
  }

  const condition = weatherData.value.current.condition?.code
  const isDay = weatherData.value.current.is_day === 1

  if (isDay) {
    if ([1000].includes(condition || 0)) {
      return 'from-[#FEF3C7] via-[#FCD34D] to-transparent'
    } else if ([1003, 1006, 1009, 1030].includes(condition || 0)) {
      return 'from-[#E0E7FF] via-[#C7D2FE] to-transparent'
    } else if ([1063, 1180, 1183, 1189, 1195].includes(condition || 0)) {
      return 'from-[#DBEAFE] via-[#93C5FD] to-transparent'
    } else if ([1066, 1114, 1213, 1219].includes(condition || 0)) {
      return 'from-[#F0F9FF] via-[#E0F2FE] to-transparent'
    }
  } else {
    if ([1000].includes(condition || 0)) {
      return 'from-[#1E293B] via-[#334155] to-transparent'
    } else if ([1003, 1006, 1009, 1030].includes(condition || 0)) {
      return 'from-[#374151] via-[#4B5563] to-transparent'
    } else if ([1063, 1180, 1183, 1189, 1195].includes(condition || 0)) {
      return 'from-[#1E3A8A] via-[#1E40AF] to-transparent'
    } else if ([1066, 1114, 1213, 1219].includes(condition || 0)) {
      return 'from-[#0F172A] via-[#1E293B] to-transparent'
    }
  }

  return 'from-[#F9F7F6] to-transparent'
})

const textColor = computed(() => {
  if (!weatherData.value) return 'text-[#241717]'
  return weatherData.value.current.is_day === 1 ? 'text-[#241717]' : 'text-white'
})
</script>
<template>
   <section
      class="banner rounded-[36px] max-w-[1800px] px-12 mx-auto w-[96%] pb-[48px]
             transition-all duration-1000 bg-gradient-to-b shadow-2xl relative"
      :class="bannerGradient">
      <div class="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>

      <NavBar :textColor="textColor" />
      <div class="banner-main flex mt-[24px] justify-between px-[64px] relative z-10">
         <div class="main-col flex flex-col justify-center gap-7 w-[40%]">
            <div class="title-container">
               <h1 class="banner-header text-7xl tracking-[5px] transition-colors duration-1000 mb-2"
                   :class="textColor">
                  Weavue
               </h1>
               <div class="subtitle-badge inline-flex items-center gap-2 px-4 py-2 rounded-full
                           bg-white/10 backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                       viewBox="0 0 16 16" :class="textColor">
                     <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                     <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.39.39 0 0 0-.029-.518z"/>
                  </svg>
                  <span class="text-sm font-semibold transition-colors duration-1000"
                        :class="textColor">Real-time Weather Tracking</span>
               </div>
            </div>
            <p class="text-xl leading-relaxed transition-colors duration-1000" :class="textColor">
               Track real-time weather conditions for
               multiple cities around the world.
               Add your favorite locations or
               use your current position for
               instant updates.
            </p>
            <div class="actions-container">
               <CurrentLocation />
               <Add />
               <button
                  v-if="locationStore.lat || cityStore.list.length > 0"
                  @click="resetAll"
                  class="reset-btn flex items-center justify-center gap-2
                         px-6 py-3 rounded-full font-bold
                         text-base transition-all duration-300 mt-3"
                  :class="textColor === 'text-white' ? 'bg-red-600 text-white' : 'bg-red-500 text-white'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                     <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                     <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                  </svg>
                  Reset All
               </button>
            </div>
         </div>
         <div class="image-container relative">
            <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl blur-2xl">
            </div>
            <img :src="BannerImage" class="banner-image w-[36vw] max-w-[550px] h-fit floating relative z-10" alt="Banner Image">
         </div>
      </div>
   </section>
</template>
<style lang="scss">
.banner {
   position: relative;

   @media (max-width: 767px) {
      width: 90%;
      padding-inline: 2em;
   }

   .actions-container {
      @media (max-width: 767px) {
         display: flex;
         flex-direction: column;
         align-items: center;
         gap: 0.75rem;
      }

      .reset-btn {
         @media (max-width: 767px) {
            width: 100%;
            max-width: 300px;
         }
      }
   }

   .title-container {
      .subtitle-badge {
         @media (max-width: 767px) {
            margin-inline: auto;
         }
      }
   }

   .image-container {
      @media (max-width: 767px) {
         display: none;
      }
   }

   &-main {
      @media (max-width: 991px) {
         padding-inline: 12px;
      }
      @media (max-width: 767px) {
         padding-inline: 0;
      }

      .main-col {
         @media (max-width: 991px) {
            width: 55%;
         }

         @media (max-width: 767px) {
            width: 100%;
            text-align: center;
         }
      }

      .banner-image {
         @media (max-width: 991px) {
            width: 32vw;
         }

         @media (max-width: 767px) {
            display: none;
         }
      }
   }

   .floating {
      animation: float 3s ease-in-out infinite;
   }

   .banner-header {
      font-family: var(--font-lobster);

      @media (max-width: 991px) {
         font-size: 4.5em;
      }
   }
}

@keyframes float {
   0%,
   100% {
      transform: translateY(0);
   }

   50% {
      transform: translateY(-20px);
   }
}
</style>
