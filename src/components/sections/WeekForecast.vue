<script setup lang="ts">
import { computed } from 'vue'
import type { ForecastData } from '@/types/weather'
import { conditionCodeToIcon } from '@/utils/weather'

const props = defineProps<{
  forecastData: ForecastData | null
}>()

const days = computed(() => {
  if (!props.forecastData) return []

  const forecastDays = props.forecastData.forecast.forecastday
  const curTemp      = props.forecastData.current.temp_c

  const allMin = Math.min(...forecastDays.map(d => d.day.mintemp_c))
  const allMax = Math.max(...forecastDays.map(d => d.day.maxtemp_c))
  const range  = allMax - allMin || 1

  return forecastDays.map((d, i) => {
    const date  = new Date(d.date + 'T12:00:00')
    const label = i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })
    const sub   = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const low   = ((d.day.mintemp_c - allMin) / range * 100).toFixed(1) + '%'
    const high  = ((d.day.maxtemp_c - allMin) / range * 100).toFixed(1) + '%'
    const nowPct = i === 0
      ? ((curTemp - allMin) / range * 100).toFixed(1) + '%'
      : null
    const icon = conditionCodeToIcon(d.day.condition.code, 1)

    console.log(`[WeekForecast] day ${i} (${label}) | code: ${d.day.condition.code} | text: "${d.day.condition.text}" | icon: ${icon} | rain%: ${d.day.daily_chance_of_rain}`)

    return {
      label,
      sub,
      icon,
      minTemp: Math.round(d.day.mintemp_c),
      maxTemp: Math.round(d.day.maxtemp_c),
      pop:     d.day.daily_chance_of_rain,
      low,
      high,
      nowPct,
    }
  })
})

function barGradient(low: string, high: string) {
  return `linear-gradient(90deg, var(--steel-soft) 0%, var(--steel-soft) ${low}, #f4a07a ${low}, var(--sun) ${high}, #eed8c2 ${high}, #eed8c2 100%)`
}
</script>

<template>
  <div v-if="!forecastData" class="bg-[var(--paper)] border border-[var(--line)] rounded-[20px] py-2 px-6 min-h-[300px] animate-pulse" />

  <div v-else class="bg-[var(--paper)] border border-[var(--line)] rounded-[20px] py-2 px-6">
    <div
      v-for="(day, i) in days"
      :key="i"
      class="grid grid-cols-[90px_36px_1fr_60px] items-center gap-[18px] py-4 border-b border-[var(--line)] last:border-b-0"
    >
      <!-- Day label -->
      <div class="[font-family:var(--mono)] text-[12.5px] tracking-[.06em] uppercase text-[var(--ink-2)]">
        {{ day.label }}
        <span class="block text-[10.5px] text-[var(--muted)] tracking-[.1em] mt-0.5">{{ day.sub }}</span>
      </div>

      <!-- Icon -->
      <div class="w-7 h-7">
        <svg viewBox="0 0 32 32" width="28" height="28">
          <use :href="`#${day.icon}`" />
        </svg>
      </div>

      <!-- Temp range bar -->
      <div class="flex items-center gap-[10px] [font-family:var(--mono)] text-[12.5px] text-[var(--muted)]">
        <span>{{ day.minTemp }}°</span>
        <div class="relative flex-1 h-[6px] rounded-full" :style="{ background: barGradient(day.low, day.high) }">
          <div
            v-if="day.nowPct"
            class="absolute top-[-2px] w-[10px] h-[10px] rounded-full bg-[var(--cream)] border-2 border-[var(--ink)] -translate-x-1/2"
            :style="{ left: day.nowPct }"
          />
        </div>
        <span class="text-[var(--ink)]">{{ day.maxTemp }}°</span>
      </div>

      <!-- Precipitation -->
      <div class="[font-family:var(--mono)] text-[11px] text-[var(--steel)] flex items-center justify-end gap-1">
        <template v-if="day.pop">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-[11px] h-[11px] shrink-0">
            <path d="M12 3c3 5 6 8 6 12a6 6 0 1 1-12 0c0-4 3-7 6-12z"/>
          </svg>
          {{ day.pop }}%
        </template>
        <template v-else>—</template>
      </div>
    </div>
  </div>
</template>
