<script setup lang="ts">
import { computed } from 'vue'

import MemoryGallery from './MemoryGallery.vue'
import { type Memory, type Weather } from './memories'

/**
 * One entry of `<Swiper :items>`. A bare string is an image; an object is used
 * when the entry needs to be something else, or needs its own captions.
 */
interface SwiperItem {
  type: 'image' | 'video'
  src: string
  /** Video only — the still shown in the deck and under the player. */
  poster?: string
  title?: string
  description?: string
  createTime?: string
}

/**
 * The markdown-facing entry point for a photo gallery, modelled on Teek's
 * global `<Swiper>` so a note can list its own local media inline:
 *
 * ```md
 * <Swiper
 *   :items="[
 *     '/images/a.jpg',
 *     { type: 'video', src: '/video/clip.mp4', poster: '/images/a.jpg', title: '…' },
 *   ]"
 *   effect="cards" loop="true" rewind="true"
 *   title="时光与记忆" subtitle="…" status="持续更新中..." weather="petal"
 * />
 * ```
 *
 * A bare string is the shorthand for an image whose captions are not needed
 * (or that will be captioned later); an object carries them itself. There is no
 * shared lookup table any more — the note is the single source of truth, so
 * write the `title` / `description` / `createTime` you want to see.
 *
 * `variant` picks what is rendered: `cards` (the default) is the swiper deck,
 * `grid` is the source's own 3-column photo wall — so a note can drive either
 * page from its own markup.
 *
 * Only swiper's `cards` effect is implemented — any other `effect` still renders
 * the deck. `loop` and `rewind` both mean "wrap past the ends", which is the
 * difference that matters here.
 */
const props = withDefaults(
  defineProps<{
    items: (string | SwiperItem)[]
    effect?: 'cards'
    loop?: boolean
    rewind?: boolean
    /** `grid` renders the source's photo wall; `cards` (default) the deck. */
    variant?: 'grid' | 'cards'
    /** `button` 时画面不响应点击，全屏改由取景器底栏的放大镜触发。 */
    fullscreen?: 'image' | 'button'
    /** 首屏横幅的标题 / 小字 / 状态；不写就是源站那套「时光与记忆…」。 */
    title?: string
    subtitle?: string
    status?: string
    /** 横幅背后的粒子：snow 下雪（默认）/ sun 阳光 / leaf 树叶 / petal 花瓣 /
     *  wind 风 / none 不要。 */
    weather?: Weather
  }>(),
  { effect: 'cards', loop: false, rewind: false, variant: 'cards', fullscreen: 'image' },
)

/** A bare-string entry: the image alone, with no captions written for it. */
function blank(image: string): Memory {
  return { title: '', description: '', createTime: '', image }
}

const list = computed<Memory[]>(() =>
  props.items.map((item) => {
    if (typeof item === 'string') return blank(item)
    return {
      title: item.title ?? '',
      description: item.description ?? '',
      createTime: item.createTime ?? '',
      image: (item.type === 'video' ? item.poster : item.src) ?? '',
      video: item.type === 'video' ? item.src : undefined,
    }
  }),
)
</script>

<template>
  <MemoryGallery
    :memories="list"
    :variant="variant"
    :wrap="loop || rewind"
    :fullscreen="fullscreen"
    :title="title"
    :subtitle="subtitle"
    :status="status"
    :weather="weather"
  />
</template>
