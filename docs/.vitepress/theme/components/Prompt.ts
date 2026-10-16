import { nextTick } from 'vue'

import { PROMPT_AGENTS, PROMPT_CHECK_PATHS, PROMPT_COPY_PATHS } from '../rspress/containers'

/**
 * Prompt 卡片的客户端行为 —— 折叠、点击复制、以及眉标「变色」。
 *
 * 卡片本体是 `:::prompt` 容器在构建期渲染出来的静态 HTML（见
 * `theme/rspress/containers.ts`），这里只往上挂事件，和 `ImgViewer.ts` 一样：
 * 路由切换时 `destroy` → `bind` 重新挂一遍（VitePress 没有 `update` 钩子）。
 *
 * 四个 Agent 每 3.5s 轮换一次：先把当前图标淡出（400ms），淡出结束后换图标、
 * 换 `--rp-prompt-accent`，再淡回来 —— 与 rspress.rs 的节奏一致。
 */

/** 与 rspress.rs 相同的节奏：3.5s 换一次，淡出/淡入各 400ms，复制反馈停 2s。 */
const CYCLE_MS = 3500
const FADE_MS = 400
const COPIED_MS = 2000
const RIPPLE_MS = 600

const COPY_LABEL = '复制 Prompt'
const COPIED_LABEL = '已复制'

let cycle: number | undefined
let timers = new Set<number>()

/** 所有延时都登记在册，`destroyPrompts` 一次清干净，避免切页后还在后台跑。 */
function later(run: () => void, ms: number): void {
  const id = window.setTimeout(() => {
    timers.delete(id)
    run()
  }, ms)
  timers.add(id)
}

async function writeClipboard(text: string): Promise<void> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return
    }
  } catch {
    // 非 HTTPS / 无权限时退回到老办法。
  }
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.opacity = '0'
  document.body.append(area)
  area.select()
  document.execCommand('copy')
  area.remove()
}

/**
 * 给一张卡片挂上行为，返回「换下一个 Agent」的函数（由外层统一按节奏调用）。
 */
function setup(root: HTMLElement): () => void {
  const icon = root.querySelector<HTMLElement>('.rp-prompt__icon')
  const meta = root.querySelector<HTMLElement>('.rp-prompt__meta')
  const copyButton = root.querySelector<HTMLButtonElement>('.rp-prompt__action-copy')
  const copyIcon = copyButton?.querySelector('svg')
  const copyLabel = copyButton?.querySelector('span')
  const toggle = root.querySelector<HTMLButtonElement>('.rp-prompt__action-toggle')
  const toggleIcon = toggle?.querySelector('svg')
  const content = root.querySelector<HTMLElement>('.rp-prompt__content')
  const body = root.querySelector<HTMLElement>('.rp-prompt__content-body')

  let index = 0
  let collapsed = true

  function markCopied(): void {
    if (!copyButton) return
    copyButton.classList.add('rp-prompt__action-copy--copied')
    meta?.classList.add('rp-prompt__meta--copied')
    if (copyLabel) copyLabel.textContent = COPIED_LABEL
    if (copyIcon) copyIcon.innerHTML = PROMPT_CHECK_PATHS

    later(() => {
      copyButton.classList.remove('rp-prompt__action-copy--copied')
      meta?.classList.remove('rp-prompt__meta--copied')
      if (copyLabel) copyLabel.textContent = COPY_LABEL
      if (copyIcon) copyIcon.innerHTML = PROMPT_COPY_PATHS
    }, COPIED_MS)
  }

  function copyPrompt(): void {
    void writeClipboard(body?.textContent ?? '').then(markCopied)
  }

  /** 点击处的波纹：位置相对卡片，600ms 后自己消失（动画在 tailwind.css 里）。 */
  function splash(event: MouseEvent): void {
    const rect = root.getBoundingClientRect()
    const dot = document.createElement('div')
    dot.className = 'rp-prompt__ripple'
    dot.style.left = `${event.clientX - rect.left}px`
    dot.style.top = `${event.clientY - rect.top}px`
    root.append(dot)
    later(() => dot.remove(), RIPPLE_MS)
  }

  // 点卡片任意处都能复制，但点在链接/按钮上、或者正在选中文字时不触发。
  // `body` 只有完整形态才有 —— `:::prompt{custom}` 没有正文可复制，也不该有波纹。
  if (body) {
    root.addEventListener('click', (event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (event.defaultPrevented) return
      if (window.getSelection()?.toString()) return
      if (target.closest('a, button')) return
      splash(event)
      copyPrompt()
    })
  }

  copyButton?.addEventListener('click', (event) => {
    event.stopPropagation()
    copyPrompt()
  })

  function toggleContent(): void {
    collapsed = !collapsed
    content?.classList.toggle('rp-prompt__content--collapsed', collapsed)
    content?.setAttribute('aria-hidden', String(collapsed))
    toggle?.setAttribute('aria-expanded', String(!collapsed))
    if (toggle) toggle.title = collapsed ? '展开' : '收起'
    toggleIcon?.classList.toggle('rp-prompt__action-toggle-icon--expanded', !collapsed)
  }

  toggle?.addEventListener('click', (event) => {
    event.stopPropagation()
    toggleContent()
  })

  return () => {
    if (!icon) return
    index = (index + 1) % PROMPT_AGENTS.length
    const agent = PROMPT_AGENTS[index]
    icon.classList.add('rp-prompt__icon--fade-out')
    later(() => {
      icon.innerHTML = agent.svg
      icon.title = agent.name
      root.style.setProperty('--rp-prompt-accent', agent.color)
      icon.classList.remove('rp-prompt__icon--fade-out')
    }, FADE_MS)
  }
}

export function bindPrompts(): void {
  destroyPrompts()

  // 卡片是 SSR 出来的静态 HTML，等这一帧的 DOM 更新落定再查，和 `bindFancybox` 一致。
  void nextTick(() => {
    const roots = document.querySelectorAll<HTMLElement>('.rp-prompt')
    if (!roots.length) return

    const advance = [...roots].map(setup)
    cycle = window.setInterval(() => {
      for (const next of advance) next()
    }, CYCLE_MS)
  })
}

export function destroyPrompts(): void {
  if (cycle !== undefined) {
    clearInterval(cycle)
    cycle = undefined
  }
  timers.forEach((id) => clearTimeout(id))
  timers = new Set()
}
