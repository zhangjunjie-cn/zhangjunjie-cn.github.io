<script setup lang="ts">
import { onMounted, ref } from 'vue'

import type { Memory } from './memories'
import { useReveal } from '../useReveal'

/**
 * The memory grid — the source's `MemoryList`.
 *
 * Clicking a card opens the camera on that photo. Cards are revealed as they
 * scroll into view (see `useReveal`) instead of all animating on mount — a long
 * album gets a staggered "breathing" reveal rather than one flat burst.
 */
defineProps<{ memories: Memory[] }>()

const emit = defineEmits<{ viewMemory: [index: number] }>()

const root = ref<HTMLElement | null>(null)
const { refresh } = useReveal(() => root.value)
onMounted(() => refresh())
</script>

<template>
  <div ref="root" class="memory-list-container">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(memory, index) in memories"
        :key="memory.title"
        data-reveal
        class="memory-card cursor-pointer overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-lg"
        @click="emit('viewMemory', index)"
      >
        <div class="relative aspect-video overflow-hidden">
          <!-- `not` keeps Fancybox off it — a card click opens the camera, which
               owns the full-screen list itself (same marker as the deck's card). -->
          <!-- 外链图床（如 Gitee）按 Referer 防盗链，带上页面地址会被重定向成图标，
               所以统一不带 Referer 取图。 -->
          <img
            :src="memory.image"
            :alt="memory.title"
            class="not memory-card-image h-full w-full object-cover"
            loading="lazy"
            referrerpolicy="no-referrer"
          />
        </div>
        <div class="p-4">
          <h3 class="mb-1 truncate text-lg font-medium">{{ memory.title }}</h3>
          <p class="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{{ memory.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
