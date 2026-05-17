<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { searchCities, type CitySearchResult } from '@/services/weatherService'
import { useCityStore } from '@/stores/cityStore'
import { useLocationStore } from '@/stores/locationStore'

const emit = defineEmits<{
  'reset-all': []
  'location-set': []
  'city-added': [name: string]
}>()

const cityStore = useCityStore()
const locationStore = useLocationStore()

const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/i.test(navigator.userAgent)
const searchInput = ref<HTMLInputElement | null>(null)
const query = ref('')
const suggestions = ref<CitySearchResult[]>([])
const showSuggestions = ref(false)
const isSearching = ref(false)
const isLocating = ref(false)
const errorMsg = ref('')

watch(query, async (val) => {
  if (val.trim().length < 2) { suggestions.value = []; showSuggestions.value = false; return }
  isSearching.value = true
  try {
    suggestions.value = await searchCities(val.trim())
    showSuggestions.value = suggestions.value.length > 0
  } catch {
    suggestions.value = []
  } finally {
    isSearching.value = false
  }
})

function selectCity(city: CitySearchResult) {
  cityStore.addCity(city.name)
  emit('city-added', city.name)
  query.value = ''
  suggestions.value = []
  showSuggestions.value = false
}

function closeSuggestions() {
  setTimeout(() => { showSuggestions.value = false }, 200)
}

function useLocation() {
  if (!('geolocation' in navigator)) return
  isLocating.value = true
  errorMsg.value = ''
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      locationStore.setLocation(pos.coords.latitude, pos.coords.longitude)
      emit('location-set')
      isLocating.value = false
    },
    (err) => {
      errorMsg.value = err.code === 1 ? 'Location permission denied.' : 'Could not get your location.'
      isLocating.value = false
    },
    { timeout: 10000, enableHighAccuracy: true }
  )
}

function resetAll() {
  emit('reset-all')
  query.value = ''
}

function hasData() { return locationStore.lat !== 0 || cityStore.list.length > 0 }

function handleGlobalKey(e: KeyboardEvent) {
  const triggered = isMac ? (e.metaKey && e.key === 'k') : (e.ctrlKey && e.key === 'k')
  if (triggered) {
    e.preventDefault()
    searchInput.value?.focus()
  }
}

onMounted(() => document.addEventListener('keydown', handleGlobalKey))
onUnmounted(() => document.removeEventListener('keydown', handleGlobalKey))
</script>

<template>
  <div class="flex items-center gap-[10px] mb-7 flex-wrap relative">

    <!-- Search bar -->
    <div
      class="flex items-center gap-[10px] bg-[var(--paper)] border border-[var(--line)] rounded-full px-[18px] pl-[16px] py-[10px] flex-1 min-w-[280px] max-w-[520px] transition-colors duration-200 focus-within:border-[var(--ink)] relative">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
        class="w-4 h-4 text-[var(--muted)] shrink-0">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input ref="searchInput" v-model="query" placeholder="Search a city, region, or airport code…" autocomplete="off"
        class="flex-1 bg-transparent border-0 outline-none text-[14.5px] text-[var(--ink)] placeholder:text-[var(--muted)]"
        @blur="closeSuggestions" />
      <span
        class="[font-family:var(--mono)] text-[11px] text-[var(--muted)] border border-[var(--line)] rounded-[6px] px-[6px] py-[2px] shrink-0 max-md:hidden">
        {{ isMac ? '⌘' : 'Ctrl' }} K
      </span>

      <!-- Suggestions -->
      <div v-if="showSuggestions || isSearching"
        class="absolute top-[calc(100%+8px)] left-0 right-0 bg-[var(--paper)] border border-[var(--line)] rounded-[16px] shadow-[0_8px_24px_-8px_rgba(26,24,20,.15)] overflow-hidden z-50">
        <div v-if="isSearching" class="px-[18px] py-[14px] text-[13px] text-[var(--muted)]">Searching…</div>
        <button v-for="city in suggestions" :key="city.id"
          class="flex flex-col items-start w-full px-[18px] py-3 border-b border-[var(--line)] last:border-b-0 hover:bg-[var(--cream-2)] transition-colors text-left"
          @mousedown.prevent="selectCity(city)">
          <span class="text-[14px] text-[var(--ink)] font-medium">{{ city.name }}</span>
          <span class="[font-family:var(--mono)] text-[11px] text-[var(--muted)] mt-0.5">
            {{ city.region ? `${city.region}, ` : '' }}{{ city.country }}
          </span>
        </button>
      </div>
    </div>

    <!-- Use my location -->
    <button
      class="inline-flex items-center gap-2 bg-white text-black!
             border border-[var(--ink)] rounded-full px-4 py-[10px] text-[13.5px]
             transition-all duration-200 hover:bg-black hover:text-white! disabled:opacity-60
             disabled:cursor-not-allowed whitespace-nowrap"
      @click="useLocation" :disabled="isLocating">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-[14px] h-[14px]">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
      </svg>
      {{ isLocating ? 'Locating…' : 'Use my location' }}
    </button>

    <!-- Reset all -->
    <button v-if="hasData()"
      class="inline-flex items-center gap-2 bg-[var(--paper)] border border-[var(--line)] rounded-full px-4 py-[10px] text-[13.5px] text-[var(--ink-2)] transition-all duration-200 hover:border-[var(--ink)] hover:text-[var(--ink)] whitespace-nowrap"
      @click="resetAll">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-[14px] h-[14px]">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
      Reset all
    </button>

    <!-- Error toast -->
    <Transition enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200" enter-from-class="opacity-0" leave-to-class="opacity-0">
      <div v-if="errorMsg"
        class="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-[var(--ink)] text-[var(--cream)] text-[13px] px-5 py-3 rounded-full shadow-lg">
        {{ errorMsg }}
        <button class="opacity-60 hover:opacity-100 transition-opacity" @click="errorMsg = ''">✕</button>
      </div>
    </Transition>
  </div>
</template>
