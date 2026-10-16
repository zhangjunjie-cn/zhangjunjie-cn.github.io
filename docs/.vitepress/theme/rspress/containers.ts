/**
 * Rspress 风格的容器语法。
 *
 * 目标是把 rspress.rs 上两套东西搬过来：
 *   - 容器（callout）  https://rspress.rs/zh/ui/components/callout
 *   - Prompt 卡片      https://rspress.rs/zh/ui/components/prompt
 *
 * 语法与 Rspress 一致：`:::tip`、`:::tip 自定义标题`、`:::tip{title="自定义标题"}`，
 * 类型沿用 Rspress 那八种（note / tip / important / info / warning / danger /
 * caution / details），嵌套用更多的冒号（`::::`）。
 *
 * 为什么自己写容器规则、而不是用 `markdown-it-container`：Prompt 的正文必须**逐字**
 * 保留（换行、反引号、缩进都是要复制走的内容），而 markdown-it-container 一定会把
 * 容器里的正文再按 markdown 解析一遍 —— `1. xxx` 会变成 `<ol>`、反引号会变成
 * `<code>`，复制出来的东西就不是原来那段 prompt 了。下面这份实现里 `literal: true`
 * 的类型直接取源码原文，`literal: false` 的类型才交给 block tokenizer 按 markdown
 * 渲染。规则本体照搬 markdown-it-container 的 block 规则（含 `alt`、结束标记那套判断）。
 *
 * vp 自带的 `::: tip` 容器仍在，只是永远轮不到：这里在 `markdown.preConfig` 阶段注册
 * （早于 vp 的 containerPlugin），而 markdown-it 的 Ruler 按插入位置取第一条命中的规则，
 * 所以同名类型会先落到这里。渲染出来的 class 也换成了 Rspress 的 `rp-callout--*`，
 * 样式见 `theme/styles/tailwind.css`。
 */

const MARKER = ':'
const MIN_MARKERS = 3

/** Prompt 眉标每 3.5s 轮换一个 Agent，连图标带颜色一起换 —— 「变色」用的就是这张色卡。 */
export interface PromptAgent {
  name: string
  color: string
  svg: string
}

export const PROMPT_AGENTS: PromptAgent[] = [
  {
    name: 'Codex',
    color: '#6366F1',
    svg: '<svg aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.503 0H4.496A4.496 4.496 0 000 4.496v15.007A4.496 4.496 0 004.496 24h15.007A4.496 4.496 0 0024 19.503V4.496A4.496 4.496 0 0019.503 0z" fill="#fff"></path><path d="M9.064 3.344a4.578 4.578 0 012.285-.312c1 .115 1.891.54 2.673 1.275.01.01.024.017.037.021a.09.09 0 00.043 0 4.55 4.55 0 013.046.275l.047.022.116.057a4.581 4.581 0 012.188 2.399c.209.51.313 1.041.315 1.595a4.24 4.24 0 01-.134 1.223.123.123 0 00.03.115c.594.607.988 1.33 1.183 2.17.289 1.425-.007 2.71-.887 3.854l-.136.166a4.548 4.548 0 01-2.201 1.388.123.123 0 00-.081.076c-.191.551-.383 1.023-.74 1.494-.9 1.187-2.222 1.846-3.711 1.838-1.187-.006-2.239-.44-3.157-1.302a.107.107 0 00-.105-.024c-.388.125-.78.143-1.204.138a4.441 4.441 0 01-1.945-.466 4.544 4.544 0 01-1.61-1.335c-.152-.202-.303-.392-.414-.617a5.81 5.81 0 01-.37-.961 4.582 4.582 0 01-.014-2.298.124.124 0 00.006-.056.085.085 0 00-.027-.048 4.467 4.467 0 01-1.034-1.651 3.896 3.896 0 01-.251-1.192 5.189 5.189 0 01.141-1.6c.337-1.112.982-1.985 1.933-2.618.212-.141.413-.251.601-.33.215-.089.43-.164.646-.227a.098.098 0 00.065-.066 4.51 4.51 0 01.829-1.615 4.535 4.535 0 011.837-1.388zm3.482 10.565a.637.637 0 000 1.272h3.636a.637.637 0 100-1.272h-3.636zM8.462 9.23a.637.637 0 00-1.106.631l1.272 2.224-1.266 2.136a.636.636 0 101.095.649l1.454-2.455a.636.636 0 00.005-.64L8.462 9.23z" fill="#6366F1"></path></svg>',
  },
  {
    name: 'Claude Code',
    color: '#D97757',
    svg: '<svg aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" fill-rule="evenodd" d="M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z" fill="#D97757"></path></svg>',
  },
  {
    name: 'Cursor',
    color: '#737373',
    svg: '<svg aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z" fill="currentColor"></path></svg>',
  },
  {
    name: 'opencode',
    color: '#6B7280',
    svg: '<svg aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 6H8v12h8V6zm4 16H4V2h16v20z" fill="currentColor"></path></svg>',
  },
]

