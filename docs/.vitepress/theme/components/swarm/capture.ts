/**
 * 「群蜂重建」的扫描阶段 —— 对应原扩展 swarm.js 里的 captureModel。
 *
 * 遍历首页真实 DOM（`.site-shell` 子树），把每个可见元素归成三类之一：
 *   box   有背景 / 边框 / 阴影的容器（卡片、导航条、按钮……）
 *   text  含直接文本节点的块（标题、段落、链接……）
 *   image 图片 / 视频 / 画布 / SVG
 *
 * 坐标一律转成文档坐标（rect + scroll），`position: fixed` 的子树（导航栏）
 * 例外 —— 它们会被投放到覆盖层的「屏幕层」，用视口坐标。
 *
 * **祖先裁剪**：跑马灯副本与轮播里没露出的那几组整体落在卡片外侧，靠
 * `overflow-hidden` 遮住。只看 display/visibility 的话这些元素会全部变成
 * 工单，光标跑到屏幕外、任务量翻倍。所以每下一层都把祖先的裁剪矩形收窄一次，
 * 完全落在裁剪外的元素连同子树直接跳过。
 *
 * **分组复制**：扫描时不只收条目，还建一棵「元素节点树」（每个节点记录自己
 * 产出的条目和子节点）。扫完按原扩展 `findGroups` 的规则找「同父级、同长相」
 * 的兄弟块：`sig` 相同 + 尺寸相近 + 组内 ≥2 个。母块正常建，其余副本整棵
 * 子树从工单里摘掉，只留一个复制任务 —— 光标会把母块整体 alt-拖到空位。
 * 关键是这条规则**不以「有没有背景」为前提**，所以 `a.group/item` 这种
 * 透明列表行也能成组（每条 slide 两行 → 一次复制）。
 */

export type SwarmItemKind = 'box' | 'text' | 'image'

export interface SwarmBox {
  x: number
  y: number
  w: number
  h: number
}

/** 同组里的一个位置槽（母块 + 各副本）。`done` 表示该位置已经有内容，可作复制源。 */
export interface GroupSlot {
  box: SwarmBox
  done: boolean
}

/**
 * 一个「副本」：母块建好之后，光标把母块的整棵子树复制到这个位置。
 * `srcItems` 是副本自己的几何（拖拽体坐标），`masterItems` 提供内容 ——
 * 拖动途中看到的是母块的内容（像真的覆盖了一层），落位后 `edits` 再把
 * 与母块不一致的文字重新打一遍。
 */
export interface SwarmDup {
  masterEl: Element
  dstEl: Element
  masterItems: SwarmItem[]
  srcItems: SwarmItem[]
  /** 母块文字内容，按文本条目出现顺序，供拖拽体套用。 */
  masterTexts: string[]
  /** 与母块内容不同、落位后需要重打的副本文本条目。 */
  edits: SwarmItem[]
  masterBox: SwarmBox
  dstBox: SwarmBox
  group: GroupSlot[]
  slot: GroupSlot
}

export interface SwarmItem {
  id: number
  kind: SwarmItemKind
  /** 源元素，重建时现场克隆并读取计算样式。 */
  el: Element
  x: number
  y: number
  w: number
  h: number
  /** 距捕获根的 DOM 深度，用作克隆层的 z-index（子元素压父元素）。 */
  depth: number
  /** fixed 子树 → 屏幕层（视口坐标），否则 → 世界层（文档坐标）。 */
  fixed: boolean
  /** text 类才有的文本内容（已折叠空白、截断）。 */
  text: string
  /** 被祖先裁剪过（尺寸只取可见部分），文本克隆需要跟着裁。 */
  clipped: boolean
  /** 源元素自己就把文本截断（`line-clamp-*` / overflow hidden / 省略号）。 */
  clamped: boolean
  /** 单行富文本行里单独定位的那一截文字：克隆不许换行。 */
  nowrap?: boolean
  /** 同构块里的「副本」：本身不出图，由一个复制任务把母块拖过来。 */
  dup?: SwarmDup
  /** 复制任务的占位条目（不是真实元素，只为调度与落位提供几何）。 */
  anchor?: boolean
}

const SKIP_TAGS = new Set([
  'SCRIPT',
  'STYLE',
  'LINK',
  'META',
  'NOSCRIPT',
  'TEMPLATE',
  'BR',
  'SOURCE',
  'WBR',
])

const MEDIA_TAGS = new Set(['img', 'video', 'canvas', 'svg'])

