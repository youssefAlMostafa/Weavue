<template>
  <footer class="mt-12 pt-7 border-t border-[var(--line)] grid grid-cols-[1fr_auto_1fr] gap-6 items-center text-[13px] text-[var(--muted)]">

    <!-- Left: credit -->
    <div class="flex items-center gap-2">
      Designed & built by
      <span class="[font-family:var(--serif)] italic text-[var(--ink)] text-[15px] font-normal">Youssef Mostafa</span>
    </div>

    <!-- Center: tech stack -->
    <div class="flex items-center gap-[14px] [font-family:var(--mono)] text-[11px] tracking-[.14em] uppercase">
      <span>Vue</span>
      <span class="text-[var(--line)]">·</span>
      <span>Tailwind</span>
      <span class="text-[var(--line)]">·</span>
      <span>WeatherAPI</span>
    </div>

    <!-- Right: links -->
    <div class="justify-self-end flex gap-[18px] items-center">
      <a
        href="mailto:youssefalmostafa2@gmail.com"
        class="text-[var(--ink-2)] hover:text-[var(--ink)] hover:underline transition-colors"
      >youssefalmostafa2@gmail.com</a>
      <a
        href="https://github.com/youssef-al-mostafa/Weavue"
        target="_blank"
        rel="noopener"
        class="text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors"
      >↗ source</a>
    </div>

  </footer>
</template>
