<template>
  <footer class="mt-12 pt-7 border-t border-[var(--line)] text-[13px] text-[var(--muted)]
                 flex flex-col gap-4
                 md:grid md:grid-cols-[1fr_1fr] md:gap-6 md:items-center">
    <div class="flex items-center gap-2 justify-center md:justify-self-start">
      Designed & built by
      <span class="[font-family:var(--serif)] italic text-[var(--ink)] text-[15px] font-normal">Youssef Mostafa</span>
    </div>

    <div class="md:justify-self-end justify-center flex flex-wrap gap-x-[18px] gap-y-2 items-center">
      <a href="mailto:youssefalmostafa2@gmail.com"
        class="text-[var(--ink-2)] hover:text-[var(--ink)] hover:underline transition-colors break-all">youssefalmostafa2@gmail.com</a>
      <a href="https://github.com/youssef-al-mostafa/Weavue" target="_blank" rel="noopener"
        class="text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors shrink-0">source code</a>
    </div>
  </footer>
</template>