/** 会真的把子元素裁掉不画的 overflow 值（auto/scroll 同样裁，只是可滚）。 */
const CLIP_OVERFLOW = new Set(['hidden', 'clip', 'auto', 'scroll'])

/** 单块文本的最大打字长度，过长文本截断，避免一个任务拖住整群光标。 */
const MAX_TEXT = 260
/** 任务总量上限，超出后丢弃靠后的（页面底部的细碎元素）。 */
const MAX_ITEMS = 420
/** 元素短于这个尺寸就不值得单独重建。 */
const MIN_SIZE = 2
/** 可见部分窄于这个尺寸就当作完全被裁掉（避免边缘那一两像素的碎屑）。 */
const MIN_VISIBLE = 3
/** 一个组最多这么多个成员（原扩展同值）。 */
const MAX_GROUP = 48

interface Rect {
  x: number
  y: number
  w: number
  h: number
}

const UNBOUNDED: Rect = { x: -1e6, y: -1e6, w: 2e6, h: 2e6 }

/** 两个矩形的交集；不相交时宽高为 0。 */
function clipRect(a: Rect, b: Rect): Rect {
  const x1 = Math.max(a.x, b.x)
  const y1 = Math.max(a.y, b.y)
  const x2 = Math.min(a.x + a.w, b.x + b.w)
  const y2 = Math.min(a.y + a.h, b.y + b.h)
  return { x: x1, y: y1, w: Math.max(0, x2 - x1), h: Math.max(0, y2 - y1) }
}

function isTransparent(color: string): boolean {
  if (!color || color === 'transparent') return true
  const m = color.match(/rgba?\(([^)]+)\)/)
  if (!m) return false
  const parts = m[1].split(',').map((s) => parseFloat(s.trim()))
  return parts.length === 4 && parts[3] === 0
}

/** 元素节点树：分组要按「元素」而不是「条目」，否则透明容器永远进不了组。 */
interface ElemNode {
  el: Element
  box: Rect
  fixed: boolean
  depth: number
  /** 这个元素自己直接产出的条目（box / text / image）。 */
  own: SwarmItem[]
  kids: ElemNode[]
  /** 若本节点是被复制出来的副本，这里挂它的复制任务条目。 */
  anchor?: SwarmItem
}

interface Ctx {
  items: SwarmItem[]
  drop: Set<SwarmItem>
  droppedNodes: Set<ElemNode>
  nextId: () => number
}

/** 宽高比（大小两个方向都要比，等价于原扩展的双向比）。 */
function ratio(a: number, b: number): number {
  return Math.max(a, b) / Math.max(1, Math.min(a, b))
}

/** 同签名同级的两个块是否「长得够像」：高 < 1.8、宽 < 1.6（双向）。 */
function similar(a: ElemNode, b: ElemNode): boolean {
  return ratio(a.box.h, b.box.h) < 1.8 && ratio(a.box.w, b.box.w) < 1.6
}

