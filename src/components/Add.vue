<script lang="ts" setup>
import { useCityStore } from '@/stores/cityStore';
import { ref } from 'vue';

const cityStore = useCityStore();
const searchQuery = ref('');

function handleInputChange() {
  if (searchQuery.value.trim()) {
    cityStore.addCity(searchQuery.value.trim());
    searchQuery.value = '';
  }
}
</script>

<template>
  <div class="search_bar_container relative">
    <label class="input
             bg-[#7fcbcb]
             text-black
             font-bold
             rounded-full
             text-lg
             flex
             gap-4
             w-full
             h-fit
             px-5
             py-1
             transition-all
             outline-none
             duration-200
             focus-within:outline-none
             focus-within:border-none
             focus-within:shadow-none
             focus-within:ring-0">
      <svg xmlns="http://www.w3.org/2000/svg"
           width="24"
           height="24"
           fill="currentColor"
           class="bi bi-buildings"
           viewBox="0 0 16 16">
        <path
          d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022M6 8.694 1 10.36V15h5zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5z" />
        <path
          d="M2 11h1v1H2zm2 0h1v1H4zm-2 2h1v1H2zm2 0h1v1H4zm4-4h1v1H8zm2 0h1v1h-1zm-2 2h1v1H8zm2 0h1v1h-1zm2-2h1v1h-1zm0 2h1v1h-1zM8 7h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zM8 5h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zm0-2h1v1h-1z" />
      </svg>
      <input class="text-black bg-transparent border-none
               placeholder:text-black outline-none
               py-3 font-medium" type="search" v-model="searchQuery" @change="handleInputChange" required
        placeholder="Add a city" />
    </label>
  </div>
</template>
<style lang="scss">
.search_bar_container {
  .input {
    @media (max-width: 767px) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding-top: 12px;
      border-radius: 25px;
    }

    input {
      @media (max-width: 767px) {
        text-align: center;
      }
    }
  }
}
</style>
