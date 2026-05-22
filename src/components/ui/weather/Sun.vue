<template>
  <svg
    class="absolute right-[-30px] top-[30px] w-[340px] h-[340px] z-[1] pointer-events-none"
    viewBox="0 0 200 200" fill="none" aria-hidden="true">
    <defs>
      <radialGradient id="heroSunG" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fff3cf"/>
        <stop offset="60%" stop-color="#f4b977"/>
        <stop offset="100%" stop-color="#e8642e" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="100" cy="100" r="58" fill="url(#heroSunG)"/>
    <circle cx="100" cy="100" r="34" fill="#f4b977" opacity=".9"/>
    <g stroke="#e8642e" stroke-width="2" stroke-linecap="round" opacity=".55">
      <line x1="100" y1="20"  x2="100" y2="36"/>
      <line x1="100" y1="164" x2="100" y2="180"/>
      <line x1="20"  y1="100" x2="36"  y2="100"/>
      <line x1="164" y1="100" x2="180" y2="100"/>
      <line x1="44"  y1="44"  x2="56"  y2="56"/>
      <line x1="144" y1="144" x2="156" y2="156"/>
      <line x1="44"  y1="156" x2="56"  y2="144"/>
      <line x1="144" y1="56"  x2="156" y2="44"/>
    </g>
  </svg>
</template>
