<script setup lang="ts">
import { useCityStore } from '@/stores/cityStore'
import { useLocationStore } from '@/stores/locationStore'
import CityCard from './CityCard.vue'

const props = defineProps<{
  activeCity: string | null
}>()

const emit = defineEmits<{
  'set-active': [name: string | null]
}>()

const cityStore     = useCityStore()
const locationStore = useLocationStore()

const hasLocation = () => locationStore.lat !== 0 && locationStore.long !== 0

function focusSearch() {
  const input = document.querySelector<HTMLInputElement>('.search input')
  input?.focus()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="grid grid-cols-2 gap-[14px]">

    <!-- Current location card -->
    <CityCard
      v-if="hasLocation()"
      :lat="locationStore.lat"
      :long="locationStore.long"
      :is-active="activeCity === null"
      @click="emit('set-active', null)"
    />

    <!-- Saved city cards -->
    <CityCard
      v-for="city in cityStore.list"
      :key="city"
      :city-name="city"
      :is-active="activeCity === city"
      @click="emit('set-active', city)"
    />

    <!-- Add another place -->
    <button
      class="flex items-center justify-center gap-2 bg-transparent border border-dashed border-[var(--line)] rounded-[20px] min-h-[160px] text-[13.5px] text-[var(--muted)] transition-all duration-200 hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--paper)]"
      @click="focusSearch"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-[14px] h-[14px]">
        <path d="M12 5v14M5 12h14"/>
      </svg>
      Add another place
    </button>
  </div>
</template>
