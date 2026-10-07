<script setup lang="ts">
type Stat = {
  label: string
  value: string
  fill: string
}

const stats: readonly Stat[] = [
  { label: "总访问量", value: "221,001", fill: "w-[73.7475%]" },
  { label: "独立访客", value: "101,994", fill: "w-[49.165%]" },
]
</script>

<template>
  <div class="group bg-bg shadow-shadow relative flex h-full w-full flex-col overflow-hidden rounded-2xl p-6 shadow-xs transition-all duration-600 hover:shadow-xl">
    <div class="mb-6 flex items-center justify-between">
      <div class="text-text1 text-lg font-bold">访问统计</div>
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        class="h-4 w-4"
      >
        <path
          fill="currentColor"
          d="M3 12h2v9H3zm16-4h2v13h-2zm-8-6h2v19h-2z"
        />
      </svg>
    </div>
    <div class="flex flex-col gap-6">
      <div v-for="stat in stats" :key="stat.label">
        <div class="mb-1 flex items-end justify-between">
          <span class="text-text2 text-sm font-bold">{{ stat.label }}</span>
          <span class="text-text1 text-base font-bold">{{ stat.value }}</span>
        </div>
        <div class="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
          <div :class="['bg-main h-full rounded-full', stat.fill]" />
        </div>
      </div>
    </div>
  </div>
</template>
