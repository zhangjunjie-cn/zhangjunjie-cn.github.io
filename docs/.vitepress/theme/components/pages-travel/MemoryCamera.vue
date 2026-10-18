<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

import { showGallery } from '../ImgViewer'
import { batteryIcon } from './batteryIcons'
import type { Memory } from './memories'
import { useBattery, useFps, useOnline, usePixelRatio } from './useViewfinder'

/**
 * The camera — the source's `MemoryPreview`, opened by clicking a memory card.
 *
 * The photo fills a 16:9 viewfinder inside a `.mockup-window`; the window's own
 * width is capped so that pane always fits the screen. The picture is laid out
 * across the viewfinder *plus* the 6rem thumbnail row underneath it, so a 16:9
 * one stops exactly at the strip while anything taller (4:3, portrait) runs on
 * into that row — centred and uncropped either way, and never up into the status
 * bar above. The title and caption sit centred on the viewfinder; the status bar
 * (link state + FPS, the memory's `createTime`, battery) is its own row above it
 * and the thumbnail strip its own row below, so those two bands frame the picture
 * instead of covering it — and each of them carries a blurred copy of that picture
 * as its own backdrop, so they read as acrylic (frosted glass) rather than flat
 * black. A control bar closes the window (device pixel ratio, the round shutter,
 * and a button back to the list).
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
 * The thumbnail strip only stands down for a clip taller than 16:9 — such a clip
 * already runs into the strip's own row, whereas a 16:9 one stops short of it and
 * leaves the strip up. When it does stand down the transparent play button follows
 * it 0.6s later. Moving the pointer into the viewfinder brings the button back for
 * another 0.6s, but merely hovering over the picture does not hold it up — and with
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
/** 当前画面比取景区（16:9）更高吗？更高的会摊进下面缩略图条那一行。 */
const tallMedia = ref(false)
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

/**
 * 缩略图条只在有得选（两张以上）时出现；比 16:9 更高的视频正在播时把它收起来 ——
 * 那种画面本来就摊进缩略图条那一行，让位给它。16:9 的视频播着也照样留着。
 */
const showStrip = computed(() => props.memories.length > 1 && !(playing.value && tallMedia.value))

/** 量一下画面自己的比例：比 16:9 窄（也就是更高）的会占到下面缩略图条那一行。 */
function measureMedia(width: number, height: number) {
  tallMedia.value = width > 0 && height > 0 && width / height < 16 / 9 - 0.01
}

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

/** 照片加载完：量一次它的比例，再把当前那张缩略图拉回视野中间（同源站）。 */
function onImageLoad(event: Event) {
  const image = event.target as HTMLImageElement
  measureMedia(image.naturalWidth, image.naturalHeight)
  scrollActiveThumb()
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
  measureMedia(el.videoWidth, el.videoHeight)
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
  <div class="mockup-window memory-camera-in mt-1 bg-[#e9e9e9a6] lg:mt-3 dark:bg-[#1a1a1aa6]">
    <div class="relative flex flex-col overflow-hidden">
      <!-- 状态栏：独立成行（h-10），不再压在画面上 —— 它和底下的缩略图条一起把画面夹在
           中间；两条边框各自垫着一层当前画面的模糊副本（亚克力 / 磨砂玻璃，见
           tailwind.css），于是它们成了照片 / 视频的「光影边框」。 -->
      <div class="memory-status-bar relative flex h-10 w-full shrink-0 items-center justify-between bg-white/60 text-white dark:bg-black/50">
        <!-- 亚克力：当前画面的模糊副本垫在底下，这条边框于是成了磨砂玻璃（见 tailwind.css）。 -->
        <img
          class="memory-acrylic-layer memory-acrylic-layer--top"
          :src="current.image"
          alt=""
          aria-hidden="true"
          referrerpolicy="no-referrer"
        />
        <div class="relative flex items-center gap-3 pl-3">
          <div class="h-3 w-3 rounded-full" :class="online ? 'flashing bg-green-500' : 'bg-red-600'" />
          {{ fps }} FPS
        </div>
        <div class="relative">{{ formatTime(current.createTime) }}</div>
        <div class="relative flex items-center gap-3 pr-3">
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

      <!-- 取景区：严格 16:9（宽 × 9/16），画面 / 标题 / 播放键都只在这个框里居中；
           上面是状态栏、下面是缩略图条，比 16:9 更高的画面只会往下摊进那一行（见 tailwind.css）。 -->
      <div
        class="memory-viewfinder relative w-full shrink-0"
        :class="{
          'memory-viewfinder--zoom': fullscreen === 'image',
          'memory-viewfinder--tall': tallMedia,
        }"
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
          class="not memory-viewfinder-img"
          :class="shooting ? 'blur-sm' : 'blur-none'"
          :src="current.image"
          :alt="current.title"
          referrerpolicy="no-referrer"
          @load="onImageLoad"
          @click="onFrameClick"
        />
        <!-- 标题统一停在取景区上方三分之一处：原来只有视频才升到 `top-1/3`
             （把正中间那格让给播放键），纯图片是正中间 `top-1/2`，两者差一截。
             `pointer-events-none` 让点击穿到画面。 -->
        <div class="pointer-events-none absolute top-2/5 w-full -translate-y-1/2 text-center text-white">
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

        <div v-if="shooting" class="animate-shutter absolute inset-0 bg-black" />
      </div>

      <!-- 缩略图条那独立的一行（6rem）：条自己绝对定位贴在这一行里，所以收起它
           （比 16:9 更高的视频在播放时）不会把底下的控制条顶上来；`v-show` 也保住滚动位置。
           淡出 + 下沉的短过渡见 `memory-strip-*`。 -->
      <div class="memory-thumb-row relative h-24 w-full shrink-0">
        <!-- 同上：下面这条边框里的亚克力层。缩略图本身（`z-20`）照旧压在它上面。 -->
        <img
          class="memory-acrylic-layer memory-acrylic-layer--bottom"
          :src="current.image"
          alt=""
          aria-hidden="true"
          referrerpolicy="no-referrer"
        />
        <Transition name="memory-strip">
          <div
            v-show="showStrip"
            ref="thumbnails"
            class="absolute bottom-0 left-0 z-20 flex h-full w-full items-center justify-center-safe gap-2 overflow-x-auto overflow-y-hidden border-b bg-white/60 px-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:bg-black/50"
            @wheel="onStripWheel"
          >
            <img
              v-for="(memory, i) in memories"
              :key="i"
              :src="memory.image"
              :alt="memory.title || (memory.video ? '视频' : '')"
              class="not memory-thumb h-16 max-h-16 min-h-16 w-16 min-w-16 max-w-16 cursor-pointer rounded"
              :class="index === i ? 'border-2 opacity-100' : 'opacity-70'"
              referrerpolicy="no-referrer"
              @click="select(i)"
            />
          </div>
        </Transition>
      </div>

      <!-- 底部控制条：独立一条实心灰黑，画面到它上边沿为止。 -->
      <div class="relative flex h-20 w-full shrink-0 items-center justify-center bg-neutral-900">
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
