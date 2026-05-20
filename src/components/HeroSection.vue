<script setup lang="ts">
import { computed } from 'vue'
import type { ForecastData } from '@/types/weather'
import HeroSkeleton from '@/components/HeroSkeleton.vue'
import HeroSun from '@/components/HeroSun.vue'
import HeroMoon from '@/components/HeroMoon.vue'
import {
  conditionCodeToSkyClass,
  formatCoords,
  formatLocalTime,
  getTimezoneLabel,
  minutesAgo,
  daylightLeft,
  sunArcProgress,
  sunArcDot,
  uvLabel,
} from '@/utils/weather'

const props = defineProps<{
  forecastData: ForecastData | null
  isLoading: boolean
}>()

const loc   = computed(() => props.forecastData?.location)
const cur   = computed(() => props.forecastData?.current)
const today = computed(() => props.forecastData?.forecast.forecastday[0])

const skyClass = computed(() => {
  if (!cur.value) return 'sky'
  const code = cur.value.condition?.code ?? 1000
  const isDay = cur.value.is_day
  const result = conditionCodeToSkyClass(code, isDay)
  console.log('[HeroSection] condition code:', code, '| is_day:', isDay, '| skyClass:', result)
  return result
})

const skyGradient = computed(() => ({
  sky:      'linear-gradient(170deg,#f7c9a4 0%,#f4ede2 55%,#d8e3e8 100%)',
  dusk:     'linear-gradient(170deg,#4b6c8a 0%,#8a7a8e 50%,#e8a07a 100%)',
  night:    'linear-gradient(170deg,#1a2538 0%,#2c3e5a 60%,#4b6c8a 100%)',
  overcast: 'linear-gradient(170deg,#c8cdd0 0%,#dfe0dc 55%,#e9e3d5 100%)',
  rain:     'linear-gradient(170deg,#2e4a62 0%,#4a6e8a 55%,#6a8ea8 100%)',
  snow:     'linear-gradient(170deg,#c8d8e8 0%,#dde8f2 55%,#edf3f8 100%)',
}[skyClass.value] ?? 'linear-gradient(170deg,#f7c9a4 0%,#f4ede2 55%,#d8e3e8 100%)'))

const isNight    = computed(() => ['night', 'dusk', 'rain'].includes(skyClass.value))
const textColor  = computed(() => isNight.value ? 'text-[var(--cream)]' : 'text-[var(--ink)]')

const coords    = computed(() => loc.value?.lat && loc.value?.lon ? formatCoords(loc.value.lat, loc.value.lon) : '—')
const localTime = computed(() => loc.value?.localtime ? formatLocalTime(loc.value.localtime) : '—')
const timezone  = computed(() => getTimezoneLabel(loc.value?.tz_id))
const updated   = computed(() => minutesAgo(cur.value?.last_updated))

const sunrise  = computed(() => today.value?.astro.sunrise ?? '—')
const sunset   = computed(() => today.value?.astro.sunset  ?? '—')
const daylight = computed(() => daylightLeft(sunset.value))
const arcT     = computed(() => sunArcProgress(sunrise.value, sunset.value))
const arcDot   = computed(() => sunArcDot(arcT.value))
const arcDash  = computed(() => Math.round(120 * (1 - arcT.value)))
</script>

