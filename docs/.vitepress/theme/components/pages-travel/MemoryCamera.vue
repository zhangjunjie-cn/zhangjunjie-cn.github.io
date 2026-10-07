<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

import { showGallery } from '../ImgViewer'
import { batteryIcon } from './batteryIcons'
import type { Memory } from './memories'
import { useBattery, useFps, useOnline, usePixelRatio } from './useViewfinder'

/**
 * The camera — the source's `MemoryPreview`, opened by clicking a memory card.
 *
 * The photo fills an 86vh viewfinder inside a `.mockup-window`; the title and
 * caption sit centred on it, a status bar runs along the top (link state + FPS,
 * the memory's `createTime`, battery) and a control bar along the bottom
 * (device pixel ratio, the round shutter, and a button back to the list).
 *
 * The shutter is the whole point: `shoot()` swaps in the next photo, drops a
 * black frame over the viewfinder (`animate-shutter`) and blurs the image for
 * 500ms, then plays the source's own `kaca.mp3`.
 *
 * A memory that carries a `video` plays in the same viewfinder — the source has
 * nothing like this. The shutter keeps its one meaning there too: `shoot()` cuts
 * to the next memory with the same curtain, blur and `kaca.mp3` as a photo does.
 * Playback is driven by the transparent button in the middle of the clip instead,
 * which is also the read-out for its state (▶ paused / ⏸ playing).
 *
 * Only ever one `<video>` is mounted, and it is paused and rewound the moment
 * the viewfinder moves on or closes — otherwise the sound would keep playing
 * behind the list, which is the classic bug in this kind of component.
 *
 * While the clip plays, nothing is laid over the picture: the thumbnail strip
 * fades out and the transparent play button follows it 0.6s later. Moving the
 * pointer into the viewfinder brings the button back for another 0.6s, but
 * merely hovering over the picture does not hold it up — and with
 * `fullscreen="button"` a click anywhere on the frame is the play / pause
 * switch, so hiding the button never strands the clip. Both return as soon as
 * playback pauses or ends.
 */
const props = withDefaults(
  defineProps<{
    memories: Memory[]
    currentIndex: number
    /**
     * How the full-screen viewer is reached. `image` (the default) is a click on
     * the frame itself; `button` makes the frame inert and puts a magnifier in
     * the control bar, next to the close button — a note asks for it with
     * `fullscreen="button"`.
     */
    fullscreen?: 'image' | 'button'
  }>(),
  { fullscreen: 'image' },
)

const emit = defineEmits<{
  select: [index: number]
  changeIndex: [index: number]
  close: [index: number]
}>()

const { charging, level } = useBattery()
const { fps } = useFps()
const { online } = useOnline()
const { pixelRatio } = usePixelRatio()

const index = ref(props.currentIndex || 0)
const shooting = ref(false)
const thumbnails = ref<HTMLElement | null>(null)
const videoEl = ref<HTMLVideoElement | null>(null)
const playing = ref(false)
const muted = ref(false)
const progress = ref(0)
/** 播放中把中间的播放键让出去，1s 没有动静就淡出。 */
const controlsVisible = ref(true)

let audio: HTMLAudioElement | null = null
let controlsTimer: number | null = null

/** 显示播放键并重新计时；之后仍在播放才把它收起。 */
function revealControls() {
  controlsVisible.value = true
  if (controlsTimer !== null) window.clearTimeout(controlsTimer)
  controlsTimer = window.setTimeout(() => {
    controlsTimer = null
    if (playing.value) controlsVisible.value = false
  }, 600)
}

watch(playing, (value) => {
  if (value) {
    revealControls()
  } else {
    if (controlsTimer !== null) window.clearTimeout(controlsTimer)
    controlsTimer = null
    controlsVisible.value = true
  }
})

watch(
  () => props.currentIndex,
  (value) => {
    index.value = value
  },
)

const current = computed(() => props.memories[index.value])
const isVideo = computed(() => !!current.value?.video)

function select(next: number) {
  index.value = next
  emit('changeIndex', next)
  const strip = thumbnails.value
  strip?.children[next]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
}

function shoot() {
  shooting.value = true
  audio?.load()
  select((index.value + 1) % props.memories.length)
  audio?.play()
  window.setTimeout(() => {
    shooting.value = false
  }, 500)
  emit('select', index.value)
}

function close() {
  emit('close', index.value)
}

/**
 * Clicking the photo (or the clip) hands the whole list to Fancybox, so the
 * photos can be zoomed and the clip played full-screen, with the viewfinder's
 * own controls left alone. Under `fullscreen="button"` the frame is inert and
 * only the magnifier in the control bar gets here.
 */
