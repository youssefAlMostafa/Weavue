<template>
  <div class="moon-container">
    <div class="stars">
      <div class="star" v-for="i in 20" :key="i"></div>
    </div>
    <div class="moon">
      <div class="crater crater-1"></div>
      <div class="crater crater-2"></div>
      <div class="crater crater-3"></div>
    </div>
  </div>
</template>

<style scoped>
.moon-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.stars {
  position: absolute;
  width: 100%;
  height: 100%;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
  animation: twinkle 3s infinite;
}

.star:nth-child(1) { top: 10%; left: 15%; animation-delay: 0s; }
.star:nth-child(2) { top: 25%; left: 30%; animation-delay: 0.3s; }
.star:nth-child(3) { top: 40%; left: 10%; animation-delay: 0.6s; }
.star:nth-child(4) { top: 15%; left: 80%; animation-delay: 0.9s; }
.star:nth-child(5) { top: 55%; left: 75%; animation-delay: 1.2s; }
.star:nth-child(6) { top: 70%; left: 20%; animation-delay: 1.5s; }
.star:nth-child(7) { top: 30%; left: 50%; animation-delay: 1.8s; }
.star:nth-child(8) { top: 60%; left: 60%; animation-delay: 2.1s; }
.star:nth-child(9) { top: 80%; left: 40%; animation-delay: 2.4s; }
.star:nth-child(10) { top: 20%; left: 65%; animation-delay: 2.7s; }
.star:nth-child(11) { top: 50%; left: 25%; animation-delay: 0.2s; }
.star:nth-child(12) { top: 75%; left: 70%; animation-delay: 0.5s; }
.star:nth-child(13) { top: 35%; left: 85%; animation-delay: 0.8s; }
.star:nth-child(14) { top: 65%; left: 35%; animation-delay: 1.1s; }
.star:nth-child(15) { top: 45%; left: 90%; animation-delay: 1.4s; }
.star:nth-child(16) { top: 85%; left: 55%; animation-delay: 1.7s; }
.star:nth-child(17) { top: 12%; left: 45%; animation-delay: 2s; }
.star:nth-child(18) { top: 55%; left: 5%; animation-delay: 2.3s; }
.star:nth-child(19) { top: 28%; left: 70%; animation-delay: 2.6s; }
.star:nth-child(20) { top: 72%; left: 12%; animation-delay: 2.9s; }

@keyframes twinkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.2; transform: scale(0.7); }
}

.moon {
  width: 160px;
  height: 160px;
  background: radial-gradient(circle at 35% 35%, #FFFEF0 0%, #E8E8D0 100%);
  border-radius: 50%;
  box-shadow: 0 0 60px rgba(255, 255, 240, 0.5);
  position: relative;
  z-index: 1;
}

.crater {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(200, 200, 180, 0.3), transparent);
}

.crater-1 {
  width: 30px;
  height: 30px;
  top: 30%;
  left: 25%;
}

.crater-2 {
  width: 20px;
  height: 20px;
  top: 50%;
  left: 60%;
}

.crater-3 {
  width: 25px;
  height: 25px;
  top: 65%;
  left: 35%;
}
</style>
