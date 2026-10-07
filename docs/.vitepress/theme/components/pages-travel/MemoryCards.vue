<script setup lang="ts">
import { computed } from 'vue'

import type { Memory } from './memories'

/**
 * The card-deck carousel behind `<Swiper effect="cards">`.
 *
 * Swiper's cards effect stacks every slide on the same spot and fans them out
 * from the active one: step `d` away it translates by `8 % * d` horizontally,
 * `2 deg * d` around Z and `-100 px * d` back in Z, with the stack's shadows
 * fading in past half a step (`(|d| - .5) / .5`). Distance is clamped to four
 * steps, and the z-index is `count - |d|` so the active card is always on top.
 *
 * Clicking a card behind brings it forward; clicking the active one opens the
 * viewfinder. A video entry shows its poster with a play badge — it never
 * autoplays here, and its duration is deliberately not shown, because reading it
 * would make the browser fetch the clip's metadata.
 *
 * The active index is owned by the parent so closing the camera comes back to
 * the card it was opened from.
 */
const props = withDefaults(
  defineProps<{
    memories: Memory[]
    activeIndex: number
    /** Swiper's `loop` / `rewind` — both mean "keep going past the ends". */
    wrap?: boolean
  }>(),
  { wrap: false },
)

const emit = defineEmits<{ update: [index: number]; viewMemory: [index: number] }>()

/** Signed distance from the active card, taken the short way round when wrapping. */
function distance(index: number): number {
  const count = props.memories.length
  let d = index - props.activeIndex
  if (props.wrap && count > 2) {
    if (d > count / 2) d -= count
    else if (d < -count / 2) d += count
  }
  return d
}

const cards = computed(() =>
  props.memories.map((memory, index) => {
    const d = Math.min(Math.max(distance(index), -4), 4)
    const steps = Math.abs(d)
    return {
      memory,
      index,
      isActive: d === 0,
      isVideo: !!memory.video,
      label: memory.title || (memory.video ? '视频' : ''),
      style: {
        transform: `translate(-50%, 0) translate3d(${d * 8}%, 0, ${-100 * steps}px) rotateZ(${d * 2}deg)`,
        zIndex: String(props.memories.length - steps),
        opacity: steps >= 4 ? '0' : '1',
        pointerEvents: steps >= 4 ? 'none' : undefined,
      },
      /** `slideShadows` — Swiper only starts drawing the shadow past half a step. */
      shadow: Math.min(Math.max((steps - 0.5) / 0.5, 0), 1),
    }
  }),
)

function go(step: number) {
  const count = props.memories.length
  if (count === 0) return
  const next = props.activeIndex + step
  if (props.wrap) emit('update', ((next % count) + count) % count)
  else emit('update', Math.min(Math.max(next, 0), count - 1))
}
</script>

<template>
  <div class="memory-deck-wrap">
    <div class="memory-deck">
      <button
        v-for="card in cards"
        :key="card.index"
        type="button"
        class="memory-deck-card"
        :class="{ 'is-active': card.isActive }"
        :style="card.style"
        :aria-label="card.isActive ? `打开取景器：${card.label}` : `切到：${card.label}`"
        @click="card.isActive ? emit('viewMemory', card.index) : emit('update', card.index)"
      >
        <!-- `not` keeps Fancybox off it — the click opens the viewfinder instead. -->
        <img class="not" :src="card.memory.image" :alt="card.label" loading="lazy" />
        <span class="memory-deck-shadow" :style="{ opacity: card.shadow }" />
        <span v-if="card.isVideo" class="memory-deck-play" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5l11 7-11 7z" />
          </svg>
        </span>
      </button>
    </div>

    <div class="memory-deck-nav">
      <button type="button" class="memory-deck-arrow" aria-label="上一张" @click="go(-1)">
        <svg xmlns="http://www.w3.org/2000/svg" class="memory-deck-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <span class="memory-deck-counter">{{ activeIndex + 1 }} / {{ memories.length }}</span>
      <button type="button" class="memory-deck-arrow" aria-label="下一张" @click="go(1)">
        <svg xmlns="http://www.w3.org/2000/svg" class="memory-deck-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>
