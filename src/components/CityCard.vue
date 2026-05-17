<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useWeather } from '@/composables/useWeather'
import { conditionCodeToIcon, formatLocalTime } from '@/utils/weather'

const props = defineProps<{
  cityName?: string
  lat?: number
  long?: number
  isActive: boolean
}>()

defineEmits<{ click: [] }>()

const { weatherData, fetchWeatherByCity, fetchWeatherByCoords } = useWeather()

watchEffect(() => {
  if (props.lat && props.long) fetchWeatherByCoords(props.lat, props.long)
  else if (props.cityName) fetchWeatherByCity(props.cityName)
})

const loc = computed(() => weatherData.value?.location)
const cur = computed(() => weatherData.value?.current)
const icon = computed(() => {
  if (!cur.value) return 'i-sun'
  const code = cur.value.condition?.code ?? 1000
  const isDay = cur.value.is_day
  const result = conditionCodeToIcon(code, isDay)
  console.log('[CityCard]', displayName.value, '| condition code:', code, '| is_day:', isDay, '| icon:', result)
  return result
})
const time = computed(() => loc.value?.localtime ? formatLocalTime(loc.value.localtime) : '—')
const displayName = computed(() => props.cityName ?? loc.value?.name ?? '—')
const region = computed(() => {
  if (!loc.value) return '—'
  return loc.value.region ? `${loc.value.region}` : loc.value.country
})
</script>

<template>
  <button
    class="relative border rounded-[20px] p-5 pb-[18px] overflow-hidden cursor-pointer
           text-left transition-all duration-200 w-full"
    :class="isActive
      ? 'bg-[var(--ink)] text-[var(--cream)] border-[var(--ink)]'
      : 'bg-white border-[var(--line)] hover:-translate-y-0.5 hover:border-[var(--ink-2)] hover:shadow-[0_8px_24px_-16px_rgba(26,24,20,.3)]'"
    @click="$emit('click')">
    <span class="[font-family:var(--mono)] text-[10.5px] tracking-[.06em] absolute top-[18px] right-5"
      :class="isActive ? 'text-[var(--cream)] opacity-60' : 'text-[var(--muted)]'">{{ time }}</span>
    <div class="[font-family:var(--serif)] text-[24px] tracking-[-.01em] leading-none"
         :class="isActive ? 'text-[var(--cream)]' : 'text-[var(--muted)]'">
      {{ displayName }}
    </div>
    <div class="[font-family:var(--mono)] text-[10.5px] tracking-[.1em] uppercase mt-1"
      :class="isActive ? 'text-[var(--cream)] opacity-[.55]' : 'text-[var(--muted)]'">{{ region }}</div>
    <div v-if="!weatherData" class="mt-6 h-[48px] rounded-lg bg-current opacity-10 animate-pulse" />
    <div v-else class="flex items-end justify-between mt-6">
      <div>
        <div class="[font-family:var(--serif)] text-[48px] leading-[.9] tracking-[-.02em]">
          {{ Math.round(cur?.temp_c ?? 0) }}°
        </div>
        <div class="[font-family:var(--serif)] italic text-[14px] mt-1"
          :class="isActive ? 'text-[var(--cream)] opacity-70' : 'text-[var(--muted)]'">
          {{ cur?.condition?.text }}
        </div>
      </div>
      <div class="w-[46px] h-[46px] shrink-0">
        <svg viewBox="0 0 32 32" width="46" height="46">
          <use :href="`#${icon}`" />
        </svg>
      </div>
    </div>
  </button>
</template>