/** 内联在 `<svg class="rp-prompt__action-icon">` 里；客户端「复制 → 已复制」只换这两个。 */
export const PROMPT_COPY_PATHS =
  '<path fill="currentColor" d="M20 8v12H8V8zm0-2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2"></path><path fill="currentColor" d="M4 16H2V4a2 2 0 0 1 2-2h12v2H4Z"></path>'

export const PROMPT_CHECK_PATHS =
  '<path fill="currentColor" d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"></path>'

const PROMPT_CHEVRON_PATHS =
  '<path fill="currentColor" d="M16 22 6 12l1.4-1.4 8.6 8.6 8.6-8.6L26 12z"></path>'

/** 默认标题：Rspress 就把类型名首字母大写。 */
const CALLOUT_LABELS: Record<string, string> = {
  note: 'Note',
  tip: 'Tip',
  important: 'Important',
  info: 'Info',
  warning: 'Warning',
  danger: 'Danger',
  caution: 'Caution',
  details: 'Details',
}

const PROMPT_LABEL = 'For your Agent'

/**
 * 解析 `:::type` 后面那一段：`{title="…"}` 或裸写的标题。
 * 类型名后面必须跟空白或 `{`，否则 `:::notes` 也会被当成 `note`。
 */
function parseParams(
  params: string,
  name: string,
): { title: string; extra: Record<string, string> } | null {
  const rest = params.trimStart()
  if (!rest.startsWith(name)) return null
  const tail = rest.slice(name.length)
  if (tail && !/^[\s{[]/.test(tail)) return null

  const extra: Record<string, string> = {}
  const trimmed = tail.trim()

  if (trimmed.startsWith('{')) {
    const body = trimmed.slice(1, trimmed.lastIndexOf('}'))
    // 两种写法都要认：`title="…"` 和没有值的裸标记（`{custom}` → `extra.custom = ''`）。
    for (const match of body.matchAll(/([\w-]+)\s*(?:=\s*(["'])(.*?)\2)?/g)) {
      extra[match[1]] = match[3] ?? ''
    }
  }

  return { title: extra.title ?? (trimmed.startsWith('{') ? '' : trimmed), extra }
}

interface ContainerOptions {
  name: string
  /** 生成 `rp_callout_*` / `rp_prompt_*` / `rp_steps_*` 这套 token。 */
  tokenBase: 'rp_callout' | 'rp_prompt' | 'rp_steps'
  /**
   * 正文是逐字保留还是按 markdown 渲染 —— 由这一行上写的属性决定：
   * Prompt 默认要能整段复制走，所以取源码原文；写成 `{custom}` 之后不再复制，
   * 就把正文交还给 markdown（Rspress 的 custom 形态就是这么渲染 children 的）。
   */
  literal: (extra: Record<string, string>) => boolean
}

/**
 * 注册一种容器。规则名加 `rp_` 前缀（`rp_tip`、`rp_prompt`），既避开 vp 自己的
 * `container_<name>`，又保证排在它前面先命中。
 */
function registerContainer(md: any, options: ContainerOptions): void {
  const { name, tokenBase, literal } = options

  function container(state: any, startLine: number, endLine: number, silent: boolean): boolean {
    const start = state.bMarks[startLine] + state.tShift[startLine]
    const max = state.eMarks[startLine]
    if (state.src.charCodeAt(start) !== 0x3a) return false

    let pos: number
    for (pos = start + 1; pos <= max; pos++) {
      if (state.src[pos] !== MARKER) break
    }
    const markerCount = Math.floor((pos - start) / MARKER.length)
    if (markerCount < MIN_MARKERS) return false
    pos -= (pos - start) % MARKER.length

    const markup = state.src.slice(start, pos)
    const params = state.src.slice(pos, max)
    const parsed = parseParams(params, name)
    if (!parsed) return false

    // 校验模式：只要告诉 block parser 这一行归容器管就够了。
    if (silent) return true

    // 找结束标记：冒号数不少于开头、且后面只剩空白的那一行。
    let nextLine = startLine
    let autoClosed = false
    for (;;) {
      nextLine++
      if (nextLine >= endLine) break

      const lineStart = state.bMarks[nextLine] + state.tShift[nextLine]
      const lineMax = state.eMarks[nextLine]
      if (lineStart < lineMax && state.sCount[nextLine] < state.blkIndent) break
      if (state.src.charCodeAt(lineStart) !== 0x3a) continue
      if (state.sCount[nextLine] - state.blkIndent >= 4) continue

      for (pos = lineStart + 1; pos <= lineMax; pos++) {
        if (state.src[pos] !== MARKER) break
      }
      if (Math.floor((pos - lineStart) / MARKER.length) < markerCount) continue
      pos -= (pos - lineStart) % MARKER.length
      if (state.skipSpaces(pos) < lineMax) continue

      autoClosed = true
      break
    }

    const oldParent = state.parentType
    const oldLineMax = state.lineMax
    state.parentType = 'container'
    state.lineMax = nextLine

    const meta = { type: name, title: parsed.title, extra: parsed.extra }

    const open = state.push(`${tokenBase}_open`, 'div', 1)
    open.markup = markup
    open.block = true
    open.info = params
    open.map = [startLine, nextLine]
    open.meta = meta

    if (literal(parsed.extra)) {
      const body = state.push(`${tokenBase}_body`, '', 0)
      body.block = true
      body.content = state.getLines(startLine + 1, nextLine, state.blkIndent, false).trim()
    } else {
      md.block.tokenize(state, startLine + 1, nextLine)
    }

    const close = state.push(`${tokenBase}_close`, 'div', -1)
    close.markup = markup
    close.block = true
    close.meta = meta

    state.parentType = oldParent
    state.lineMax = oldLineMax
    state.line = nextLine + (autoClosed ? 1 : 0)
    return true
  }

  md.block.ruler.before('fence', `rp_${name}`, container, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  })
}

export function registerRspressContainers(md: any): void {
  for (const name of Object.keys(CALLOUT_LABELS)) {
    registerContainer(md, { name, tokenBase: 'rp_callout', literal: () => false })
  }
  registerContainer(md, {
    name: 'prompt',
    tokenBase: 'rp_prompt',
    // `:::prompt{custom}` = Rspress 的 `<Prompt custom>`：没有复制/折叠，
    // 正文交回 markdown 渲染（那份 hello world 例子里的 `**hello** world`）。
    literal: (extra) => !('custom' in extra),
  })
  // `:::steps` = Rspress 的 `<Steps>`：容器里的 h2–h6 各算一步，序号由 CSS 的
  // `counter` 生成（见 `tailwind.css`），所以正文必须交给 markdown 解析。
  registerContainer(md, {
    name: 'steps',
    tokenBase: 'rp_steps',
    literal: () => false,
  })

  const escape = (value: string): string => md.utils.escapeHtml(value)
  const inline = (value: string, env: any): string =>
    md.renderInline(value, { references: env?.references })

  let promptSeq = 0

  /** 八种类型的容器。details 用 `<details>/<summary>`，其余是「标题 + 内容」。 */
  md.renderer.rules.rp_callout_open = (tokens: any[], idx: number, _options: any, env: any) => {
    const { type, title, extra } = tokens[idx].meta
    const label = title || CALLOUT_LABELS[type] || type
    // `{title="…"}` 之外的属性原样落到标签上（Rspress 只文档化了 title，多出来的也不丢）。
    const attrs = Object.entries(extra)
      .filter(([key]) => key !== 'title')
      .map(([key, value]) => ` ${key}="${escape(value as string)}"`)
      .join('')
    const heading = inline(label, env)

    // 正文那层 `__content` 不能省：`tailwind.css` 里段落间距、行内 code 配色、
    // 链接颜色的规则都挂在它下面，少了这层就会退回默认主题的 `.vp-doc` 规则。
    return type === 'details'
      ? `<details class="rp-callout rp-callout--details"${attrs}><summary class="rp-callout__title">${heading}</summary><div class="rp-callout__content">`
      : `<div class="rp-callout rp-callout--${type}"${attrs}><div class="rp-callout__title">${heading}</div><div class="rp-callout__content">`
  }

  md.renderer.rules.rp_callout_close = (tokens: any[], idx: number) =>
    tokens[idx].meta?.type === 'details' ? '</div></details>\n' : '</div></div>\n'

  /** Steps 容器只有一个壳；每步的序号圆点由 `tailwind.css` 里的 `counter` 画出来。 */
  md.renderer.rules.rp_steps_open = () => '<div class="rp-steps">'
  md.renderer.rules.rp_steps_close = () => '</div>\n'

  /**
   * Prompt 卡片。两种形态共用眉标与外壳：
   *   `:::prompt{title="…" description="…"}`  完整卡片，带复制/展开，正文逐字保留；
   *   `:::prompt{custom}`                     Rspress 的 `<Prompt custom>`，只有眉标与外框，
   *                                           正文按 markdown 渲染，没有复制与折叠。
   * 折叠/复制/变色交给 `components/Prompt.ts`。
   */
  md.renderer.rules.rp_prompt_open = (tokens: any[], idx: number, _options: any, env: any) => {
    const { title, extra } = tokens[idx].meta
    const agent = PROMPT_AGENTS[0]
    const eyebrow = escape(extra.eyebrow || PROMPT_LABEL)
    const description = extra.description ? escape(extra.description) : ''
    // 属性里只有 `custom` 这一个开关，它不落到 HTML 上（rspress 也只是加个 class）。
    const custom = 'custom' in extra
    // 完整形态没写 title 时兜个默认值；custom 形态没有 title 就是空标题（整行都不渲染）。
    const titleBlock = title ? inline(title, env) : custom ? '' : 'Agent Prompt'

    // custom 且没写标题/描述时这一整块不渲染：留个空的 flex item 会被 `__header` 的
    // `gap: .75rem` 撑出空隙（rspress 的 custom 形态也只有眉标那一行）。
    const row =
      custom && !titleBlock && !description
        ? ''
        : `<div class="rp-prompt__header-row"><div class="rp-prompt__header-left">` +
          `<div class="rp-prompt__title-with-icon"><div class="rp-prompt__title">${titleBlock}</div></div>` +
          (description ? `<p class="rp-prompt__description">${description}</p>` : '') +
          `</div>`

    const shell =
      `<div class="rp-prompt${custom ? ' rp-prompt--custom' : ''}" style="--rp-prompt-accent:${agent.color}">` +
      `<div class="rp-prompt__backdrop"></div>` +
      `<div class="rp-prompt__panel">` +
      `<div class="rp-prompt__header">` +
      `<div class="rp-prompt__meta">` +
      `<span class="rp-prompt__eyebrow">` +
      `<span class="rp-prompt__icon" title="${escape(agent.name)}">${agent.svg}</span>${eyebrow}` +
      `</span></div>` +
      row

    if (custom) {
      // `row` 结尾已经关掉 `__header-left`，这里再补 header-row + header。
      return (
        shell +
        (row ? `</div></div>` : `</div>`) +
        `<div class="rp-prompt__custom-content">`
      )
    }

    const id = `rp-prompt-content-${(promptSeq += 1)}`

    return (
      shell +
      `<div class="rp-prompt__header-actions">` +
      `<button type="button" class="rp-prompt__action-copy" title="复制 Prompt">` +
      `<svg class="rp-prompt__action-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">${PROMPT_COPY_PATHS}</svg>` +
      `<span>复制 Prompt</span></button>` +
      `<button type="button" class="rp-prompt__action-toggle" aria-controls="${id}" aria-expanded="false" title="展开">` +
      `<svg class="rp-prompt__action-toggle-icon" width="1em" height="1em" viewBox="0 0 32 32">${PROMPT_CHEVRON_PATHS}</svg>` +
      `</button>` +
      `</div></div></div>` +
      `<div id="${id}" class="rp-prompt__content rp-prompt__content--collapsed" aria-hidden="true">` +
      `<div class="rp-prompt__content-inner">`
    )
  }

  // `v-pre` 是必须的：这段正文会被 VitePress 当成 Vue 模板编译，prompt 里常见的
  // `{{变量}}` 不挡住就会被当成插值求值。
  md.renderer.rules.rp_prompt_body = (tokens: any[], idx: number) =>
    `<div class="rp-prompt__content-body" style="white-space:pre-wrap" v-pre>${escape(tokens[idx].content)}</div>`

  // custom 形态的正文是普通 markdown token，收尾少一层（没有 `content-inner`）。
  md.renderer.rules.rp_prompt_close = (tokens: any[], idx: number) =>
    'custom' in (tokens[idx].meta?.extra ?? {}) ? '</div></div></div>\n' : '</div></div></div></div>\n'
}
