<script setup lang="ts">
import { ref, onMounted } from 'vue'

const dateStr = ref('')

onMounted(() => {
  const now = new Date()
  const wd = now.toLocaleDateString('en-GB', { weekday: 'short' })
  const d  = now.toLocaleDateString('en-GB', { day: '2-digit' })
  const mo = now.toLocaleDateString('en-GB', { month: 'short' })
  const yr = now.getFullYear()
  dateStr.value = `${wd} · ${d} ${mo} · ${yr}`
})
</script>

<template>
  <header class="grid grid-cols-[1fr_auto_1fr] items-center px-1 pt-2 pb-4 border-b border-[var(--line)] mb-7">

    <!-- Brand -->
    <div class="flex items-baseline gap-[14px]">
      <span class="[font-family:var(--serif)] italic text-[52px] tracking-[-.01em] leading-none">
        Weavue<span class="inline-block w-2 h-2 rounded-full bg-[var(--sun)] translate-y-[-18px] ml-0.5"></span>
      </span>
      <span class="[font-family:var(--mono)] text-[14px] tracking-[.12em] uppercase text-[var(--muted)] pb-0.5 max-md:hidden">
        Atmosphere, observed
      </span>
    </div>

    <!-- Date -->
    <div class="justify-self-center [font-family:var(--mono)] text-[16px] tracking-[.14em] uppercase text-[var(--ink-2)] max-md:hidden">
      {{ dateStr }}
    </div>

    <!-- Links -->
    <div class="justify-self-end flex items-center gap-[18px] text-[18px] text-[var(--muted)]">
      <a
        href="https://linkedin.com/in/youssef-al-mostafa"
        target="_blank" rel="noopener"
        class="flex items-center gap-[6px] transition-colors duration-200 hover:text-[var(--ink)]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="w-4 h-4">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M8 10v8M8 7v.01M12 18v-5a3 3 0 0 1 6 0v5"/>
        </svg>
        <span class="max-sm:hidden">LinkedIn</span>
      </a>
      <a
        href="https://github.com/youssef-al-mostafa/Weavue"
        target="_blank" rel="noopener"
        class="flex items-center gap-[6px] transition-colors duration-200 hover:text-[var(--ink)]"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
          <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/>
        </svg>
        <span class="max-sm:hidden">GitHub</span>
      </a>
      <a
        href="https://linkedin.com/in/youssef-al-mostafa"
        target="_blank" rel="noopener"
        class="transition-colors duration-200 hover:text-[var(--ink)] max-sm:hidden"
      >Portfolio</a>
    </div>

  </header>
</template>
