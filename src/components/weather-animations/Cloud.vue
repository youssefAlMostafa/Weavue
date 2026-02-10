<template>
  <div class="cloud-container">
    <div class="cloud">
      <div class="cloud-circle c1"></div>
      <div class="cloud-circle c2"></div>
      <div class="cloud-circle c3"></div>
      <div class="cloud-circle c4"></div>
      <div class="cloud-circle c5"></div>
    </div>
  </div>
</template>

<style scoped>
.cloud-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cloud {
  width: 350px;
  height: 140px;
  position: relative;
  animation: float-gentle 8s ease-in-out infinite;
}

.cloud-circle {
  position: absolute;
  background: linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 50%, #E0E0E0 100%);
  border-radius: 50%;
  filter: blur(1px);
}

.c1 {
  width: 140px;
  height: 140px;
  left: 0;
  top: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.c2 {
  width: 180px;
  height: 180px;
  left: 80px;
  top: 0;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
  z-index: 2;
}

.c3 {
  width: 160px;
  height: 160px;
  left: 190px;
  top: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.c4 {
  width: 120px;
  height: 120px;
  left: 50px;
  top: 50px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  z-index: 1;
}

.c5 {
  width: 100px;
  height: 100px;
  left: 240px;
  top: 60px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

@keyframes float-gentle {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.02);
  }
}
</style>