function openFullscreen() {
  void showGallery(
    props.memories.map((memory) => ({
      src: memory.video ?? memory.image,
      poster: memory.video ? memory.image : undefined,
      caption: memory.title,
    })),
    index.value,
  )
}

/**
 * `fullscreen="image"`: the frame opens the whole list in Fancybox.
 * `fullscreen="button"`: the frame has no other job, so it plays / pauses the
 * clip — otherwise hiding the button during playback would leave no way to stop
 * it. The button is revealed on the way so the state change is visible.
 */
function onFrameClick() {
  if (props.fullscreen === 'image') {
    openFullscreen()
    return
  }
  if (!isVideo.value) return
  revealControls()
  void toggleVideo()
}

/** The video's own control, sitting in the middle of the clip. */
async function toggleVideo() {
  const el = videoEl.value
  if (!el) return
  if (el.paused) {
    try {
      await el.play()
    } catch {
      /* autoplay refused — pressing the shutter again after the click will work */
    }
  } else {
    el.pause()
  }
}

/** Stops and rewinds the clip. Runs before the DOM swaps, so `videoEl` is still the old node. */
function stopVideo() {
  const el = videoEl.value
  if (!el) return
  el.pause()
  el.currentTime = 0
  progress.value = 0
}

/** The source does the same on every image load, so the active thumb stays in view. */
function scrollActiveThumb() {
  const strip = thumbnails.value
  if (!strip || props.memories.length === 0) return
  strip.children[Math.min(index.value, props.memories.length - 1)]?.scrollIntoView({
    block: 'nearest',
    inline: 'center',
  })
}

/**
 * The strip only scrolls sideways, so a plain wheel over it does nothing. Map the
 * wheel onto `scrollLeft` — but hand the event back to the page once the strip
 * has reached the end it is heading for, so hovering the thumbnails can never
 * trap the page scroll.
 */
function onStripWheel(event: WheelEvent) {
  const strip = event.currentTarget as HTMLElement | null
  if (!strip) return
  const max = strip.scrollWidth - strip.clientWidth
  if (max <= 0) return
  const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX
  if (delta === 0) return
  if (delta < 0 ? strip.scrollLeft <= 0 : strip.scrollLeft >= max - 1) return
  strip.scrollLeft = Math.min(max, Math.max(0, strip.scrollLeft + delta))
  event.preventDefault()
}

function onVideoReady() {
  scrollActiveThumb()
  const el = videoEl.value
  if (!el) return
  el.muted = muted.value
  el.play().catch(() => {
    /* left paused; the shutter shows ▶ */
  })
}

function onTimeUpdate() {
  const el = videoEl.value
  if (!el || !el.duration) return
  progress.value = el.currentTime / el.duration
}

function onEnded() {
  const el = videoEl.value
  if (el) el.currentTime = 0
  progress.value = 0
}

/** `2026:04:05 00:00:00` → `2026-04-05 00:00:00`. */
function formatTime(value: string): string {
  if (!value) return '--:--:--'
  const [date, time] = value.split(' ')
  return `${date.replace(/:/g, '-')} ${time}`
}

watch(index, () => {
  stopVideo()
})

watch(muted, (value) => {
  if (videoEl.value) videoEl.value.muted = value
})

onMounted(() => {
  // The source's own shutter sound, downloaded from /assets/kaca.mp3.
  audio = new Audio('/sites/leelaa-cn-62375921/nostalgia-2d04b5ee/audio/kaca.mp3')
})

onUnmounted(() => {
  stopVideo()
  if (controlsTimer !== null) window.clearTimeout(controlsTimer)
})
</script>

