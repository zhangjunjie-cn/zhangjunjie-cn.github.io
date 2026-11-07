<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  BRAND_STORAGE_KEY,
  applyBrandColor,
  clearBrandColor,
  readBrandPreference,
} from './useBrandColor'

/**
 * 侧栏顶部的品牌色偏好区。
 *
 * 形态照 cn.vuejs.org 侧栏的 `class="preference-switch"`：
 *   · 顶部一行标题 + 折叠箭头（原站的 `.toggle`），点一下收起/展开下面的面板；
 *   · 面板是 soft 底、8px 圆角的卡片，里面是「默认式 — 开关 — 自定义 — ?」；
 *   · 开关拨到「自定义」时，下方弹出带小箭头的 `preference-tooltip` 气泡，
 *     里面有 ⓘ 提示文案、Rspress 品牌色板，以及右下角「应用」按钮（关掉气泡）。
 *
 * 气泡里的色板照 rspress.rs/zh/ui/vars「品牌色」那套：容器样式逐字照搬
 * （soft 底 + divider 描边 + 8px 圆角 + 12px 间距 + 12px 16px 内边距），
 * 十个预设色与「彩虹圆」自定义取色也对照 Rspress 的 CssPickerEditor。
 */

interface PresetColor {
  label: string
  color: string
}

/** Rspress 品牌色预设（CssPickerEditor 的 PREDEFINED_COLORS）。 */
const PRESET_COLORS: PresetColor[] = [
  { label: 'Blue', color: '#0095FF' },
  { label: 'Purple', color: '#8B5CF6' },
  { label: 'Pink', color: '#EC4899' },
  { label: 'Red', color: '#EF4444' },
  { label: 'Orange', color: '#F97316' },
  { label: 'Yellow', color: '#EAB308' },
  { label: 'Green', color: '#22C55E' },
  { label: 'Teal', color: '#14B8A6' },
  { label: 'Cyan', color: '#06B6D4' },
  { label: 'Indigo', color: '#6366F1' },
]

/** 自定义模式下首次启用时的颜色（Rspress 默认蓝）。 */
const FALLBACK_COLOR = PRESET_COLORS[0].color

const panelOpen = ref(true)
const custom = ref(false)
const bubbleOpen = ref(false)
const color = ref(FALLBACK_COLOR)

function persist() {
  try {
    localStorage.setItem(
      BRAND_STORAGE_KEY,
      JSON.stringify({ enabled: custom.value, color: color.value }),
    )
  } catch {
    // 隐私模式下 localStorage 不可写，只影响记忆，不影响本次换色。
  }
}

/** 把当前状态落到全局变量，并存档。 */
function commit() {
  if (custom.value) applyBrandColor(color.value)
  else clearBrandColor()
  persist()
}

function setCustom(value: boolean) {
  custom.value = value
  // 打开自定义时把气泡一起弹出，关掉时收起。
  bubbleOpen.value = value
  commit()
}

function toggleCustom() {
  setCustom(!custom.value)
}

function togglePanel() {
  panelOpen.value = !panelOpen.value
  // 面板收起时，气泡没有可指的开关，一并关掉。
  if (!panelOpen.value) bubbleOpen.value = false
}

function selectColor(value: string) {
  color.value = value
  // 在气泡里点任意颜色即视为启用自定义。
  custom.value = true
  commit()
}

function onPickerInput(event: Event) {
  selectColor((event.target as HTMLInputElement).value)
}

function dismiss() {
  bubbleOpen.value = false
}

function isPresetActive(preset: PresetColor) {
  return custom.value && color.value.toLowerCase() === preset.color.toLowerCase()
}

/** 当前颜色不在预设里，才算「自定义取色」在使用中。 */
function isCustomColorActive() {
  return custom.value && !PRESET_COLORS.some((preset) => isPresetActive(preset))
}

onMounted(() => {
  const saved = readBrandPreference()
  if (!saved) return
  // 只恢复状态，不自动弹气泡，免得每次进页面都挡住目录。
  color.value = saved.color
  custom.value = saved.enabled
})
</script>