export function captureModel(root: HTMLElement): SwarmItem[] {
  const items: SwarmItem[] = []
  let id = 0
  const sx = window.scrollX
  const sy = window.scrollY

  const walk = (
    el: Element,
    depth: number,
    fixed: boolean,
    textConsumed: boolean,
    clip: Rect,
  ): ElemNode | null => {
    const tag = el.tagName
    if (SKIP_TAGS.has(tag)) return null

    const cs = getComputedStyle(el)
    if (cs.display === 'none' || cs.visibility === 'hidden') return null
    if (parseFloat(cs.opacity) === 0) return null

    const r = el.getBoundingClientRect()
    const isFixed = fixed || cs.position === 'fixed'
    const own: Rect = isFixed
      ? { x: r.left, y: r.top, w: r.width, h: r.height }
      : { x: r.left + sx, y: r.top + sy, w: r.width, h: r.height }

    // 自己会不会裁剪子元素：`overflow: hidden/clip/auto/scroll` 才会。
    const clipsOwn = CLIP_OVERFLOW.has(cs.overflowX) || CLIP_OVERFLOW.has(cs.overflowY)

    // 被祖先裁到看不见时能不能连子树一起剪掉？
    //   - 自己会裁剪 → 子元素不可能长在自己的边框盒外，可以整棵跳过；
    //   - `overflow: visible` → 子元素可以溢出父盒。轮播轨道被 translateX
    //     移出 wrap 时，轨道自己的盒子完全在裁剪框外，但里面的 slide 仍露在
    //     可见区 —— 这时只跳过本节点的条目，子树必须照常往下扫，否则重播到
    //     非第 0 张时那张卡片的内容会整块从工单里消失。
    const visible = clipRect(own, clip)
    const fullyHidden = visible.w < MIN_VISIBLE || visible.h < MIN_VISIBLE
    if (fullyHidden && clipsOwn) return null

    const clipped = fullyHidden || visible.w < own.w - 0.5 || visible.h < own.h - 0.5
    const geom = clipped ? visible : own
    // 完全看不见的节点不产出自己的条目（克隆会落在裁剪框外），但继续递归。
    const drawSelf = geom.w >= MIN_SIZE && geom.h >= MIN_SIZE

    // 下一层能看到的范围：自己若会裁剪子元素，就收窄到自己的边框盒。
    const childClip = clipsOwn ? clipRect(clip, own) : clip

    const node: ElemNode = { el, box: geom, fixed: isFixed, depth, own: [], kids: [] }

    const base = { id: -1, depth, fixed: isFixed, clipped, clamped: false, text: '' }
    // 自己落在裁剪框外时不产出条目（克隆画到看不见的地方等于白干）；
    // 但子树照常扫，`overflow: visible` 的子元素可能仍在可见区。
    const emit = (kind: SwarmItemKind, extra: Partial<SwarmItem> = {}): SwarmItem | null => {
      if (!drawSelf) return null
      const it: SwarmItem = {
        ...base,
        id: id++,
        kind,
        el,
        x: geom.x,
        y: geom.y,
        w: geom.w,
        h: geom.h,
        ...extra,
      }
      items.push(it)
      node.own.push(it)
      return it
    }

    if (MEDIA_TAGS.has(tag.toLowerCase())) {
      emit('image')
      return node
    }

    // `bg-clip-text`（渐变字）的背景是「涂在文字上」的，不是一块底色。
    // 当成容器收下的话，克隆会是一个纯色/渐变矩形（字还因为 text-transparent
    // 打不出来），所以背景这一项要排除掉，交给下面的文本克隆去带渐变。
    const clipsToText =
      cs.backgroundClip === 'text' ||
      (cs as unknown as { webkitBackgroundClip?: string }).webkitBackgroundClip === 'text'

    const hasBg =
      !clipsToText && (!isTransparent(cs.backgroundColor) || cs.backgroundImage !== 'none')
    let hasBorder = false
    for (const side of ['Top', 'Right', 'Bottom', 'Left'] as const) {
      const width = parseFloat(cs[`border${side}Width` as const] as string)
      const color = cs[`border${side}Color` as const] as string
      if (width > 0 && !isTransparent(color)) {
        hasBorder = true
        break
      }
    }
    const hasShadow = cs.boxShadow !== 'none' && !clipsToText

    if (hasBg || hasBorder || hasShadow) emit('box')

    // 元素自己是否会截断文本：`line-clamp-*` 的写法就是 overflow:hidden +
    // -webkit-box 限行，省略号同理。这类文本克隆必须限高，否则打出来的字会
    // 一直往下溢，把卡片撑乱。
    const lineClamp = (cs as unknown as { webkitLineClamp?: string }).webkitLineClamp
    const clamped =
      (lineClamp && lineClamp !== 'none') ||
      CLIP_OVERFLOW.has(cs.overflowX) ||
      CLIP_OVERFLOW.has(cs.overflowY) ||
      cs.textOverflow === 'ellipsis'

    // 文本块：只认「自己有直接文本节点」的元素，随后整段文本（含内联子元素）
    // 由这一个任务打字完成 —— 子元素不再重复产出文本（textConsumed 下传）。
    //
    // 但「图标 + 文字」的单行富文本行（标签胶囊 `a.flex.h-8 …` 就是典型）不能
    // 整行照抄：那串字会从元素左内边距开始画，正好压在图标上，图标看着就「位置
    // 不对」。这类行按**直接文本节点自己的矩形**落位，并让子元素（图标、`#`
    // 之类的小 span）各自出图 —— 每个小块的坐标都来自它自己的盒子，位置才对。
    if (!textConsumed) {
      let direct = ''
      let directNodes = 0
      let tr: { x1: number; y1: number; x2: number; y2: number } | null = null
      const range = document.createRange()
      for (const n of Array.from(el.childNodes)) {
        if (n.nodeType !== Node.TEXT_NODE || !n.textContent || !n.textContent.trim()) continue
        direct += n.textContent
        directNodes++
        range.selectNodeContents(n)
        const rr = range.getBoundingClientRect()
        if (rr.width <= 0 || rr.height <= 0) continue
        const left = isFixed ? rr.left : rr.left + sx
        const top = isFixed ? rr.top : rr.top + sy
        tr = tr
          ? {
              x1: Math.min(tr.x1, left),
              y1: Math.min(tr.y1, top),
              x2: Math.max(tr.x2, left + rr.width),
              y2: Math.max(tr.y2, top + rr.height),
            }
          : { x1: left, y1: top, x2: left + rr.width, y2: top + rr.height }
      }
      if (direct.trim()) {
        const lh = parseFloat(cs.lineHeight) || (parseFloat(cs.fontSize) || 16) * 1.4
        const inline = Array.from(el.children)
        // 只有「单行 + 只有一段直接文字 + 同行里有图标/图片」才拆：这正是
        // 「图标 + 文字」的富文本行。没有图标的小标签行照旧整段打（拆分反而
        // 会让每个词各自成盒、在窄盒里被折成两行）。
        const iconRow = inline.some(
          (c) => MEDIA_TAGS.has(c.tagName.toLowerCase()) || Boolean(c.querySelector('svg,img,video,canvas')),
        )
        const split =
          Boolean(tr) &&
          directNodes === 1 &&
          iconRow &&
          !clamped &&
          tr!.y2 - tr!.y1 <= lh * 1.6
        const text = (split ? direct : el.textContent || '').replace(/\s+/g, ' ').trim()
        if (text) {
          const it = emit('text', {
            text: text.slice(0, MAX_TEXT),
            clamped: Boolean(clamped),
            // 单独定位的这截文字是单行的，克隆里不许换行（矩形宽度按实测
            // 给的，差半像素就会把最后一个词折到下一行）。
            nowrap: split,
            ...(split && tr
              ? { x: tr.x1, y: tr.y1, w: tr.x2 - tr.x1, h: tr.y2 - tr.y1 }
              : {}),
          })
          // 拆开时子元素各自出字，否则整段都由这一条负责。
          // 自己没出图（整块在裁剪框外）时不能吞掉子元素，它们可能露在外面。
          if (it) textConsumed = !split
        }
      }
    }

    for (const child of Array.from(el.children)) {
      const k = walk(child, depth + 1, isFixed, textConsumed, childClip)
      if (k) node.kids.push(k)
    }
    return node
  }

  const rootNode = walk(root, 0, false, false, UNBOUNDED)

  const ctx: Ctx = {
    items,
    drop: new Set<SwarmItem>(),
    droppedNodes: new Set<ElemNode>(),
    nextId: () => id++,
  }

  /** 子树条目（已剔除被摘掉的副本与它们内部的锚）。 */
  const allItems = (n: ElemNode): SwarmItem[] => {
    const out: SwarmItem[] = []
    for (const it of n.own) if (!ctx.drop.has(it)) out.push(it)
    for (const k of n.kids) {
      if (ctx.droppedNodes.has(k)) continue
      out.push(...allItems(k))
    }
    return out
  }

  /** 把一个副本整棵子树摘掉（含里面内层组的锚条目）。 */
  const dropSubtree = (n: ElemNode) => {
    ctx.droppedNodes.add(n)
    for (const it of n.own) ctx.drop.add(it)
    if (n.anchor) ctx.drop.add(n.anchor)
    for (const k of n.kids) dropSubtree(k)
  }

  const sigCache = new Map<ElemNode, string>()
  const sigOf = (n: ElemNode): string => {
    const cached = sigCache.get(n)
    if (cached) return cached
    const el = n.el as HTMLElement
    const cls = (typeof el.className === 'string' ? el.className : '')
      .trim()
      .replace(/\s+/g, ' ')
    const kinds = allItems(n)
      .map((it) => it.kind[0])
      .join('')
    const sig = `${n.el.tagName.toLowerCase()}|${cls}|${n.fixed ? 1 : 0}|${kinds}`
    sigCache.set(n, sig)
    return sig
  }

  const makeGroup = (members: ElemNode[]) => {
    const master = members[0]
    const masterItems = allItems(master)
    if (!masterItems.length) return
    const masterTexts = masterItems
      .filter((it) => it.kind === 'text')
      .map((it) => it.text)
    // 共享槽位：链式复制时后一个副本可以从最近一个已落位的副本取源。
    const group: GroupSlot[] = members.map((m, i) => ({
      box: { x: m.box.x, y: m.box.y, w: m.box.w, h: m.box.h },
      done: i === 0,
    }))

    for (let i = 1; i < members.length; i++) {
      const copy = members[i]
      const dstItems = allItems(copy)
      if (!dstItems.length) continue

      const dstTexts = dstItems.filter((it) => it.kind === 'text')
      const edits = dstTexts.filter((it, k) => masterTexts[k] !== it.text)

      const dup: SwarmDup = {
        masterEl: master.el,
        dstEl: copy.el,
        masterItems,
        srcItems: dstItems,
        masterTexts,
        edits,
        masterBox: { x: master.box.x, y: master.box.y, w: master.box.w, h: master.box.h },
        dstBox: { x: copy.box.x, y: copy.box.y, w: copy.box.w, h: copy.box.h },
        group,
        slot: group[i],
      }

      const anchor: SwarmItem = {
        id: ctx.nextId(),
        kind: 'box',
        el: copy.el,
        x: copy.box.x,
        y: copy.box.y,
        w: copy.box.w,
        h: copy.box.h,
        depth: copy.depth,
        fixed: copy.fixed,
        text: '',
        clipped: false,
        clamped: false,
        anchor: true,
        dup,
      }
      // 先摘子树再挂锚：`dropSubtree` 会把节点上的 anchor 一起丢掉，
      // 所以必须晚一步赋值，否则副本自己的复制任务也被删了。
      dropSubtree(copy)
      ctx.items.push(anchor)
      copy.anchor = anchor
    }
  }

  /**
   * 原扩展 findGroups 的移植：
   *   1. 先把子节点各自分组（内层副本先成立，外层母块再引用它们的成品）；
   *   2. 本级兄弟按 sig 分桶（标签 + class + fixed + 子树工序首字母串）；
   *   3. 桶内按 DOM 顺序贪心成组：第一个当母块，后续所有「够像」的成员归入；
   *   4. **成员 ≥2 就复制**（不是 ≥3 —— 这正是两行列表能成组的关键）。
   */
  const findGroups = (n: ElemNode) => {
    for (const k of n.kids) findGroups(k)

    const buckets = new Map<string, ElemNode[]>()
    for (const k of n.kids) {
      if (ctx.droppedNodes.has(k)) continue
      // 自己整个落在祖先裁剪外（box 退化成零尺寸）时不参与成组：
      // 它没有可用的落位框，复制任务会把母块拖到看不见的地方。
      if (k.box.w < MIN_SIZE || k.box.h < MIN_SIZE) continue
      const its = allItems(k)
      if (!its.length) continue
      // 一整段长正文不值得整块复制（原扩展同样的豁免）。
      if (its.length === 1 && its[0].kind === 'text' && its[0].text.length > 40) continue
      const sig = sigOf(k)
      const list = buckets.get(sig)
      if (list) list.push(k)
      else buckets.set(sig, [k])
    }

    for (const bucket of buckets.values()) {
      if (bucket.length < 2) continue
      if (bucket.length > MAX_GROUP) bucket.length = MAX_GROUP
      const used = new Set<ElemNode>()
      for (let i = 0; i < bucket.length; i++) {
        if (used.has(bucket[i])) continue
        const members: ElemNode[] = [bucket[i]]
        used.add(bucket[i])
        for (let j = i + 1; j < bucket.length; j++) {
          const cand = bucket[j]
          if (used.has(cand)) continue
          if (members.every((m) => similar(m, cand))) {
            members.push(cand)
            used.add(cand)
          }
        }
        if (members.length >= 2) makeGroup(members)
      }
    }
  }

  if (rootNode) findGroups(rootNode)

  // 复制任务的锚条目按自己的 y 参与排序，任务派发顺序照旧自上而下。
  ctx.items.sort((a, b) => a.y - b.y || a.depth - b.depth || a.id - b.id)
  // **被副本摘掉的条目必须真的从工单里消失** —— 否则副本位置会先按自己的内容
  // 建一遍，又被母块内容的拖拽体压上去，文字全部重叠（这正是之前「复制很差」的根因）。
  const kept = ctx.items.filter((it) => !ctx.drop.has(it))

  // 超量时优先丢「最小的装饰性 box」，文本和媒体（含页脚）一律保留。
  if (kept.length > MAX_ITEMS) {
    const boxes = kept
      .filter((it) => it.kind === 'box' && !it.anchor && !it.dup)
      .sort((a, b) => a.w * a.h - b.w * b.h)
    const drop = new Set<SwarmItem>()
    let overflow = kept.length - MAX_ITEMS
    for (const b of boxes) {
      if (overflow <= 0) break
      drop.add(b)
      overflow--
    }
    return kept.filter((it) => !drop.has(it))
  }

  return kept
}
