# 「群蜂重建」光标形状与复制拖拽全量对齐

## Context

用户在实际浏览器里跑过原扩展（`https://github.com/JoelBastoneLopez/swarm-rebuild`，Alt+Shift+S），
并提供了新录屏，指出当前复刻的两个硬伤：

1. **光标形状不对** —— 现在是自绘的 22px 箭头 + 名牌，原版是 28×28 的多形态光标（箭头 / 复制 /
   十字 / I 形），带热点、按压缩放、随速度转向。
2. **块复制拖拽很差** —— 现在是「飞母块左上角 → 固定时长 tween 平移」，原版是「块内抓取 →
   alt 复制态 → 1:1 跟手拖动 → 两红框 + 间距读数 → 弹性落位 → 落位后保持选中框」。

并且 `class="group/item relative flex items-center gap-4 overflow-hidden rounded-2xl"`
（`RecommendedCard.vue` 第 118–143 行的列表行）也必须是同样的拖拽复制效果。该行**没有背景/边框/阴影**，
现有分组算法只认 `box` 条目、且要求组内 ≥3 个，所以它永远不会被复制。

权威依据：本地完整仓库 `D:\我的网站\Swarm Rebuild\swarm-rebuild\swarm.js`（3730 行，用户实际运行版本），
其光标/分组/复制/绘制参数已逐项提取，不再依赖录屏像素抠图。

## 目标文件

| 文件 | 动作 |
| --- | --- |
| `docs/.vitepress/theme/components/swarm/capture.ts` | 重写分组部分：元素节点树 + 真实 `findGroups` 规则 |
| `docs/.vitepress/theme/components/swarm/SwarmRebuild.vue` | 光标渲染重写；`drawBox` / `drawText` / `dupTask` / 落位观感重写；补 CSS |
| `docs/.vitepress/theme/components/RecommendedCard.vue` | 不改（作为验证用例） |

---

## 一、capture.ts：元素节点树 + 真实分组

### 1.1 扫描时建树

`walk` 增加一个节点对象（与 items 同步产出，保持现有裁剪/去重/媒体判定逻辑不变）：

```ts
interface Node {
  el: Element
  depth: number
  fixed: boolean
  box: Rect            // 自己的 geom（文档坐标或视口坐标）
  start: number        // 自身条目在 items 中开始的下标
  end: number          // 自身子树条目结束下标（exclusive）
  items: number[]      // 自身直接产出的条目下标（含根的 text）
  kids: Node[]
}
```

- `emit()` 时把下标压入 `items`；`walk` 进入前记 `start = items.length`，退出前记 `end`。
- `walk` 返回 `Node | null`（被裁剪/隐藏时返回 null），父级 `kids.push`。

### 1.2 `findGroups(node)` —— 照搬原版规则

对每个节点（**先递归子节点**，再做本层分组；内层副本依赖内层母块，外层副本依赖内层 finals）：

1. 若自身已被标记为副本 → 整体跳过，不向下递归。
2. 子节点按签名分桶：
   `sig = tagName.toLowerCase() + '|' + 归一化 className + '|' + (fixed?1:0) + '|' + kindsSig`
   - `kindsSig` = 子树区间内每个条目 `kind` 首字母按顺序拼接（`b` / `t` / `i`）。
   - 归一化 className：去多余空白。Tailwind 类名顺序固定，直接可比。
3. 桶内两两相近判定（`similar(a, b, loose)`）：
   - 高矮比 < 1.8（双向）
   - 宽窄比 < 1.6（双向），`loose` 时只比高
4. 排除项：
   - 子树里**只有一段文本且长度 > 40** 的节点（正文段落不值得整块复制）
   - 子树条目数 < 2 的节点（只有一个纯色块复制没意义）
5. **成员 ≥ 2 即成组**（母块 = 排序后第一个，其余为副本）。
   这正是 `.group/item` 每 slide 两行能成组的关键（旧逻辑要求 ≥3）。
6. 对每个副本：把其子树区间内所有条目标记 `copyOf` 并从任务集摘除，只保留一个 dup 任务；
   `dup.deps` = 母块子树区间内的全部任务。

### 1.3 `SwarmDup` 结构改为「母块内容 + 副本几何」

```ts
export interface SwarmDup {
  master: SwarmItem            // 母块根条目（选中框用）
  masterItems: SwarmItem[]     // 母块子树全部条目（拖拽体内容来源）
  dst: { x: number; y: number; w: number; h: number }   // 副本整体外框
  src: { x: number; y: number; w: number; h: number }   // 抓取源（可能是链式最近副本）
  dx: number                   // dst.x - src.x
  dy: number
  edits: SwarmItem[]           // 与母块内容不一致的副本文本（落位后重打）
}
```