<template>
  <HeroSkeleton v-if="isLoading" />

  <!-- Empty state -->
  <div v-else-if="!forecastData" class="grid grid-cols-[1.5fr_1fr] gap-6 mb-7 max-[1180px]:grid-cols-1">
    <div class="rounded-[24px] border border-dashed border-[var(--line)] min-h-[520px] flex items-center justify-center [font-family:var(--mono)] text-[12px] tracking-widest uppercase text-[var(--muted)]">
      Add a city to get started
    </div>
    <div class="rounded-[24px] border border-dashed border-[var(--line)] min-h-[200px]" />
  </div>

  <section v-else class="grid grid-cols-[1.5fr_1fr] gap-6 mb-7 max-[1180px]:grid-cols-1">
    <div
      class="relative border border-[var(--line)] rounded-[24px] overflow-hidden min-h-[520px]"
      :class="textColor"
      :style="{ background: skyGradient }">
      <HeroMoon />
      <!--<HeroSun />
     

      <svg
        v-if="skyClass === 'rain'"
        class="absolute right-[-20px] top-[10px] w-[360px] h-[360px] z-[1] pointer-events-none"
        viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <ellipse cx="115" cy="72" rx="48" ry="28" fill="rgba(255,255,255,0.08)"/>
        <ellipse cx="85"  cy="82" rx="38" ry="26" fill="rgba(255,255,255,0.07)"/>
        <ellipse cx="138" cy="84" rx="32" ry="22" fill="rgba(255,255,255,0.06)"/>
        <g stroke="rgba(180,210,240,0.45)" stroke-width="2" stroke-linecap="round">
          <line x1="78"  y1="112" x2="70"  y2="134"/>
          <line x1="98"  y1="116" x2="90"  y2="140"/>
          <line x1="118" y1="112" x2="110" y2="136"/>
          <line x1="138" y1="116" x2="130" y2="138"/>
          <line x1="158" y1="112" x2="150" y2="134"/>
          <line x1="88"  y1="140" x2="82"  y2="158"/>
          <line x1="108" y1="144" x2="102" y2="162"/>
          <line x1="128" y1="140" x2="122" y2="158"/>
          <line x1="148" y1="144" x2="142" y2="162"/>
        </g>
      </svg>-->

      <div class="py-9 px-[38px] flex flex-col min-h-[520px] relative z-[2]">
        <div class="flex justify-between items-start gap-4 [font-family:var(--mono)] text-[11.5px] tracking-[.12em] uppercase opacity-75">
          <span class="flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="max-md:hidden">
              <path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>
            </svg>
            {{ coords }}
          </span>
          <span class="flex items-center gap-[6px]">
             Updated {{ updated }}
          </span>
        </div>

        <div class="[font-family:var(--serif)] font-normal leading-[.96] tracking-[-.02em] my-auto">
          <span class="block text-[84px] max-[1180px]:text-[64px]">{{ loc?.name }}</span>
          <span class="block text-[24px] italic opacity-[.85]" :class="isNight ? 'text-[var(--cream)]' : 'text-[var(--ink-2)]'">
            {{ loc?.region }}, {{ loc?.country }}
          </span>
        </div>

        <div class="flex items-start gap-[18px] mt-6">
          <div class="[font-family:var(--serif)] text-[180px] max-[1180px]:text-[120px] leading-[.85] tracking-[-.04em] font-normal">
            {{ Math.round(cur?.temp_c ?? 0) }}<sup class="text-[.32em] font-normal align-top ml-[6px] opacity-70">°C</sup>
          </div>
          <div class="pt-4">
            <div class="[font-family:var(--serif)] italic text-[34px] leading-none tracking-[-.01em]">
              {{ cur?.condition?.text }}
            </div>
            <span class="block mt-[14px] text-[13px] [font-family:var(--mono)] tracking-[.1em] uppercase opacity-70">
              Feels {{ Math.round(cur?.feelslike_c ?? 0) }}° · H {{ Math.round(today?.day.maxtemp_c ?? 0) }}° L {{ Math.round(today?.day.mintemp_c ?? 0) }}°
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-6">
      <div class="flex-1 bg-[var(--paper)] border border-[var(--line)] rounded-[24px] p-7 pb-6">
        <div class="[font-family:var(--mono)] text-[11px] tracking-[.14em] uppercase text-[var(--muted)] mb-[18px] flex justify-between">
          <span>Right now</span>
          <span>{{ localTime }} · {{ timezone }}</span>
        </div>
        <div class="grid grid-cols-2 gap-x-7 gap-y-[22px]">
          <div class="border-t border-[var(--line)] pt-[14px]">
            <div class="[font-family:var(--mono)] text-[10.5px] tracking-[.12em] uppercase text-[var(--muted)] flex items-center gap-[6px] mb-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-[13px] h-[13px] shrink-0">
                <path d="M12 2c3 5 6 8 6 12a6 6 0 1 1-12 0c0-4 3-7 6-12z"/>
              </svg>Humidity
            </div>
            <div class="[font-family:var(--serif)] text-[34px] leading-none tracking-[-.01em]">
              {{ cur?.humidity }}<small class="[font-family:var(--sans)] text-[13px] text-[var(--muted)] ml-1 tracking-normal">%</small>
            </div>
            <div class="text-[12px] text-[var(--muted)] mt-1">
              {{ (cur?.humidity ?? 0) < 40 ? 'Dry' : (cur?.humidity ?? 0) < 60 ? 'Comfortable' : 'Humid' }}
            </div>
          </div>

          <div class="border-t border-[var(--line)] pt-[14px]">
            <div class="[font-family:var(--mono)] text-[10.5px] tracking-[.12em] uppercase text-[var(--muted)] flex items-center gap-[6px] mb-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-[13px] h-[13px] shrink-0">
                <path d="M3 8h13a3 3 0 1 0-3-3M3 14h17a3 3 0 1 1-3 3M3 11h10"/>
              </svg>Wind
            </div>
            <div class="[font-family:var(--serif)] text-[34px] leading-none tracking-[-.01em]">
              {{ Math.round(cur?.wind_kph ?? 0) }}<small class="[font-family:var(--sans)] text-[13px] text-[var(--muted)] ml-1 tracking-normal">km/h</small>
            </div>
            <div class="text-[12px] text-[var(--muted)] mt-1">{{ cur?.wind_dir }}</div>
          </div>

          <div class="border-t border-[var(--line)] pt-[14px]">
            <div class="[font-family:var(--mono)] text-[10.5px] tracking-[.12em] uppercase text-[var(--muted)] flex items-center gap-[6px] mb-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-[13px] h-[13px] shrink-0">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/>
              </svg>UV Index
            </div>
            <div class="[font-family:var(--serif)] text-[34px] leading-none tracking-[-.01em]">
              {{ cur?.uv }}<small class="[font-family:var(--sans)] text-[13px] text-[var(--muted)] ml-1 tracking-normal">{{ uvLabel(cur?.uv) }}</small>
            </div>
          </div>

          <div class="border-t border-[var(--line)] pt-[14px]">
            <div class="[font-family:var(--mono)] text-[10.5px] tracking-[.12em] uppercase text-[var(--muted)] flex items-center gap-[6px] mb-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-[13px] h-[13px] shrink-0">
                <path d="M3 12h3l2-6 4 12 3-9 2 3h4"/>
              </svg>Pressure
            </div>
            <div class="[font-family:var(--serif)] text-[34px] leading-none tracking-[-.01em]">
              {{ cur?.pressure_mb }}<small class="[font-family:var(--sans)] text-[13px] text-[var(--muted)] ml-1 tracking-normal">hPa</small>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-[var(--ink)] text-[var(--cream)] rounded-[24px] py-6 px-7 flex items-center gap-[22px]">
        <div class="relative w-[88px] h-[54px] shrink-0">
          <svg viewBox="0 0 100 60" class="w-full h-full overflow-visible block">
            <path d="M5 55 Q50 -10 95 55" stroke="rgba(244,237,226,.35)" stroke-width="1.5" fill="none" stroke-dasharray="3 4"/>
            <path d="M5 55 Q50 -10 95 55" stroke="var(--sun)" stroke-width="2" fill="none" stroke-dasharray="120" :stroke-dashoffset="arcDash"/>
            <circle fill="var(--sun)" r="5" :cx="arcDot.x" :cy="arcDot.y"/>
          </svg>
        </div>
        <div class="flex flex-col gap-1 [font-family:var(--mono)] text-[12px] tracking-[.06em]">
          <span class="opacity-60 text-[10.5px] uppercase tracking-[.14em]">Sunrise</span>
          <b class="font-medium tracking-[.04em]">{{ sunrise }}</b>
        </div>
        <div class="flex flex-col gap-1 [font-family:var(--mono)] text-[12px] tracking-[.06em]">
          <span class="opacity-60 text-[10.5px] uppercase tracking-[.14em]">Sunset</span>
          <b class="font-medium tracking-[.04em]">{{ sunset }}</b>
        </div>
        <div class="ml-auto text-right">
          <div class="[font-family:var(--mono)] text-[10.5px] tracking-[.14em] uppercase opacity-[.55]">Daylight left</div>
          <div class="[font-family:var(--serif)] text-[22px] italic mt-0.5">{{ daylight }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
