<template>
  <svg
    class="absolute right-[-30px] top-[30px] w-[340px] h-[340px] z-[1] pointer-events-none"
    viewBox="0 0 200 200" fill="none" aria-hidden="true">
    <defs>
      <radialGradient id="heroMoonG" cx="38%" cy="38%" r="55%">
        <stop offset="0%" stop-color="#eef4ff"/>
        <stop offset="55%" stop-color="#c8d8f0"/>
        <stop offset="100%" stop-color="#8aaad4" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <!-- crescent: full circle minus an offset mask circle -->
    <circle cx="100" cy="100" r="46" fill="url(#heroMoonG)"/>
    <circle cx="120" cy="88" r="38" fill="#2c3e5a"/>

    <!-- stars -->
    <circle cx="52"  cy="58"  r="2.2" fill="#c8d8f0" opacity=".9"/>
    <circle cx="38"  cy="90"  r="1.5" fill="#c8d8f0" opacity=".7"/>
    <circle cx="68"  cy="38"  r="1.8" fill="#eef4ff" opacity=".85"/>
    <circle cx="30"  cy="62"  r="1.2" fill="#c8d8f0" opacity=".6"/>
    <circle cx="82"  cy="52"  r="1.4" fill="#eef4ff" opacity=".75"/>
    <circle cx="44"  cy="120" r="1.6" fill="#c8d8f0" opacity=".65"/>
    <circle cx="62"  cy="148" r="1.3" fill="#eef4ff" opacity=".6"/>
    <circle cx="28"  cy="140" r="1.0" fill="#c8d8f0" opacity=".5"/>
  </svg>
</template>
