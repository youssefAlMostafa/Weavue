<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLocationStore } from '@/stores/locationStore';

const locationStore = useLocationStore();

const latitude = ref<number>(0)
const longitude = ref<number>(0)
const isLoading = ref(false)
const permissionRequested = ref(false)

const errorMessage = ref({
  msg: "Error while fetching your location. Please allowed in your broswer.",
  active: false
});

const getPosition = () => {
  isLoading.value = true
  navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude.value = position.coords.latitude
      longitude.value = position.coords.longitude
      locationStore.setLocation(latitude.value, longitude.value);
      isLoading.value = false
      permissionRequested.value = false
    },
    (error) => {
      errorMessage.value.msg = `${error.message}`;
      customizeErrorMessage(error.code);
      errorMessage.value.active = true;
      isLoading.value = false;
      permissionRequested.value = false
    },
    {
      timeout: 10000,
      maximumAge: 0,
      enableHighAccuracy: true
    }
  )
}

const goWithCurrentLocation = async () => {
  errorMessage.value.active = false;

  if ("geolocation" in navigator) {
    if (navigator.permissions) {
      try {
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' })

        if (permissionStatus.state === 'granted') {
          getPosition()
        } else if (permissionStatus.state === 'prompt') {
          permissionRequested.value = true
          permissionStatus.onchange = () => {
            if (permissionStatus.state === 'granted' && permissionRequested.value) {
              getPosition()
            }
          }
          getPosition()
        } else {
          errorMessage.value.msg = "Location permission denied. Please enable it in your browser settings.";
          errorMessage.value.active = true;
        }
      } catch (error) {
        getPosition()
      }
    } else {
      getPosition()
    }
  }
};

const customizeErrorMessage = (code: number) => {
  if (code === 1) {
    errorMessage.value.msg = "Please allow location access in your browser settings.";
  } else if (code === 2) {
    errorMessage.value.msg = "Location information is unavailable.";
  } else if (code === 3) {
    errorMessage.value.msg = "The request to get user location timed out.";
  }
}
</script>
<template>
  <div class="mb-3 max-md:text-center max-md:mb-8">
    <button class="btn bg-transparent border-none
                   font-sans text-nowrap shadow-none
                   flex justify-start gap-4 text-[18px]
                   text-yellow-600 px-0 w-fit
                   max-md:mx-auto"
                   @click="goWithCurrentLocation"
                   :disabled="isLoading">
      <svg v-if="!isLoading" version="1.1" id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px" width="24px" height="24px"
        viewBox="0 0 120.87 122.88"
        style="enable-background:new 0 0 120.87 122.88"
        xml:space="preserve">
        <g>
          <path
            d="M79.21,70.64c11.61,1.57,21.65,4.57,28.79,8.49c8.11,4.45,12.88,10.3,12.88,17c0,8.29-7.44,15.35-19.46,20.05 c-10.58,4.14-25.07,6.69-40.98,6.69c-15.9,0-30.4-2.56-40.98-6.69C7.44,111.49,0,104.43,0,96.14c0-6.8,4.91-12.71,13.23-17.19 c7.32-3.94,17.6-6.93,29.47-8.44l1.28,10.11c-10.6,1.34-19.64,3.94-25.92,7.32c-4.93,2.65-7.83,5.51-7.83,8.2 c0,3.65,4.95,7.41,12.95,10.53c9.44,3.69,22.61,5.97,37.26,5.97c14.65,0,27.82-2.28,37.26-5.97c8-3.13,12.95-6.89,12.95-10.53 c0-2.63-2.8-5.44-7.57-8.05c-6.09-3.34-14.88-5.94-25.23-7.34L79.21,70.64L79.21,70.64z M65.33,44.36v50.87H55.1V44.36 c-9.95-2.32-17.36-11.24-17.36-21.89C37.74,10.06,47.8,0,60.22,0c12.41,0,22.47,10.06,22.47,22.47 C82.69,33.13,75.28,42.05,65.33,44.36L65.33,44.36z"
            fill="#d08700" />
        </g>
      </svg>
      <span v-if="isLoading" class="loading loading-spinner loading-md"></span>
      {{ isLoading ? 'Getting your location...' : 'Use My Current Location' }}
    </button>
  </div>
  <Transition name="slide-down">
    <div v-if="errorMessage.active"
      class="fixed top-0 left-0 right-0 z-50 mx-auto max-w-md mt-4 shadow-lg alert alert-error" role="alert">
      <span>{{ errorMessage.msg }}</span>
      <button @click="errorMessage.active = false"
              class="btn btn-sm btn-circle ml-auto bg-transparent
                     border-0 shadow-none text-black">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  </Transition>
</template>
<style>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
