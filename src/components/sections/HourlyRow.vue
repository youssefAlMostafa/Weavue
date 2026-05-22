<script setup lang="ts">
import { computed } from 'vue'
import type { ForecastData } from '@/types/weather'
import { conditionCodeToIcon } from '@/utils/weather'

const props = defineProps<{
  forecastData: ForecastData | null
}>()

const hours = computed(() => {
  if (!props.forecastData) return []

  const localtime = props.forecastData.location.localtime
  const currentHour = parseInt(localtime.split(' ')[1]?.split(':')[0] ?? '0', 10)

  const todayHours    = props.forecastData.forecast.forecastday[0]?.hour ?? []
  const tomorrowHours = props.forecastData.forecast.forecastday[1]?.hour ?? []
  const allHours      = [...todayHours, ...tomorrowHours]

  return allHours.slice(currentHour, currentHour + 24).map((h, i) => ({
    label: i === 0 ? 'Now' : (h.time.split(' ')[1]?.slice(0, 5) ?? ''),
    temp:  Math.round(h.temp_c),
    icon:  conditionCodeToIcon(h.condition.code, h.is_day),
    pop:   Math.max(h.chance_of_rain, h.chance_of_snow),
    isNow: i === 0,
  }))
})
</script>

<template>
  <div v-if="!forecastData" class="bg-[var(--paper)] border border-[var(--line)] rounded-[20px] p-[6px] min-h-[120px] animate-pulse" />

  <div
    v-else
    class="bg-[var(--paper)] border border-[var(--line)] rounded-[20px] p-[6px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
  >
    <div class="flex gap-0.5 min-w-max">
      <div
        v-for="(hour, i) in hours"
        :key="i"
        class="flex flex-col items-center gap-[10px] py-[18px] px-[18px] rounded-[14px] min-w-[84px] transition-colors duration-200 cursor-default"
        :class="hour.isNow
          ? 'bg-[var(--ink)] text-[var(--cream)]'
          : 'hover:bg-[var(--cream-2)]'"
      >
        <!-- Time -->
        <span class="[font-family:var(--mono)] text-[11px] tracking-[.08em] opacity-70">
          {{ hour.label }}
        </span>

        <!-- Icon -->
        <span class="w-8 h-8 flex items-center justify-center">
          <svg viewBox="0 0 32 32" width="32" height="32">
            <use :href="`#${hour.icon}`" />
          </svg>
        </span>

        <!-- Temperature -->
        <span class="[font-family:var(--serif)] text-[24px] leading-none">
          {{ hour.temp }}°
        </span>

        <!-- Precipitation -->
        <span
          class="[font-family:var(--mono)] text-[10.5px]"
          :class="hour.isNow ? 'text-[var(--steel-soft)]' : 'text-[var(--steel)]'"
        >
          {{ hour.pop ? `◇ ${hour.pop}%` : '—' }}
        </span>
      </div>
    </div>
  </div>
</template>
