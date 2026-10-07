<script setup lang="ts">
import type { Memory } from './memories'

/**
 * The memory grid — the source's `MemoryList`.
 *
 * Clicking a card opens the camera on that photo. The stagger is the source's
 * exact expression, `min(index × 0.05, 0.5)s`, so it caps at half a second
 * instead of growing without bound down the list.
 */
defineProps<{ memories: Memory[] }>()

const emit = defineEmits<{ viewMemory: [index: number] }>()
</script>

<template>
  <div class="memory-list-container">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(memory, index) in memories"
        :key="memory.title"
        class="memory-card animate-fade-in-up cursor-pointer overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-lg"
        :style="{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }"
        @click="emit('viewMemory', index)"
      >
        <div class="relative aspect-video overflow-hidden">
          <!-- `not` keeps Fancybox off it — a card click opens the camera, which
               owns the full-screen list itself (same marker as the deck's card). -->
          <img
            :src="memory.image"
            :alt="memory.title"
            class="not memory-card-image h-full w-full object-cover"
            loading="lazy"
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
