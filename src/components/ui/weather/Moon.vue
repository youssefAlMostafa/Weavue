<template>
  <svg
    class="absolute right-[-10px] top-[20px] w-[180px] h-[180px] md:w-[260px] md:h-[260px] lg:w-[340px] lg:h-[340px] lg:right-[-30px] lg:top-[30px] z-[1] pointer-events-none"
    viewBox="0 0 200 200" fill="none" aria-hidden="true">
    <defs>
      <radialGradient id="heroMoonAmbient" cx="38%" cy="50%" r="50%">
        <stop offset="0%"   stop-color="#eef4ff" stop-opacity=".55"/>
        <stop offset="100%" stop-color="#4b6c8a" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="heroMoonG" cx="36%" cy="50%" r="58%">
        <stop offset="0%"   stop-color="#ffffff"/>
        <stop offset="35%"  stop-color="#eef4ff"/>
        <stop offset="70%"  stop-color="#8aaad4"/>
        <stop offset="100%" stop-color="#4b6c8a" stop-opacity="0"/>
      </radialGradient>
      <mask id="crescentMask">
        <circle cx="100" cy="100" r="60" fill="white"/>
        <circle cx="126" cy="93"  r="51" fill="black"/>
      </mask>
    </defs>
    <!-- unmasked ambient glow for brightness -->
    <circle cx="100" cy="100" r="82" fill="url(#heroMoonAmbient)"/>
    <!-- crescent disc + inner glow, both clipped -->
    <g mask="url(#crescentMask)">
      <circle cx="100" cy="100" r="82" fill="url(#heroMoonG)"/>
      <circle cx="100" cy="100" r="60" fill="#c8d8f0" opacity=".85"/>
    </g>
  </svg>
</template>
