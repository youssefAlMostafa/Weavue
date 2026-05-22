<script setup lang="ts">
import { computed } from 'vue'
import type { ForecastData } from '@/types/weather'
import { aqiLabel, uvLabel, windDirToDegrees } from '@/utils/weather'

const props = defineProps<{
  forecastData: ForecastData | null
}>()

const cur = computed(() => props.forecastData?.current)

const aqiRaw   = computed(() => cur.value?.air_quality)
const aqiValue = computed(() => Math.round(aqiRaw.value?.pm2_5 ?? 0))
const aqiIndex = computed(() => aqiRaw.value?.['us-epa-index'])
const aqiDesc  = computed(() => aqiLabel(aqiIndex.value))

const uv     = computed(() => cur.value?.uv ?? 0)
const uvPct  = computed(() => Math.min(100, Math.round((uv.value / 11) * 100)) + '%')
const uvDesc = computed(() => uvLabel(uv.value))

const windDeg  = computed(() => windDirToDegrees(cur.value?.wind_dir))
const windSpeed = computed(() => Math.round(cur.value?.wind_kph ?? 0))
const windGusts = computed(() => cur.value?.wind_dir ?? '—')

const vis = computed(() => cur.value?.vis_km ?? 0)
const visDesc = computed(() => {
  if (vis.value >= 20) return 'Crystal clear · excellent visibility'
  if (vis.value >= 10) return 'Good visibility'
  if (vis.value >= 5)  return 'Moderate visibility'
  return 'Poor visibility · use caution'
})
</script>

<template>
  <div
    v-if="!forecastData"
    class="grid grid-cols-4 gap-[14px] mt-[14px] max-[1180px]:grid-cols-2"
  >
    <div v-for="i in 4" :key="i" class="bg-[var(--paper)] border border-[var(--line)] rounded-[20px] min-h-[170px] animate-pulse" />
  </div>

  <div v-else class="grid grid-cols-4 gap-[14px] mt-[14px] max-[1180px]:grid-cols-2">

    <!-- ── Air Quality ── -->
    <div class="border border-[var(--line)] rounded-[20px] p-[22px] min-h-[170px] flex flex-col relative overflow-hidden bg-[linear-gradient(180deg,#e9efdf_0%,var(--paper)_70%)]">
      <div class="[font-family:var(--mono)] text-[10.5px] tracking-[.14em] uppercase text-[var(--muted)] flex items-center gap-[6px]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3 h-3 shrink-0">
          <path d="M3 12h4l3-9 4 18 3-9h4"/>
        </svg>
        Air Quality
      </div>
      <div class="[font-family:var(--serif)] text-[48px] leading-none tracking-[-.02em] mt-auto">
        {{ aqiValue }}<small class="[font-family:var(--sans)] text-[13px] text-[var(--muted)] ml-1 tracking-normal">AQI · {{ aqiDesc }}</small>
      </div>
      <div class="text-[12.5px] text-[var(--muted)] mt-[6px] leading-[1.45]">
        PM2.5 · {{ aqiIndex === 1 ? 'Below WHO guideline. Ideal for outdoor activity.' : aqiIndex === 2 ? 'Acceptable. Sensitive groups should take care.' : 'Consider limiting outdoor activity.' }}
      </div>
    </div>

    <!-- ── UV Index ── -->
    <div class="bg-[var(--paper)] border border-[var(--line)] rounded-[20px] p-[22px] min-h-[170px] flex flex-col relative overflow-hidden">
      <div class="[font-family:var(--mono)] text-[10.5px] tracking-[.14em] uppercase text-[var(--muted)] flex items-center gap-[6px]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3 h-3 shrink-0">
          <circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2"/>
        </svg>
        UV Trend
      </div>
      <div class="[font-family:var(--serif)] text-[48px] leading-none tracking-[-.02em] mt-auto">
        {{ uv }}<small class="[font-family:var(--sans)] text-[13px] text-[var(--muted)] ml-1 tracking-normal">{{ uvDesc }}</small>
      </div>
      <!-- UV bar -->
      <div class="relative h-[6px] rounded-full mt-[14px] bg-[linear-gradient(90deg,#5a7a55,#e8c93a,#e8642e,#a83a3a)]">
        <div
          class="absolute top-[-3px] w-3 h-3 bg-[var(--ink)] rounded-full border-2 border-[var(--paper)] -translate-x-1/2"
          :style="{ left: uvPct }"
        />
      </div>
      <div class="text-[12.5px] text-[var(--muted)] mt-[10px] leading-[1.45]">
        {{ uv >= 6 ? 'Sunscreen recommended.' : uv >= 3 ? 'Sun protection advised.' : 'No protection needed.' }}
      </div>
    </div>

    <!-- ── Wind ── -->
    <div class="bg-[var(--paper)] border border-[var(--line)] rounded-[20px] p-[22px] min-h-[170px] flex flex-col relative overflow-hidden">
      <div class="[font-family:var(--mono)] text-[10.5px] tracking-[.14em] uppercase text-[var(--muted)] flex items-center gap-[6px]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3 h-3 shrink-0">
          <path d="M3 8h13a3 3 0 1 0-3-3"/>
        </svg>
        Wind
      </div>

      <!-- Compass -->
      <div class="absolute top-[18px] right-[18px] w-[54px] h-[54px] border border-[var(--line)] rounded-full">
        <span class="absolute top-1 left-1/2 -translate-x-1/2 [font-family:var(--mono)] text-[9.5px] tracking-[.1em] text-[var(--muted)]">N</span>
        <div
          class="absolute w-[2px] h-[22px] bg-[var(--ink)] rounded-sm top-[6px] origin-bottom"
          :style="{ left: 'calc(50% - 1px)', transform: `rotate(${windDeg}deg)` }"
        />
      </div>

      <div class="[font-family:var(--serif)] text-[48px] leading-none tracking-[-.02em] mt-auto">
        {{ windSpeed }}<small class="[font-family:var(--sans)] text-[13px] text-[var(--muted)] ml-1 tracking-normal">km/h</small>
      </div>
      <div class="text-[12.5px] text-[var(--muted)] mt-[6px] leading-[1.45]">
        Steady from {{ windGusts }}
      </div>
    </div>

    <!-- ── Visibility ── -->
    <div class="bg-[var(--paper)] border border-[var(--line)] rounded-[20px] p-[22px] min-h-[170px] flex flex-col relative overflow-hidden">
      <div class="[font-family:var(--mono)] text-[10.5px] tracking-[.14em] uppercase text-[var(--muted)] flex items-center gap-[6px]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3 h-3 shrink-0">
          <path d="M5 17a4 4 0 1 1 1-7.87A6 6 0 0 1 18 11a3 3 0 1 1 0 6H5z"/>
        </svg>
        Visibility
      </div>
      <div class="[font-family:var(--serif)] text-[48px] leading-none tracking-[-.02em] mt-auto">
        {{ vis }}<small class="[font-family:var(--sans)] text-[13px] text-[var(--muted)] ml-1 tracking-normal">km</small>
      </div>
      <div class="text-[12.5px] text-[var(--muted)] mt-[6px] leading-[1.45]">
        {{ visDesc }}
      </div>
    </div>

  </div>
</template>
