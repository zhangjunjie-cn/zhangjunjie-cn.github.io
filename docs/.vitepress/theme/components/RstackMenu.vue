<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * 复刻 rspress.rs 导航栏最左侧那个「Rstack 窗口」。
 *
 * 原站的三段结构都照搬过来了：
 *   1. `.wrapper-u2FzAf` —— 36×36 的圆形按钮，悬浮换底色，里面是 20×20 的点阵图标；
 *   2. `.root-nhoLZk`   —— 按钮外面那层，右侧带一条 24px 高的竖分隔线；
 *   3. 弹层 —— antd Popover（placement bottomLeft、无箭头），内容是一行
 *      「Rstack」品牌头 + 十个工具卡片（240px 宽、两列、悬浮换底色）。
 *
 * 原站用的是 antd Popover、默认 trigger 是 hover，这里保持一致：鼠标移入按钮后按
 * antd 默认的 `mouseEnterDelay`（0.1s）延迟弹出，移出 150ms 后收起（对齐
 * `mouseLeaveDelay`）；触屏没有 hover，退回点击开合（点击不走延迟）。
 * 另外补了 Esc / 点击外部关闭。样式全部在 `styles/tailwind.css` 的「Rstack 弹层」段。
 *
 * 弹层用 `Teleport` 挂到 body 上 —— 原站的 antd Popover 也是挂在 body、按文档坐标定位，
 * 并且在 window 的每个 scroll 事件里直接重新对齐（`@rc-component/trigger` 没有节流），
 * 所以滚动时它会先跟着页面上移、下一帧又被拉回按钮下方，看着就是「跟着滚轮轻轻抖一下」。
 * 这里用同样的机制复刻，对齐合并进 rAF（见下方的 `measure` / `onScroll`）。
 */

/** 工具清单照搬原站弹层里的配置（`sq`/`8r` 分片里的那份 JSON）。 */
interface Tool {
  name: string
  desc: string
  logo: string
  url: string
  /** 个别 logo 在原站带缩放（`logoScale`），照抄以免大小不齐。 */
  scale?: number
}

const TOOLS: Tool[] = [
  {
    name: 'Rspack',
    desc: '打包工具',
    logo: 'https://assets.rspack.rs/rspack/rspack-logo.svg',
    url: 'https://rspack.rs',
  },
  {
    name: 'Rsbuild',
    desc: '构建工具',
    logo: 'https://assets.rspack.rs/rsbuild/rsbuild-logo.svg',
    url: 'https://rsbuild.rs',
  },
  {
    name: 'Rspress',
    desc: '静态站点生成器',
    logo: 'https://assets.rspack.rs/rspress/rspress-logo-480x480.png',
    url: 'https://rspress.rs',
  },
  {
    name: 'Rslib',
    desc: '库开发工具',
    logo: 'https://assets.rspack.rs/rslib/rslib-logo.svg',
    url: 'https://rslib.rs',
  },
  {
    name: 'Rsdoctor',
    desc: '构建分析工具',
    logo: 'https://assets.rspack.rs/rsdoctor/rsdoctor-logo-480x480.png',
    url: 'https://rsdoctor.rs',
    scale: 0.95,
  },
  {
    name: 'Rstest',
    desc: '测试框架',
    logo: 'https://assets.rspack.rs/rstest/rstest-logo.svg',
    url: 'https://rstest.rs/',
    scale: 0.95,
  },
  {
    name: 'Rslint',
    desc: '代码检查工具',
    logo: 'https://assets.rspack.rs/rslint/rslint-logo.svg',
    url: 'https://rslint.rs/',
    scale: 0.95,
  },
  {
    name: 'Rstack CLI',
    desc: '统一命令行工具',
    logo: 'https://assets.rspack.rs/rspack/rspack-claw-logo.svg',
    url: 'https://rstack.rs/',
    scale: 0.7,
  },
  {
    name: 'Awesome Rstack',
    desc: '探索 Rstack 生态',
    logo: 'https://assets.rspack.rs/others/assets/awesome-rspack.png',
    url: 'https://github.com/web-infra-dev/awesome-rstack',
  },
  {
    name: 'Agent Skills',
    desc: 'Coding Agents 技能',
    logo: 'https://assets.rspack.rs/others/assets/awesome-rspack.png',
    url: 'https://github.com/rstackjs/agent-skills',
  },
]

const open = ref(false)
const root = ref<HTMLElement | null>(null)
/** 弹层被 teleport 到 body 上 —— 原站 antd Popover 也是挂在 body。
    这样它就不再是 `.rp-stack` 的后代，所以要单独拿引用判断点击是否落在弹层里。 */
const panel = ref<HTMLElement | null>(null)
/** 弹层用「文档坐标」定位：导航栏是 fixed 的，滚动后按钮的视口位置不变、
    文档位置却会变，所以量出来的 rect 要补上 scrollY / scrollX。 */
const panelStyle = ref<{ top: string; left: string }>({ top: '0px', left: '0px' })

/** 桌面靠 hover 开合（原站就是 antd Popover 的默认 hover 触发）；触屏没有 hover，退回点击开合。 */
let hoverCapable = true
if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
  hoverCapable = window.matchMedia('(hover: hover)').matches
}

let openTimer: number | undefined
let closeTimer: number | undefined
let alignFrame: number | undefined

/** 量一次按钮位置，写到弹层的 top / left 上（按钮下方 12px、左对齐）。 */
function measure() {
  const el = root.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  panelStyle.value = {
    top: `${rect.bottom + 12 + window.scrollY}px`,
    left: `${rect.left + window.scrollX}px`,
  }
}

