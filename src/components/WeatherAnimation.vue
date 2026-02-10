<script setup lang="ts">
import { computed } from 'vue'
import Sun from './weather-animations/Sun.vue'
import Moon from './weather-animations/Moon.vue'
import Cloud from './weather-animations/Cloud.vue'
import Rain from './weather-animations/Rain.vue'
import Snow from './weather-animations/Snow.vue'

const props = defineProps<{
  condition: number
  isDay: boolean
}>()

const weatherType = computed(() => {
  if ([1003, 1006, 1009, 1030].includes(props.condition)) return 'cloudy'
  if ([1063, 1183, 1189, 1195].includes(props.condition)) return 'rainy'
  if ([1066, 1114, 1213, 1219].includes(props.condition)) return 'snowy'
  return 'clear'
})
</script>

<template>
  <div class="weather-animation-container">
    <Sun v-if="weatherType === 'clear' && isDay" />
    <Moon v-else-if="weatherType === 'clear' && !isDay" />
    <Cloud v-else-if="weatherType === 'cloudy'" />
    <Rain v-else-if="weatherType === 'rainy'" />
    <Snow v-else-if="weatherType === 'snowy'" />
  </div>
</template>

<style scoped>
.weather-animation-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>