- `edits` 判定：副本 subtree 的 text 条目按出现顺序与母块的 text 条目比对，文本不同即入列。
- 副本的 `dup` 标记挂在 `dst` 位置上的锚条目上（旧实现挂在副本根，保留）。

### 1.4 `MAX_ITEMS` 兜底

保持现有逻辑，但被摘除的副本条目不再参与超量裁剪。

---

## 二、SwarmRebuild.vue：光标

### 2.1 常量与 SVG

```ts
const ARROW_D = 'M4.6 3.9 C4.2 3.1 4.9 2.4 5.7 2.8 L20.6 9.4 C21.5 9.8 21.4 11.1 20.4 11.3 '
             + 'L13.9 12.9 C13.4 13 13 13.4 12.9 13.9 L11.3 20.4 C11.1 21.4 9.8 21.5 9.4 20.6 Z'
const ST = 'stroke="#fff" stroke-width="1.5" stroke-linejoin="round"'
const HOT = { arrow:[5,3.5], dup:[5,3.5], pen:[3,3], 'pen-add':[3,3], 'pen-close':[3,3],
              cross:[12,12], ibeam:[12,12], ew:[12,12], ns:[12,12] }
const COLORS = ['#F24E1E','#A259FF','#1ABCFE','#0ACF83','#FF7262','#FFC700',
                '#9747FF','#E8467C','#14AE5C','#0D99FF','#FF8A00','#00B5CE']
```

`cursorSVG(shape, c)` 返回 `<svg width="28" height="28" viewBox="0 0 28 28">`：

- `arrow`：`<path d=ARROW_D fill=c ${ST}/>`
- `dup`：白色阴影箭头 `transform="translate(4 3.5)" fill="#fff" stroke=c stroke-width="1.3"` + 彩色箭头
- `cross`：`<path d="M12 3.5 V20.5 M3.5 12 H20.5">` 先白 3.6 再彩 1.5 —— **视频里满屏的「＋」**
- `ibeam`：I 形路径 白 3.6 + 彩 1.5

### 2.2 Agent 结构与帧驱动

```ts
interface Agent { el; svg; x; y; vx; vy; angle; press; shape; tween; hot:[number,number] }
```

- `setShape(a, shape)` 换 SVG 内容并更新 `hot` 与 `transformOrigin`。
- 每帧（在现有 raf 内）：
  - 速度估计 → `targetAngle`（`atan2(vy,vx)*180/PI + 128`）；速度 < 30 px/s 不更新；
  - `angle += delta * min(1, dt*8)`，空闲时 `angle` 向 0 衰减；
  - `press = max(0, press - dt*6)`；
  - `svg.style.transform = translate(-hx,-hy) rotate(angle deg) scale(1 - press*0.12)`。
- `click(a)`：`press = 1` + 导航器 70ms。
- 光标本身仍无名牌（原版也没有）；HUD 色点保留。

### 2.3 移动

`moveTo(a, x, y, { speed, drag, bend, onStep })`：
- `dur(s) = clamp(0.12 + sqrt(dist)*0.021, 0.14, 0.9) / (speed||1)`
- `bend = ±rand(0.04, 0.14) * min(dist, 600)`，`off = sin(π*e) * bend` 沿法向叠加
- `e = drag ? easeInOut : easeOut`
- `onStep(cx, cy)` 用于复制时把偏移同步给拖拽体

---

## 三、drawBox / drawText（落位观感）

### drawBox（`cross` 形态）

1. `setShape('cross')` → 飞到元素左上角。
2. `press = 1`；`vis = true`；大块 `styled=false`, `draw={w:0,h:0}`。
3. 求右下角并按视口钳制：若超出右边 16px 内 → `x = max(it.x + min(w,40), right-30)`。
4. `moveTo(end, {speed:0.75, drag:true, bend:0, onStep: it.draw = {w: c.x-it.x, h: c.y-it.y}})`。
5. 未到位的余量用 `0.5s easeOut` 补满 → `draw = null`。
6. `setShape('arrow')` → `wait(rand(180,300))` → `styled = true`（占位/填充交叉淡入）
   → `sfxPlace`（图像额外 `wait(500)`，其它 `wait(350)`）。
7. 选中框保留到下一个任务开始，再淡出。

### drawText（`cross` 形态）

- 宽 < 140 且单行 → `click` 后直接 `type()`。
- 否则 `press` + ghost 框（4 角手柄 + badge + 内部两条测量线）从左上向右下生长（`dw`/`dh`），再 `type()`。
- `type()`：`k = clamp(70/N, 0.06, 1)`；每字 `rand(12,40)ms`，空格 `+rand(0,30)ms`，换行 `+100ms`，
  2.5% 概率 `+rand(80,200)ms`；新字包进 `.sa`（`rgba(13,153,255,.28)`），按预算批量推进。
