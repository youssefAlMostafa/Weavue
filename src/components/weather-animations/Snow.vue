<script setup lang="ts">
import Cloud from './Cloud.vue'
</script>

<template>
  <div class="snow-container">
    <div class="snow-cloud-wrapper">
      <Cloud class="gray-cloud" />
    </div>
    <div class="snowflakes">
      <div class="snowflake" v-for="i in 20" :key="i">❄</div>
    </div>
  </div>
</template>

<style scoped>
.snow-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.snow-cloud-wrapper {
  position: absolute;
  top: 10%;
  width: 100%;
  height: 200px;
}

.gray-cloud {
  filter: brightness(0.75) saturate(0.5);
}

.snowflakes {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.snowflake {
  position: absolute;
  color: white;
  font-size: 20px;
  animation: snow-fall 4s linear infinite;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
}

.snowflake:nth-child(1) { left: 20%; animation-delay: 0s; animation-duration: 3s; }
.snowflake:nth-child(2) { left: 30%; animation-delay: 0.5s; animation-duration: 4s; }
.snowflake:nth-child(3) { left: 40%; animation-delay: 1s; animation-duration: 3.5s; }
.snowflake:nth-child(4) { left: 50%; animation-delay: 1.5s; animation-duration: 4.5s; }
.snowflake:nth-child(5) { left: 60%; animation-delay: 2s; animation-duration: 3.8s; }
.snowflake:nth-child(6) { left: 70%; animation-delay: 2.5s; animation-duration: 4.2s; }
.snowflake:nth-child(7) { left: 25%; animation-delay: 0.3s; animation-duration: 3.3s; }
.snowflake:nth-child(8) { left: 35%; animation-delay: 0.8s; animation-duration: 4.8s; }
.snowflake:nth-child(9) { left: 45%; animation-delay: 1.3s; animation-duration: 3.6s; }
.snowflake:nth-child(10) { left: 55%; animation-delay: 1.8s; animation-duration: 4.4s; }
.snowflake:nth-child(11) { left: 65%; animation-delay: 2.3s; animation-duration: 3.9s; }
.snowflake:nth-child(12) { left: 75%; animation-delay: 2.8s; animation-duration: 4.1s; }
.snowflake:nth-child(13) { left: 22%; animation-delay: 0.2s; animation-duration: 3.7s; }
.snowflake:nth-child(14) { left: 38%; animation-delay: 0.7s; animation-duration: 4.3s; }
.snowflake:nth-child(15) { left: 48%; animation-delay: 1.2s; animation-duration: 3.4s; }
.snowflake:nth-child(16) { left: 58%; animation-delay: 1.7s; animation-duration: 4.6s; }
.snowflake:nth-child(17) { left: 68%; animation-delay: 2.2s; animation-duration: 3.2s; }
.snowflake:nth-child(18) { left: 32%; animation-delay: 0.6s; animation-duration: 4.7s; }
.snowflake:nth-child(19) { left: 52%; animation-delay: 1.4s; animation-duration: 3.1s; }
.snowflake:nth-child(20) { left: 72%; animation-delay: 2.4s; animation-duration: 4.9s; }

@keyframes snow-fall {
  0% {
    top: 25%;
    opacity: 1;
    transform: translateX(0) rotate(0deg);
  }
  100% {
    top: 100%;
    opacity: 0.3;
    transform: translateX(30px) rotate(360deg);
  }
}
</style>