<template>
  <div class="preference-switch">
    <button
      class="toggle"
      type="button"
      :aria-expanded="panelOpen"
      aria-controls="brand-preference-panel"
      @click="togglePanel"
    >
      <span>品牌色偏好</span>
      <svg
        class="chevron"
        :class="{ open: panelOpen }"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" />
      </svg>
    </button>

    <div v-show="panelOpen" id="brand-preference-panel" class="switch-panel">
      <div class="switch-container">
        <label
          class="mode-label"
          :class="{ active: !custom }"
          @click="setCustom(false)"
        >默认式</label>

        <button
          class="brand-switch"
          role="switch"
          :aria-checked="custom"
          aria-label="切换自定义品牌色"
          :title="custom ? '当前为自定义品牌色' : '当前为默认品牌色'"
          @click="toggleCustom"
        >
          <span class="brand-switch-check" />
        </button>

        <label
          class="mode-label mode-label--right"
          :class="{ active: custom }"
          @click="setCustom(true)"
        >自定义</label>

        <button
          class="switch-link"
          type="button"
          title="品牌色说明"
          aria-label="品牌色说明"
          :aria-expanded="bubbleOpen"
          @click="bubbleOpen = !bubbleOpen"
        >?</button>
      </div>
    </div>

    <hr/>

    <Transition name="fly-in">
      <div v-if="bubbleOpen" class="preference-tooltip">
        <p class="tip-text">
          开启自定义后，全站主色会跟随所选颜色：文章标题、链接、目录高亮与侧栏激活项都会立即变色。
        </p>

        <div class="brand-palette">
          <button
            v-for="preset in PRESET_COLORS"
            :key="preset.label"
            class="brand-swatch"
            :class="{ active: isPresetActive(preset) }"
            type="button"
            :title="preset.label"
            :aria-label="preset.label"
            :style="{ backgroundColor: preset.color, '--swatch': preset.color }"
            @click="selectColor(preset.color)"
          />

          <div class="palette-divider" />

          <div
            class="custom-color"
            :class="{ active: isCustomColorActive() }"
            :style="{ '--swatch': color }"
            title="自定义颜色"
          >
            <input
              type="color"
              :value="color"
              aria-label="自定义颜色"
              @input="onPickerInput"
            />
          </div>
        </div>

        <div class="tip-actions">
          <button class="tip-confirm" type="button" @click="dismiss">应用</button>
        </div>

        <div class="arrow-top" />
        <div class="arrow-top inner" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.preference-switch {
  position: relative;
  /* 和导航栏留出一点呼吸距离（原站是 sticky 的 10px padding-top）。 */
  padding-top: 30px;
  margin-bottom: 10px;
  font-size: 12px;
}

/* 标题 + 折叠箭头，照原站 `.toggle`。 */
.toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 0 2px;
  font-weight: 600;
  color: var(--site-text2);
  background-color: transparent;
  cursor: pointer;
  transition: color 0.5s;
}

.toggle:hover {
  color: var(--site-text1);
}

.chevron {
  transition: transform 0.25s;
}

.chevron.open {
  transform: rotate(180deg);
}

/* 开关行所在的面板（原站 `#preference-switches`）。侧栏本身就是 soft 底，
   这里换成常规底色 + 细描边，卡片关系才看得出来。 */
.switch-panel {
  margin: 8px 0 18px;
  padding: 12px 16px;
  background-color: var(--site-bg);
  border: 1px solid var(--site-divider);
  border-radius: 8px;
  font-weight: 600;
}

.switch-container {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 20px;
}

.mode-label {
  width: 46px;
  color: var(--site-text3);
  cursor: pointer;
  transition: color 0.25s;
  user-select: none;
}

.mode-label--right {
  width: auto;
}

.mode-label.active {
  color: var(--site-text1);
}

/* 滑动开关，尺寸/位移照 VTSwitch（scale(0.8) 之后的 36×20）。 */
.brand-switch {
  position: relative;
  flex: 0 0 auto;
  width: 36px;
  height: 20px;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background-color: var(--site-divider);
  cursor: pointer;
  transition: background-color 0.25s;
}

