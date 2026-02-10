<script setup lang="ts">
import Cloud from './Cloud.vue'
</script>

<template>
  <div class="rain-container">
    <div class="rain-cloud-wrapper">
      <Cloud class="dark-cloud" />
    </div>
    <div class="rain-drops">
      <div class="rain-drop" v-for="i in 25" :key="i"></div>
    </div>
  </div>
</template>

<style scoped>
.rain-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.rain-cloud-wrapper {
  position: absolute;
  top: 10%;
  width: 100%;
  height: 200px;
}

.dark-cloud {
  filter: brightness(0.5) saturate(0.3);
}

.rain-drops {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.rain-drop {
  position: absolute;
  width: 2px;
  height: 25px;
  background: linear-gradient(to bottom, rgba(100, 150, 255, 0.9), rgba(100, 150, 255, 0.2));
  border-radius: 2px;
  animation: fall 0.8s linear infinite;
}

.rain-drop:nth-child(1) { left: 20%; animation-delay: 0s; }
.rain-drop:nth-child(2) { left: 25%; animation-delay: 0.1s; }
.rain-drop:nth-child(3) { left: 30%; animation-delay: 0.2s; }
.rain-drop:nth-child(4) { left: 35%; animation-delay: 0.3s; }
.rain-drop:nth-child(5) { left: 40%; animation-delay: 0.4s; }
.rain-drop:nth-child(6) { left: 45%; animation-delay: 0.5s; }
.rain-drop:nth-child(7) { left: 50%; animation-delay: 0.6s; }
.rain-drop:nth-child(8) { left: 55%; animation-delay: 0.7s; }
.rain-drop:nth-child(9) { left: 60%; animation-delay: 0.05s; }
.rain-drop:nth-child(10) { left: 65%; animation-delay: 0.15s; }
.rain-drop:nth-child(11) { left: 70%; animation-delay: 0.25s; }
.rain-drop:nth-child(12) { left: 75%; animation-delay: 0.35s; }
.rain-drop:nth-child(13) { left: 22%; animation-delay: 0.45s; }
.rain-drop:nth-child(14) { left: 28%; animation-delay: 0.55s; }
.rain-drop:nth-child(15) { left: 33%; animation-delay: 0.65s; }
.rain-drop:nth-child(16) { left: 38%; animation-delay: 0.75s; }
.rain-drop:nth-child(17) { left: 43%; animation-delay: 0.08s; }
.rain-drop:nth-child(18) { left: 48%; animation-delay: 0.18s; }
.rain-drop:nth-child(19) { left: 53%; animation-delay: 0.28s; }
.rain-drop:nth-child(20) { left: 58%; animation-delay: 0.38s; }
.rain-drop:nth-child(21) { left: 63%; animation-delay: 0.48s; }
.rain-drop:nth-child(22) { left: 68%; animation-delay: 0.58s; }
.rain-drop:nth-child(23) { left: 73%; animation-delay: 0.68s; }
.rain-drop:nth-child(24) { left: 27%; animation-delay: 0.12s; }
.rain-drop:nth-child(25) { left: 62%; animation-delay: 0.32s; }

@keyframes fall {
  0% {
    top: 25%;
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}
</style>