- caret 颜色改 `currentColor`；`ibeam` 形态打字。

---

## 四、dupTask（核心重写）

```
1. 选源：同组内「已完成的最近副本」（dd 最小）优先，否则母块本体 —— 形成链式复制
2. 抓取点（文档/视口坐标按 fixed 分支）：
   u = { x: sb.x + min(sb.w*0.45, 70) + rand(-8,8),
         y: sb.y + min(sb.h*0.45, 30) + rand(-4,4) }     // 块内偏左上，不是角
3. moveTo(u) → setShape('dup') → click() → press=1
4. 选中框：{ b: srcBox, handles: true, badge: W×H }（0.15~0.3s）
5. 拖拽体：用 masterItems 渲染到 ghost（保持母块坐标），整体 dx/dy 初始 = src→dst 的偏移
   overlay：src 红框 + dst 红框（unionBounds）+ spacing(sb, cb) 间距读数（重叠轴取中线，整数）
6. moveTo({x: u.x + (dst.x - src.x), y: u.y + (dst.y - src.y)},
          { speed: 0.6, drag: true, onStep: 每个 ghost item 的 dx = ox + (c.x - u.x) })
   —— 1:1 跟手，不是定时 tween
7. 落位：sfxPlace('dup')；dx=dy=0 且 settle=true（transform .3s 弹性过渡）
8. setShape('arrow')；overlay 切为 dst 选中框（handles + badge）；wait(350ms) 后淡出
9. 若 edits 非空 → 追加 edit：箭头飞到「块内嵌入点」
   { x: b.x + min(b.w*0.5, 50) + rand(-5,5), y: b.y + min(lineHeight, b.h)*0.55 }
   → 双击 click → 全选高亮（selAll）→ setShape('ibeam') → wait(200~350ms)
   → 文本清零 → type() 逐字 → 恢复
```

- 坏块（母块尚未完成）由 `deps` 卡住，调度层不改。
- `pickTask` 对 dup 任务额外要求 `deps.every(done)`（已有逻辑保留）。

---

## 五、CSS 补齐（同文件 `<style>`）

- `.swarm-agent` 去名牌，`svg` 加 `drop-shadow(0 1px 2px rgba(0,0,0,.28))`。
- `.swarm-r`（占位）`background: var(--ph, #D9D9D9)`；`.swarm-r > .swarm-f`（填充层）
  `opacity 0 → 1`，`background/border/shadow` 过渡 `.35s`，整体 `.22s`。
- `.swarm-md` 媒体 `clip-path: inset(0 0 100% 0)` → `inset(0 0 0 0)`，`.6s cubic-bezier(.2,.75,.2,1)`。
- `.swarm-sa` 只作用于新字（`rgba(13,153,255,.28)`）。
- `.swarm-caret` 宽 1.5px、高 1.1em、`background: currentColor`、1s steps 闪烁。
- `.swarm-outline` 只保留 **4 个角手柄**（8 个 → 4 个）。
- `.swarm-badge`：`padding:1px 4px; radius:2px; font:600 11px/16px Inter`；
  位置 `left = x + w/2; top = y + h + 8` + `translateX(-50%)`。
- `.swarm-outline--red` + `.swarm-gap`（红框间居中间距标签）。
- `.swarm-settle`：`transform .3s cubic-bezier(.2,.9,.25,1.2)`（弹性落位）。

---

## 六、验证

1. `pnpm build`（或 `npx vitepress build docs`）确保无 TS/模板错误。
2. 启 dev server（`pnpm docs:dev`），browser 打开首页 → 等视频开场 → 点「开始」。
3. 逐阶段截图核对：
   - 开场 18 个光标从两侧飞入（多形态、随方向旋转、按压缩放）
   - 绘制块：`＋` 光标 → 从左下/右上拉框 → 灰色占位 → 交叉淡入真身
   - 打字：`I` 形光标 + 新字蓝色高亮 + caret
   - **复制拖拽**：`dup` 光标 → 块内抓取 → 1:1 跟手 → 两红框 + 间距 → 弹性落位 → 选中框停留
   - **「推荐文章」卡片右侧那一行 `.group/item`** 必须出现「留白 → 复制到下一行」的过程
   - 收尾蜂群 + HUD
4. 控制台零错误；`prefers-reduced-motion` 时回退；每次点「开始」可重播；隐藏元素（跑马灯副本、轮播未展示组）不重建。