.brand-switch[aria-checked='true'] {
  background-color: var(--site-main);
}

.brand-switch:focus-visible {
  outline: 2px solid var(--site-main);
  outline-offset: 2px;
}

.brand-switch-check {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.25);
  transition: transform 0.25s;
}

.brand-switch[aria-checked='true'] .brand-switch-check {
  transform: translateX(16px);
}

.switch-link {
  margin-left: auto;
  min-width: 14px;
  height: 14px;
  padding: 0;
  font-size: 11px;
  line-height: 12px;
  text-align: center;
  color: var(--site-main);
  border: 1px solid var(--site-main);
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;
}

.switch-link:hover {
  color: var(--site-bg);
  background-color: var(--site-main);
}

/* 分界线：浏览器默认的 `hr` 是深色 inset 边，换成站点分隔色（淡灰）。 */
hr {
  height: 0;
  border: 0;
  border-top: 1px solid var(--site-divider);
}

/* 气泡：形状、ⓘ 标记与入场动画照 PreferenceTooltip，描边换成站点主色。 */
.preference-tooltip {
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  right: 0;
  z-index: 10;
  padding: 12px 16px 12px 32px;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.6;
  color: var(--site-text2);
  background-color: var(--site-bg);
  border: 1px solid var(--site-main);
  border-radius: 8px;
  box-shadow: var(--vp-shadow-3);
}

.preference-tooltip::before {
  content: 'ⓘ';
  position: absolute;
  top: 8px;
  left: 12px;
  font-weight: 600;
  font-size: 14px;
}

.tip-text {
  margin: 0 0 10px;
}

/* Rspress「品牌色」面板：样式逐字照搬 rspress.rs/zh/ui/vars。 */
.brand-palette {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 16px;
  background-color: var(--site-bg-soft);
  border: 1px solid var(--site-divider);
  border-radius: 8px;
}

/* 预设色圆点，选中时留一圈底色再套一圈本色（同 Rspress 的 active 阴影）。 */
.brand-swatch {
  width: 20px;
  height: 20px;
  padding: 0;
  border: 1px solid rgb(0 0 0 / 0.1);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.brand-swatch.active {
  transform: scale(1.1);
  box-shadow: 0 0 0 2px var(--site-bg-soft), 0 0 0 4px var(--swatch);
}

.palette-divider {
  width: 1px;
  height: 20px;
  background-color: var(--site-divider);
}

/* 彩虹圆 = 自定义取色，原生取色器铺满且透明，点哪都能唤起系统色板。 */
.custom-color {
  position: relative;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: conic-gradient(red, orange, yellow, green, blue, purple, red);
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.custom-color.active {
  transform: scale(1.1);
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.1),
    0 0 0 2px var(--site-bg-soft), 0 0 0 4px var(--swatch);
}

.custom-color input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  opacity: 0;
  cursor: pointer;
}

/* 右下角的「确定」，照原站「知道了」那颗主色按钮。 */
.tip-actions {
  display: flex;
  justify-content: flex-end;
}

.tip-confirm {
  padding: 2px 10px;
  font-weight: 500;
  font-size: 12px;
  color: #fff;
  background-color: var(--site-main);
  border-radius: 6px;
  box-shadow: var(--vp-shadow-2);
  cursor: pointer;
  transition: filter 0.2s;
}

.tip-confirm:hover {
  filter: brightness(1.08);
}

.arrow-top {
  position: absolute;
  top: -16px;
  left: 80px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom: 9px solid var(--site-main);
}

.arrow-top.inner {
  top: -14px;
  border-bottom-color: var(--site-bg);
}

.fly-in-enter-active {
  transition: all 0.2s ease-out;
}

.fly-in-leave-active {
  transition: all 0.15s ease-in;
}

.fly-in-enter-from,
.fly-in-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>

<style>
/* 暗色下换成更轻的投影（与默认主题 `.dark .VPSidebar` 的做法一致）。
   单开一个非 scoped 块，`:global(.dark)` 写在 scoped 里会被编译丢掉后半截。 */
.dark .preference-tooltip {
  box-shadow: var(--vp-shadow-1);
}
</style>