<template>
  <div class="mockup-window mt-1 bg-[#e9e9e9a6] lg:mt-3 dark:bg-[#1a1a1aa6]">
    <div class="relative flex h-[86vh] flex-col overflow-hidden">
      <!-- 取景区：整块减去底部 5rem 控制条，画面 / 标题 / 播放键都只在这个框里居中。 -->
      <div
        class="relative h-[calc(100%-5rem)] w-full"
        :class="{ 'memory-viewfinder--zoom': fullscreen === 'image' }"
        @mouseenter="revealControls"
      >
        <video
          v-if="isVideo"
          ref="videoEl"
          class="memory-viewfinder-video"
          :class="shooting ? 'blur-sm' : 'blur-none'"
          :src="current.video"
          :poster="current.image"
          preload="metadata"
          playsinline
          :aria-label="current.title || '视频'"
          @loadedmetadata="onVideoReady"
          @timeupdate="onTimeUpdate"
          @play="playing = true"
          @pause="playing = false"
          @ended="onEnded"
          @click="onFrameClick"
        />
        <!-- `not` keeps Fancybox off it — this photo opens the whole list itself. -->
        <img
          v-else
          class="not memory-viewfinder-img h-full w-full object-cover"
          :class="shooting ? 'blur-sm' : 'blur-none'"
          :src="current.image"
          :alt="current.title"
          @load="scrollActiveThumb"
          @click="onFrameClick"
        />
        <!-- 视频的标题往上让一让，把正中间留给播放键；`pointer-events-none` 让点击穿到画面。 -->
        <div
          class="pointer-events-none absolute w-full -translate-y-1/2 text-center text-white"
          :class="isVideo ? 'top-1/3' : 'top-1/2'"
        >
          <h1 class="text-3xl font-bold">{{ current.title }}</h1>
          <h3 class="mt-2 tracking-wider">{{ current.description }}</h3>
        </div>

        <!-- 透明背景的播放 / 暂停：只留图标，靠投影保证在亮画面上也看得清。 -->
        <button
          v-if="isVideo"
          type="button"
          class="memory-video-play"
          :class="{ 'is-hidden': !controlsVisible }"
          :aria-label="playing ? '暂停' : '播放'"
          @click="toggleVideo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path v-if="playing" d="M7 4h4v16H7zM13 4h4v16h-4z" />
            <path v-else d="M8 4l13 8-13 8z" />
          </svg>
        </button>

        <div class="absolute top-0 flex h-10 w-full items-center justify-between bg-black/50 text-white">
          <div class="flex items-center gap-3 pl-3">
            <div class="h-3 w-3 rounded-full" :class="online ? 'flashing bg-green-500' : 'bg-red-600'" />
            {{ fps }} FPS
          </div>
          <div>{{ formatTime(current.createTime) }}</div>
          <div class="flex items-center gap-3 pr-3">
            <button
              v-if="isVideo"
              type="button"
              class="flex h-6 w-6 items-center justify-center"
              :aria-label="muted ? '取消静音' : '静音'"
              @click="muted = !muted"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 4V5L7 9H3z" />
                <path v-if="!muted" d="M14.5 12a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 14.5 12z" />
                <path
                  v-else
                  d="M15.5 9.5l5 5m0-5l-5 5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <img class="h-6 w-10" :src="batteryIcon(level, charging)" :alt="`电量${level}`" />
          </div>
        </div>

        <div v-if="shooting" class="animate-shutter absolute inset-0 bg-black" />

        <!-- 播放时把整条让给画面，播完（或暂停）再回来；`v-show` 保住滚动位置，
             淡出 + 下沉的短过渡见 `memory-strip-*`。贴在取景区下沿，控制条在它下面另起一条。 -->
        <Transition name="memory-strip">
          <div
            v-show="memories.length > 1 && !playing"
            ref="thumbnails"
            class="absolute bottom-0 left-0 z-20 flex h-24 w-full items-center justify-start gap-2 overflow-x-auto overflow-y-hidden border-b bg-black/50 px-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            @wheel="onStripWheel"
          >
            <img
              v-for="(memory, i) in memories"
              :key="i"
              :src="memory.image"
              :alt="memory.title || (memory.video ? '视频' : '')"
              class="not memory-thumb h-16 max-h-16 min-h-16 w-16 min-w-16 max-w-16 cursor-pointer rounded"
              :class="index === i ? 'border-2 opacity-100' : 'opacity-50'"
              @click="select(i)"
            />
          </div>
        </Transition>
      </div>

      <!-- 底部控制条：独立一条实心灰黑，画面到它上边沿为止。 -->
      <div class="relative flex h-20 w-full items-center justify-center bg-neutral-900">
        <div v-if="isVideo" class="memory-video-progress">
          <div class="memory-video-progress__bar" :style="{ width: `${progress * 100}%` }" />
        </div>
        <div class="absolute left-3 flex items-center justify-center">
          <div class="ml-2 flex min-w-20 justify-center rounded-full border px-2 py-1 text-white">
            f {{ pixelRatio.toFixed(2) }}
          </div>
        </div>
        <button
          type="button"
          class="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white"
          aria-label="拍照切换下一张"
          @click="shoot"
        >
          <div
            class="m-1 min-h-10 min-w-10 rounded-full bg-white transition-opacity duration-400"
            :class="{ 'opacity-0': shooting }"
          />
        </button>
        <!-- 画面本身不响应点击时，全屏入口挪到这里，紧挨着关闭按钮。 -->
        <button
          v-if="fullscreen === 'button'"
          type="button"
          class="absolute right-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/30"
          aria-label="全屏查看"
          @click="openFullscreen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
          >
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="M15.4 15.4L21 21" />
          </svg>
        </button>
        <button
          type="button"
          class="absolute right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/30"
          aria-label="切换或关闭"
          @click="close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
