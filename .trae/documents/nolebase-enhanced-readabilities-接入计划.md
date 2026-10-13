# 接入 `@nolebase/vitepress-plugin-enhanced-readabilities`（全站可见）

## Context

需求：把 `@nolebase/vitepress-plugin-enhanced-readabilities` 接入本站，且**全站每个页面**都能看到「阅读增强」菜单。

官方教程的三步集成（vite 配置 + 样式 + 挂载到导航栏插槽）只对走 `DefaultTheme.Layout` 的页面生效。
本站 `/`、`/pages/posts`、`/pages/tags`、`/pages/case`、`/travel/**` 这五类页面由自定义外壳
[Layout.vue](file:///d:/我的网站/zhangjunjie-cn.github.io/docs/.vitepress/theme/Layout.vue#L61-L81)
接管（自带手写的 `SiteNav.vue` 导航栏），因此插件菜单**在这些页面上不会出现** —— 这正是之前「首页没有 nav-bar」的原因。

用户已明确选择：**全站统一使用 VitePress 原生导航栏**（接受首页等页面顶部外观被替换）。
本计划即按此实现，并尽量把改动面收敛到「只换导航栏」，其余已测好的布局几何保持不变。

## 核心方案：用原生 `VPNav` 替换自定义 `SiteNav`（保留外壳几何）

不改动五类页面的自定义布局机制，只把外壳里的 `<SiteNav />` 换成 VitePress 默认主题的 `<VPNav>`，
并把插件菜单分别挂进两者的导航栏插槽。这样：

- 五类自定义页面与普通文章页都渲染同一个原生导航栏 → 插件菜单天然全局可见。
- 外壳的 `#main` 包裹层（`mx-auto w-full max-w-384 p-6 lg:p-8`）、`pt-16`、`SiteFooter`、
  `.site-shell { overflow-x: clip }`、案例页横幅的负外边距、首页首屏 / 游记的对齐计算**全部保持原样**。
- 需要补一条 CSS：原生 `VPNav` 在 `<960px` 是 `position: relative`（流内），而外壳的 `pt-16` 是按
  「固定导航栏」算的；若不放宽，`<960px` 时会多出 64px 空白，并且首页首屏 / 游记里「滚动量减 64」
  的计算会失效。故把 `VPNav` 在 `<960px` 也固定住，与旧 `SiteNav`（`fixed h-16`）等价。

可行性已验证：`vitepress/package.json` 的 `exports` 含 `"./dist/*": "./dist/*"`，深路径导入
`vitepress/dist/client/theme-default/components/VPNav.vue` 是允许的；`VPNav`（`provide('close-screen')`）
自包含，`useNav` / `useSidebar` / `useData` 均可在外壳内独立工作。

### 与用户已确认效果的差异（需知悉）

- 首页 / 归档 / 标签 / 案例 / 游记的导航栏外观 = 原生样式；`SiteNav` 自带的「搜索文档 Ctrl K」按钮、
  移动端自带面板消失，移动端改为原生汉堡 + 原生侧滑菜单。案例页横幅「压顶 + 文字转白」效果消失。
- **页脚保留 `SiteFooter`**（原生 `themeConfig.footer` 未配置，若一并换成原生等于直接丢掉页脚），
  这是相对「换成原生样式」更小的改动，如不想要可再调整。

## 实施步骤

1. **加依赖**
   - `package.json` 的 `devDependencies` 增加 `"@nolebase/vitepress-plugin-enhanced-readabilities": "^2.18.2"`。
   - 运行 `pnpm install`（会更新 `pnpm-lock.yaml`）。

2. **vite 配置**（[config.mts](file:///d:/我的网站/zhangjunjie-cn.github.io/docs/.vitepress/config.mts#L273-L319) 根级 `vite` 字段，与 `plugins` / `server` 平级）
   - `optimizeDeps.exclude: ['@nolebase/vitepress-plugin-enhanced-readabilities/client', 'vitepress', '@nolebase/ui']`
   - `ssr.noExternal: ['@nolebase/vitepress-plugin-enhanced-readabilities', '@nolebase/ui']`

3. **引入插件样式**（[theme/index.ts](file:///d:/我的网站/zhangjunjie-cn.github.io/docs/.vitepress/theme/index.ts)）
   - 增加 `import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'`
     （其内部已 `@import` `@nolebase/ui/style.css` 与 `./unocss.css`，无需另加）。

4. **Layout.vue：换导航栏 + 挂菜单**（[Layout.vue](file:///d:/我的网站/zhangjunjie-cn.github.io/docs/.vitepress/theme/Layout.vue)）
   - `import VPNav from 'vitepress/dist/client/theme-default/components/VPNav.vue'`
   - 从 `@nolebase/vitepress-plugin-enhanced-readabilities/client` 导入
     `NolebaseEnhancedReadabilitiesMenu`、`NolebaseEnhancedReadabilitiesScreenMenu`。
   - 自定义页分支：`<SiteNav />` → `<VPNav>`，并传入
     `#nav-bar-content-after`（宽屏菜单）与 `#nav-screen-content-after`（移动端菜单）插槽。
   - 文章页分支：在既有 `DefaultTheme.Layout` 上同样加这两个插槽（`#doc-footer-before` 的 `PostFooter` 保持不变）。

5. **CSS：固定原生导航栏 + 清理死样式**（[tailwind.css](file:///d:/我的网站/zhangjunjie-cn.github.io/docs/.vitepress/theme/styles/tailwind.css)）
   - 新增 `@media (max-width: 959px) { .VPNav { position: fixed } }`（保留 `left:0 / width:100% / z-index`，与旧 `SiteNav` 行为一致）。
   - 删除已无引用的 `.site-nav*` / `.site-nav--over-banner` 规则块（约 L759–L795）。

6. **清理死代码**（先 `Grep` 确认无其他引用，再删）
   - 删除 [SiteNav.vue](file:///d:/我的网站/zhangjunjie-cn.github.io/docs/.vitepress/theme/components/SiteNav.vue)；
   - 若 `components/icons/navIcons.ts` 仅被 `SiteNav.vue` 使用，一并删除；
   - `docs/pages/case.md` 的 `overBanner: true`（仅 `SiteNav` 用）与相关注释视 `CaseBanner.vue` 是否引用后再删。

## 验证

1. `pnpm run build` 成功。
2. 在 `docs/.vitepress/dist/**/*.html` 中检索 `EnhancedReadabilitiesMenu` 与 `aria-label="阅读增强"`：
   首页、归档、标签、案例、游记、以及任意文章页（如 `editor/ai/claude-learn.html`）**都应命中**（宽屏菜单为 SSR 渲染；
   `ScreenMenu` 有 `v-if="mounted"`，SSR 不输出属正常）。
3. `pnpm run dev` 目测：
   - 五个自定义页顶部已是原生导航栏，右上角能看到「阅读增强」入口；
   - 文章页原有外观（`PostFooter`）不变；
   - 首页首屏滚动、游记取景器对齐、案例页横幅通栏位置与前一致；
   - 主题切换（明/暗）下插件菜单样式正常；
   - 桌面宽屏与窄屏（`<960px`，移动端汉堡菜单）各看一遍。

## 风险 / 待确认

- 深路径导入 `VPNav.vue` 属 VitePress 内部 API，未来升级 VitePress 时可能失效（当前 1.6.4 可用）。
- 若上述「页脚保留 / 移动端换成原生菜单」与预期不符，或实测有视觉问题，按约定先询问再调整。
