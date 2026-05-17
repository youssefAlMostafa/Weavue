<template>
  <div class="grid grid-cols-[1.5fr_1fr] gap-6 mb-7 max-[1180px]:grid-cols-1">
    <div class="relative border border-[var(--line)] rounded-[24px] overflow-hidden min-h-[520px] bg-[var(--paper)] animate-pulse py-9 px-[38px] flex flex-col">
      <div class="flex justify-between items-center">
        <div class="h-3 w-24 rounded-full bg-[var(--line)]" />
        <div class="h-3 w-32 rounded-full bg-[var(--line)]" />
      </div>
      <div class="flex flex-col gap-3 my-auto">
        <div class="h-20 w-72 rounded-2xl bg-[var(--line)]" />
        <div class="h-5 w-44 rounded-full bg-[var(--line)]" />
      </div>
      <div class="flex items-end gap-5 mt-6">
        <div class="h-36 w-52 rounded-2xl bg-[var(--line)]" />
        <div class="flex flex-col gap-2 pb-2">
          <div class="h-7 w-36 rounded-lg bg-[var(--line)]" />
          <div class="h-3 w-52 rounded-full bg-[var(--line)]" />
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-6">
      <div class="flex-1 bg-[var(--paper)] border border-[var(--line)] rounded-[24px] p-7 pb-6 animate-pulse">
        <div class="flex justify-between mb-[18px]">
          <div class="h-3 w-16 rounded-full bg-[var(--line)]" />
          <div class="h-3 w-32 rounded-full bg-[var(--line)]" />
        </div>
        <div class="grid grid-cols-2 gap-x-7 gap-y-[22px]">
          <div v-for="i in 4" :key="i" class="border-t border-[var(--line)] pt-[14px] flex flex-col gap-2">
            <div class="h-3 w-16 rounded-full bg-[var(--line)]" />
            <div class="h-8 w-20 rounded-lg bg-[var(--line)]" />
            <div class="h-3 w-12 rounded-full bg-[var(--line)]" />
          </div>
        </div>
      </div>

      <div class="bg-[var(--ink)] rounded-[24px] py-6 px-7 flex items-center gap-[22px] animate-pulse">
        <div class="w-[88px] h-9 rounded-lg bg-white/10" />
        <div class="flex flex-col gap-2">
          <div class="h-2 w-12 rounded-full bg-white/10" />
          <div class="h-4 w-16 rounded bg-white/10" />
        </div>
        <div class="flex flex-col gap-2">
          <div class="h-2 w-12 rounded-full bg-white/10" />
          <div class="h-4 w-16 rounded bg-white/10" />
        </div>
        <div class="ml-auto flex flex-col items-end gap-2">
          <div class="h-2 w-20 rounded-full bg-white/10" />
          <div class="h-5 w-16 rounded bg-white/10" />
        </div>
      </div>
    </div>
  </div>
</template>
