<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { useCityStore } from '@/stores/cityStore';
import { ref, watch } from 'vue';
import { searchCities, type CitySearchResult } from '@/services/weatherService';

const cityStore = useCityStore();
const searchQuery = ref('');
const suggestions = ref<CitySearchResult[]>([]);
const showSuggestions = ref(false);
const isSearching = ref(false);
const errorMessage = ref('');
const showError = ref(false);

watch(searchQuery, async (newValue) => {
  if (newValue.trim().length >= 2) {
    isSearching.value = true;
    try {
      suggestions.value = await searchCities(newValue.trim());
      showSuggestions.value = suggestions.value.length > 0;
    } catch (error) {
      console.error('Error searching cities:', error);
      suggestions.value = [];
    } finally {
      isSearching.value = false;
    }
  } else {
    suggestions.value = [];
    showSuggestions.value = false;
  }
});

async function selectCity(city: CitySearchResult) {
  suggestions.value = [];
  showSuggestions.value = false;
  searchQuery.value = '';

  isSearching.value = true;
  errorMessage.value = '';
  showError.value = false;

  try {
    cityStore.addCity(city.name);
  } catch (error: any) {
    console.error('Weather API validation failed:', error);
    console.error('Error response:', error.response?.data);

    errorMessage.value = `Sorry, "${city.name}, ${city.country}" is not supported by the weather API. Please try another city.`;
    showError.value = true;

    setTimeout(() => {
      showError.value = false;
    }, 5000);
  } finally {
    isSearching.value = false;
  }
}

function handleInputChange() {
  if (searchQuery.value.trim() && suggestions.value.length === 1) {
    selectCity(suggestions.value[0]);
  } else if (searchQuery.value.trim() && suggestions.value.length === 0) {
    cityStore.addCity(searchQuery.value.trim());
    searchQuery.value = '';
  }
}

function closeSuggestions() {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 200);
}
</script>

<template>
  <div class="search_bar_container relative">
    <label class="input bg-[#7fcbcb] text-black font-bold rounded-full text-lg flex gap-4
                  w-full h-fit px-5 py-1 transition-all outline-none duration-200
                  focus-within:outline-none focus-within:border-none focus-within:shadow-none focus-within:ring-0">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-buildings"
        viewBox="0 0 16 16">
        <path
          d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022M6 8.694 1 10.36V15h5zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5z" />
        <path
          d="M2 11h1v1H2zm2 0h1v1H4zm-2 2h1v1H2zm2 0h1v1H4zm4-4h1v1H8zm2 0h1v1h-1zm-2 2h1v1H8zm2 0h1v1h-1zm2-2h1v1h-1zm0 2h1v1h-1zM8 7h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zM8 5h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zm0-2h1v1h-1z" />
      </svg>
      <input class="text-black bg-transparent border-none placeholder:text-black outline-none py-3 font-medium flex-1"
        type="search" v-model="searchQuery" @change="handleInputChange" @blur="closeSuggestions"
        placeholder="Add a city" autocomplete="off" />
    </label>

    <div v-if="showSuggestions && suggestions.length > 0"
      class="suggestions-dropdown absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl max-h-[300px]
             overflow-y-auto z-50 border border-gray-200 text-black no-scrollbar">
      <div v-for="city in suggestions" :key="city.id" @mousedown.prevent="selectCity(city)"
        class="suggestion-item px-5 py-3 hover:bg-[#7fcbcb] hover:text-black cursor-pointer transition-colors
        border-b border-gray-100 last:border-b-0">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-bold text-base">{{ city.name }}</p>
            <p class="text-sm opacity-75">{{ city.region ? `${city.region}, ` : '' }}{{ city.country }}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
          </svg>
        </div>
      </div>
    </div>

    <div v-if="isSearching"
      class="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl px-5 py-4 text-center text-gray-600 z-50">
      {{ suggestions.length > 0 ? 'Searching cities...' : 'Validating city...' }}
    </div>

    <Transition name="slide-down">
      <div v-if="showError"
        class="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] mx-auto max-w-md shadow-xl rounded-2xl overflow-hidden">
        <div class="bg-red-500 text-white px-6 py-4 flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" class="flex-shrink-0 mt-0.5">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
          </svg>
          <div class="flex-1">
            <p class="font-semibold mb-1">City Not Supported</p>
            <p class="text-sm opacity-90">{{ errorMessage }}</p>
          </div>
          <button @click="showError = false" class="flex-shrink-0 hover:bg-red-600 rounded-full p-1 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg>
          </button>
        </div>
      </div>
    </Transition>
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

      &::-webkit-search-cancel-button {
        -webkit-appearance: none;
        appearance: none;
        height: 20px;
        width: 20px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23000000'%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E%3C/svg%3E");
        background-size: 20px 20px;
        cursor: pointer;
      }
    }
  }

  .suggestions-dropdown {
    animation: slideDown 0.2s ease-out;

    @media (max-width: 767px) {
      max-height: 250px;
    }

    .suggestion-item {
      &:first-child {
        border-radius: 16px 16px 0 0;
      }

      &:last-child {
        border-radius: 0 0 16px 16px;
      }
    }
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-down {
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease;
  }

  &-enter-from {
    opacity: 0;
    transform: translate(-50%, -20px);
  }

  &-leave-to {
    opacity: 0;
    transform: translate(-50%, -20px);
  }
}
</style>
