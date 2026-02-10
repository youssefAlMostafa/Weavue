<template>
  <div class="sun-container">
    <div class="sun">
      <div class="sun-core"></div>
      <div class="sun-ray" v-for="i in 12" :key="i" :style="{ transform: `rotate(${i * 30}deg)` }"></div>
    </div>
  </div>
</template>

<style scoped>
.sun-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sun {
  width: 200px;
  height: 200px;
  position: relative;
  animation: rotate 20s linear infinite;
}

.sun-core {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, #FFD700 0%, #FFA500 100%);
  border-radius: 50%;
  box-shadow: 0 0 80px rgba(255, 215, 0, 0.8), 0 0 120px rgba(255, 165, 0, 0.4);
}

.sun-ray {
  position: absolute;
  width: 6px;
  height: 60px;
  background: linear-gradient(to bottom, rgba(255, 215, 0, 0.9), transparent);
  top: -70px;
  left: 50%;
  margin-left: -3px;
  border-radius: 3px;
  transform-origin: center 170px;
}

@keyframes rotate {
  to { transform: rotate(360deg); }
}
</style>
