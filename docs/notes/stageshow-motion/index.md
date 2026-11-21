---
title: 一次动效复盘：从 stageshow 到导航胶囊的 0.7 秒
date: 2026-11-21
lastUpdated: 2026-11-21T16:00:00+08:00
description: 把 benjitaylor/skills 里的 stageshow 提示词接进工作流，重做导航胶囊与一批页面动效：单段 0.7s、内容贴左、胶囊收到 max-content，以及逐帧采样验证的全过程。
tags:
  - 动效
  - VitePress
---

# 一次动效复盘：从 stageshow 到导航胶囊的 0.7 秒

<NolebasePageProperties />

这个站点的导航栏一直有个说不上来的别扭：下拉之后会变成一颗胶囊，但「变短」这一步总像被人按了快进，搜索框还会先往右跑、再往左弹回来。我换了三版实现，每版都只是「看起来近了一点」，直到把 [benjitaylor/skills](https://github.com/benjitaylor/skills) 里的 `stageshow` 技能接进工作流，才把问题拆成可以逐帧核对的事实。

这篇文章记录三件事：这个技能到底给了什么约束、这些约束落成了哪些具体改动、以及最后怎么证明它真的对了。

## 一、先看技能本身

`stageshow` 是一个面向 AI 编码代理的「伪产品界面 / 动效演示」技能。它的入口是仓库里的 `stageshow/SKILL.md`（版本 1.1.1，约 1.9 万字符），靠一段极长的提示词约束代理的审美与工作顺序。

触发器写在 frontmatter 的 `description` 里，原文如下：

```yaml
name: stageshow
description: Build faux product UI that looks like a real product, as a still illustration or an animated demo with a cursor. Browser and app windows, dashboards, phones, notifications, terminals, bento grids and cursor walkthroughs, framed, masked and cropped the way a marketing page, feature card or docs hero needs them. Use whenever someone wants a fake or mocked UI, a product demo or walkthrough animation, a hero or feature-card illustration of an app, a product shot in the style of a polished marketing site, or an animated cursor doing things in an interface, even if they never say "faux UI". React and plain CSS.
metadata:
  version: 1.1.1
```

真正影响这次改动的，是正文开头的「The one idea」：

> It reads as a real product, simplified to what the viewer needs, framed with intent, and **every motion has a cause**.

它列了五种失败形态，我几乎每条都踩过：

- **Too much**：什么都塞，细节越多越像生成的。
- **Wireframe**：本体做得太小，又把「让人认出来」的东西削掉了。
- **Boxed**：整个窗口缩进卡片，四周留一样的边距，像贴了张截图。
- **Flat**：每个物体一样重，眼睛没有落点。
- **Bland**：灰窗口加个光标，不管需求里说的气质。

工作流部分给了五步，顺序本身就是约束：

1. **Medium and place**：先定「静止还是动画、放在哪、多宽」，并按实际展示尺寸设计。
2. **Look**：拿产品自己的 token、图标、chrome 去映射，而不是套模板。
3. **The story**：三到五个 beat 加一个 payoff，十到十六秒；**没有解释不了的位移，数据在视野里不能无故倒带**。
4. **Start from an example**：先照最接近的金标准示例拍一版，再换成自己的内容。
5. **框选与验证**：裁切、配音、逐帧检查（仓库里配了 `film.mjs`、`jumps.mjs`、`layout.mjs`、`class-clash.mjs` 等脚本）。

一句话概括它给我的东西：**不要凭感觉调动画，先把动作写成可验证的命题，再逐帧证明**。对写代码的人来说，这比任何「丝滑一点」的建议都管用。

## 二、它把胶囊问题重写成了什么

原来的描述是「不丝滑」「有延迟」「搜索框乱跑」。按技能里「每个动作都要有原因」的约束，我把这些感受翻译成了五个可测量的命题：

| 感受 | 可测量的命题 |
|---|---|
| 左右收缩看不出来 | 容器宽度是否在一段时间内连续变化，而不是一帧到位的硬切 |
| 不丝滑 | 所有属性是否共用同一条时长和缓动，而不是各跑各的 |
| 搜索框先右后左 | 搜索按钮的 `left` 是否随时间单调递增 |
| 入胶囊有停顿 | 是否存在第二段延迟或分段关键帧 |
| 胶囊里右边空一块 | 胶囊右缘到最后一项的间距是否只剩内边距 |

参考站 `zhangjunjiee.netlify.app` 的实测给出了标尺（视口 1630）：

- `.wrapper` 的 `max-width` 从 1280 收到 832，左右两边同时内收；
- 全部属性共用一条 `0.7s cubic-bezier(0.16, 1, 0.3, 1)`，**没有延迟、没有第二段**；
- 高度 64 → 48、圆角 0 → 28.8px、内边距 8px → `0 6px 0 16px`、底色 transparent → 60% 白；
- `backdrop-filter: blur(40px)` 是瞬时的，根本不在 `transition` 列表里；
- 内容**贴左**，容器一收窄，整排项目被左边缘推着往右漂；
- 没有任何 `transform`、`scale` 或 `width` 动画。

这六条就是我最终要满足的验收条件。

## 三、措施：一批「短、单段、有原因」的改动

除了胶囊，同期还有一批页面动效按同一套标准被动过。数值都是改完代码后的实际值：

| 位置 | 改前 | 改后 |
|---|---|---|
| 卡片入场错开（`motion.ts`） | `stagger` 60ms | 100ms，落在 80–120ms 的舒适区中段 |
| 推荐卡拖拽（`RecommendedCard.vue`） | 只能点、不能拖 | 过坎阈值 `max(50px, 视口宽 × 20%)`，未过坎 `resume()` 续播，松手 `500ms ease-in-out` 回弹；位移超过 6px 拦截 click，避免误触链接 |
| 路由骨架（`RouteSkeleton.vue`） | 离场 220ms | 200ms `ease-in`，与 600ms 内容入场衔接 |
| 正文图片（`Layout.vue`） | 加载后直接出现 | 未加载完的 `.vp-doc img` 先 `opacity: 0` + 软底色占位，`load` 后 `300ms ease` 淡入；已缓存的图（`naturalWidth ≠ 0`）不挂类，避免重播 |
| 案例横幅（`CaseBanner.vue`） | 无视差 | 滚动进度 0→1 映射 `translate3d(0, 0→-40px, 0)`，rAF 合帧、passive 监听；四段元信息 0/60/120/180ms 错开，统一 `0.6s cubic-bezier(.25,.8,.25,1)`、`translateY 12px→0` |
| 游记记忆卡（`MemoryList.vue`） | 挂载即播，`min(index × 0.05, 0.5)s` 延迟 | 改由 `useReveal` 滚入视口才播；首屏（`top ≤ 0.92 × 视口高`）不动；同帧按 DOM 序错开 100ms、封顶 280ms，上浮 16px、时长 800ms |

共同取向只有一句话：把「一次性全量动画」改成「滚动或交互驱动 + 短时长缓出 + 小位移」，并且统一走 `prefers-reduced-motion` 降级。

胶囊部分则单独拆开改，下面细说。

### 1. 顶部态必须和 `/pages/tags` 完全一致

这是返工最多的一条。我先后把顶部容器做成 1280px 居中、又改成满宽加 `0.75rem` 内边距，都被否掉：前者左右凭空多出内边距，后者干脆没了间距。

最后回到 VitePress 的默认几何：

```css
:is(.VPNavBar.home, .site-shell--over-banner .VPNavBar) .wrapper {
  margin: 0 auto;
  max-width: 100%;
  padding: 0 8px 0 24px;
  transition: padding 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

@media (min-width: 768px) {
  :is(.VPNavBar.home, .site-shell--over-banner .VPNavBar) .wrapper {
    padding: 0 32px;
  }
}
```

`.container` 仍是 `max-width: calc(var(--vp-layout-max-width) - 64px)` 并居中（本站 `--vp-layout-max-width: 1536px`，即 1472px）。tags 页走的是 `has-sidebar` 那套 `(100% - (1536 - 64)) / 2` 的内边距计算，在 1645 视口下是 86.5px；默认非侧栏几何在视觉上正好落在同一位置。**两种写法等价，就不用再造一个假容器**。

case 页原来带侧栏，走的是 `has-sidebar` 的「标题绝对定位 + 内容左右留白」布局，胶囊和首页对不上；在 frontmatter 里加 `sidebar: false` 就解决了。

### 2. 单段 0.7s，所有属性同起同落

之前试过「先成型 0.28s、`max-width` 延迟 0.2s 再缩 0.26s」的两拍方案。computed style 确实显示延迟生效了，但拆完参考站才发现它根本没有第二段，于是整段回退：

```css
:is(.VPNavBar.home, .site-shell--over-banner .VPNavBar) .container {
  /* ……顶部态：透明、直角、无阴影 */
  interpolate-size: allow-keywords;
  transition:
    max-width 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    height 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    padding 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    background-color 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    border-radius 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
```

毛玻璃刻意不做过渡——参考站的 `blur(40px)` 也是瞬时的，跟着抄。case 页顶部压着深色大图，文字由白转黑和底色必须同时到位，所以那一页的 transition 列表里去掉了 `background-color`，让底色直接落位。

### 3. 内容贴左，搜索框才不会来回跑

搜索框「先跑右再跑左」的根因是：`flex-grow` 从 1 收到 0 与容器收缩时序不同步，按钮的 x 坐标等于 `(容器左缘 − 按钮宽) × (1 − flex-grow)`，过程中先增后减。

参考站的解法很直接：内容整体贴左，容器收窄时左边缘带着整排往右漂。

```css
:is(.VPNavBar.home, .site-shell--over-banner .VPNavBar):not(.top) .content-body {
  justify-content: flex-start;
}

:is(.VPNavBar.home, .site-shell--over-banner .VPNavBar):not(.top) .search {
  flex-grow: 0;
  padding-left: 0.5rem;
}
```

之前那条 `transform: translateX(-20px)` 也删掉了——它会让项目往左飘，和参考站方向相反。

### 4. 胶囊收到 `max-content`，不再写死宽度

第一版胶囊固定 872px，右端会剩下约 40px 空白（更早还量到过 107px，其中大半其实是 `关于` 后面的主题切换和阅读增强两个按钮）。正确做法是让胶囊自己量内容：

```css
body :is(.VPNavBar.home, .site-shell--over-banner .VPNavBar):not(.top) .container {
  max-width: max-content !important;
  height: 3rem;
  padding: 0 0.375rem 0 1rem;
  border-radius: 1.8rem;
  background-color: color-mix(in oklab, var(--navbar-bg) 60%, transparent);
  box-shadow:
    0 0 0 0.5px color-mix(in oklab, var(--navbar-border) 50%, transparent),
    0 2px 16px -6px rgba(0, 0, 0, 0.08),
    0 0 0 0.5px rgba(0, 0, 0, 0.02);
  -webkit-backdrop-filter: blur(40px);
  backdrop-filter: blur(40px) !important;
}
```

`max-content` 是关键字，默认不可插值；基础规则里那句 `interpolate-size: allow-keywords` 就是为它准备的，否则 0.7s 的收缩会退化成硬切。

两个细节：

- `!important` 配合 `body` 前级，优先级被抬到 (0,4,1)，刚好压过阅读增强插件改 `.container` 的那条 (0,4,0)，胶囊宽度不会随「全宽 / 原始 / 页面宽度」三种布局模式抖动。
- `:not(.top)` 只在滚动后生效，顶部态仍然把 `max-width` 留给插件，所以三种布局切换的观感与 tags 页一致。

实测胶囊宽 **831.91px**——自然宽度碰巧就是参考站的 832，右缘距最后一个控件（阅读增强按钮）只剩 6px 的 `padding-right`，内部再没有任何空位。

## 四、为什么右侧看起来「慢半拍」

这是被问得最多的一句：胶囊成型后，右边好像还有一段延迟收缩。

它不是延迟，是 **ease-out 曲线的尾巴**。对 0.7s 的过渡逐帧采样，容器宽度序列是：

```text
1493 → 1424 → 1357 → 1296 → 1241 → 1191 → 1146 → 1107 → 1072
     → 1042 → 1016 → 993 → 972 → 954 → 939 → 925 → 913 → 902 → 832
```

单调、连续，没有第二段。`cubic-bezier(0.16, 1, 0.3, 1)` 前段快、后段极缓，最后几十像素要走完剩下的时间；左侧早就贴着内容停住了，右侧还在慢慢收，看起来就像「晚了一步」。

顺带一提，同一次采样里搜索按钮的 `left` 从 583 变到 623.09，全程递增，没有回退——这是「先右后左」被修掉的直接证据。

## 五、怎么证明它对了

技能里「先写计划、再逐帧验证」的约束，最后落成了三层检查：

1. **computed style**：确认 `.container` 的 transition 是六条 0.7s 同曲线，没有 `delay`，`backdrop-filter` 不在列表里。
2. **逐帧采样**：用 `requestAnimationFrame` 在滚动后连续读 `getBoundingClientRect()`，检查宽度序列单调、相邻帧差值不出现「跳变再回退」。
3. **溢出检查**：胶囊左右边缘、最后一项的右边缘、搜索按钮的 x 坐标一起量，确认没有项目越出胶囊、右侧只剩内边距。

最后 `npm run build` 通过（24.91s），只有原有的 chunk 体积与循环依赖警告。

## 六、代价与取舍

- **兼容性**：`interpolate-size` 目前是 Chrome 129+ / 新版 Safari 的能力。不支持的浏览器里，胶囊会直接跳到 832px，不再播放收缩动画，但不会留下空位。也就是说，**功能不退化，只是少了一段动画**。
- **宽度依赖内容**：`max-content` 让胶囊宽度跟着导航项走，以后加一个链接，胶囊会自然变宽，不用再回来改魔法数字。
- **不做 JS 测量**：没有用 ResizeObserver 去算宽度，只用了一个 CSS 关键字加一个 `interpolate-size`，少一个运行时监听就少一处可能和滚动打架的地方。

## 七、这套方法留下了什么

回头看，`stageshow` 真正有用的不是那堆示例，而是三句可以套在任何动效上的话：

1. **先写计划再写代码**：放在哪、主角是谁、动作是什么、payoff 是什么、什么可以删掉。
2. **每个动作都要有原因**：没有解释不了的位移；「数据不能无故倒带」。
3. **按最挑剔的设计师的眼睛验收**：能想象出对方截图发回来说「这是什么」的那一处，就是下一个要修的地方。

胶囊这一版之所以能收尾，不是因为终于调出了「丝滑」的手感，而是因为每个感受都被换成了可以采样、可以对比、可以否决的数字。0.7 秒、832px、单调递增的 583 → 623——这些数字比「好看多了」可靠得多。