/** 原站 antd Tooltip 的默认 `mouseEnterDelay` 是 0.1s（bundle 里 `J = D ?? G ?? .1`），
    所以悬停之后弹层不会立刻冒出来、会先等一小下 —— 就是「有点延迟」的那一下。
    动画本身的时长仍是 0.1s（站点种子 token `motionUnit: .1, motionBase: 0`）。 */
const OPEN_DELAY = 100

/** 立刻弹出。鼠标从按钮挪到弹层上走这条：不能重新计时，否则会闪一下。 */
function openNow() {
  window.clearTimeout(openTimer)
  window.clearTimeout(closeTimer)
  measure()
  open.value = true
}

/** 悬停按钮：照原站先等 `OPEN_DELAY` 再弹。 */
function scheduleOpen() {
  window.clearTimeout(openTimer)
  window.clearTimeout(closeTimer)
  if (open.value) return
  openTimer = window.setTimeout(() => {
    measure()
    open.value = true
  }, OPEN_DELAY)
}

/** 收起前留一点宽限：按钮和弹层之间隔着 12px 空隙，指针穿过时两个元素都不在上边；
    原站 antd 的 `mouseLeaveDelay` 是 0.1s，这里取 150ms 接住这段空隙。 */
function scheduleClose() {
  if (!hoverCapable) return
  // 还没弹出就移开了：把这次打开计划也撤掉，不然弹层会「迟到」冒出来。
  window.clearTimeout(openTimer)
  window.clearTimeout(closeTimer)
  closeTimer = window.setTimeout(() => {
    open.value = false
  }, 150)
}

/** 滚动时的对齐节奏照原站来：原站（`@rc-component/trigger`）是在 window 的 scroll
    事件里**直接**重新对齐、不做任何节流，所以弹层每帧都被拉回按钮下方，位移很小，
    看着就是「跟着滚轮轻轻抖一下」。之前用 50ms 节流，一次要追好几帧的位移、
    回位又是硬跳，才会显得卡顿。这里改成 rAF —— 同一帧内的多次滚动事件只对齐一次
    （一个事件里重复量位置会强制多次布局，反而更卡）。 */
function onScroll() {
  if (!open.value || alignFrame !== undefined) return
  alignFrame = window.requestAnimationFrame(() => {
    alignFrame = undefined
    measure()
  })
}

function onTriggerClick() {
  // 桌面交给 hover，点击不参与开合，避免「悬停打开后一点就关」。
  if (hoverCapable) return
  if (open.value) open.value = false
  else openNow()
}

function onPointerDown(event: Event) {
  if (!open.value) return
  const target = event.target
  if (!(target instanceof Node)) return
  if (root.value?.contains(target) || panel.value?.contains(target)) return
  open.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('keydown', onKeydown)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', measure)
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', measure)
  window.clearTimeout(openTimer)
  window.clearTimeout(closeTimer)
  if (alignFrame !== undefined) window.cancelAnimationFrame(alignFrame)
})
</script>

<template>
  <div ref="root" class="rp-stack" @mouseenter="scheduleOpen" @mouseleave="scheduleClose">
    <button
      type="button"
      class="rp-stack__trigger"
      aria-label="Rstack"
      :aria-expanded="open"
      @click.stop.prevent="onTriggerClick"
    >
      <svg width="20" height="20" fill="none" aria-hidden="true">
        <path
          fill="currentColor"
          d="M2.5 5H5V2.5H2.5V5zM5 11.25H2.5v-2.5H5v2.5zm12.5 0H15v-2.5h2.5v2.5zm-8.75 0h2.5v-2.5h-2.5v2.5zM5 17.5H2.5V15H5v2.5zm10 0h2.5V15H15v2.5zm-3.75 0h-2.5V15h2.5v2.5zM17.5 5H15V2.5h2.5V5zM8.75 5h2.5V2.5h-2.5V5z"
        ></path>
      </svg>
    </button>

    <!-- 弹层和原站一样挂在 body 上，按文档坐标定位（不写死在按钮下方）：
         滚动时先跟着页面上移、下一帧再被拉回按钮下方，和原站一样「轻轻抖一下」。
         外面再包一层 `<Transition name="rp-stack-zoom">`：出现和消失各播一次 antd 的
         `zoom-big-fast`（0.1s），缩放原点在弹层左上角 —— 原来只挂 `v-if`，收起时是硬切。 -->
    <Teleport to="body">
      <Transition name="rp-stack-zoom">
        <div
          v-if="open"
          ref="panel"
          class="rp-stack__panel"
          :style="panelStyle"
          @mouseenter="openNow"
          @mouseleave="scheduleClose"
        >
          <div class="rp-stack__header">
            <a
              class="rp-stack__brand"
              href="https://rstack.rs/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                class="rp-stack__brand-logo"
                src="https://assets.rspack.rs/rspack/rspack-claw-logo.svg"
                alt="Rstack"
              />
              <div class="rp-stack__brand-text">Rstack</div>
            </a>
          </div>

          <div class="rp-stack__links">
            <a
              v-for="tool in TOOLS"
              :key="tool.name"
              class="rp-stack__item"
              :href="tool.url"
              target="_blank"
              rel="noreferrer"
            >
              <img
                class="rp-stack__item-logo"
                :src="tool.logo"
                :alt="tool.name"
                loading="lazy"
                decoding="async"
                :style="tool.scale ? { transform: `scale(${tool.scale})` } : undefined"
              />
              <div>
                <div class="rp-stack__item-name">{{ tool.name }}</div>
                <div class="rp-stack__item-desc">{{ tool.desc }}</div>
              </div>
            </a>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
