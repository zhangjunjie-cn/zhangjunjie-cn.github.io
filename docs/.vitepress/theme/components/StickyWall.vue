<template>
  <div class="sticky-wall-container" :class="{ 'has-maximized-card': activeMaximizedCard, 'is-mobile': isMobile }">
    <div id="board" ref="board">
      <div 
        v-for="card in cards" 
        :key="card.id"
        class="card" 
        :class="{ dragging: card.dragging, maximized: card.maximized }"
        :style="{
          background: card.color,
          left: card.maximized ? 0 : card.left + 'px',
          top: card.maximized ? 0 : card.top + 'px',
          opacity: card.opacity,
          zIndex: card.zIndex,
          transform: `scale(${card.scale}) rotate(${card.angle}deg)`,
          position: card.maximized ? 'fixed' : 'absolute',
          width: card.maximized ? '100vw' : '',
          height: card.maximized ? '100dvh' : '',
          borderRadius: card.maximized ? 0 : ''
        }"
        @pointerdown="handleCardPointerDown($event, card)"
        @dblclick="toggleMaximize(card)"
      >
        <div class="card-header" :class="{ dragging: card.dragging }">
          <div class="window-controls">
            <button class="control close" type="button" aria-label="关闭" @click.stop="closeCard(card)"></button>
            <button class="control minimize" type="button" aria-label="最小化" @click.stop="minimizeCard(card)"></button>
            <button class="control maximize" type="button" aria-label="最大化" @click.stop="toggleMaximize(card)"></button>
          </div>
          <div class="card-title">温馨提示</div>
        </div>
        <div class="card-body">{{ card.message }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const messages = [
  '保持好心情',
  '多喝水哦',
  '今天辛苦啦',
  '早点休息',
  '记得吃水果',
  '加油，你可以的',
  '祝你顺利',
  '保持微笑呀',
  '愿所有烦恼都消失',
  '期待下一次见面',
  '梦想总会实现',
  '天气冷了，多穿衣服',
  '记得给自己放松',
  '每天都要元气满满',
  '今天也要好好爱自己',
  '适当休息一下'
]

const colors = [
  '#ffe0e3',
  '#c7f0ff',
  '#ffd8a8',
  '#d9f2d9',
  '#e5d7ff',
  '#f9f7d9',
  '#d2f0f8',
  '#ffd4f5'
]

const cards = ref([])
const activeMaximizedCard = ref(null)
const isMobile = ref(false)
const board = ref(null)
const MAXIMIZED_LAYER = 1000000
const pointerMediaQuery = ref(null)
const maxCards = ref(180)
const initialCardCount = ref(30)
const spawnInterval = ref(400)
const zIndexCursor = ref(200)
let spawnTimer = null

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function bringToFront(card) {
  if (card === activeMaximizedCard.value) {
    card.zIndex = MAXIMIZED_LAYER
    return
  }

  zIndexCursor.value += 1
  if (activeMaximizedCard.value && zIndexCursor.value >= MAXIMIZED_LAYER) {
    zIndexCursor.value = MAXIMIZED_LAYER - 1
  }

  card.zIndex = zIndexCursor.value
}

function scheduleNextSpawn() {
  clearTimeout(spawnTimer)
  spawnTimer = setTimeout(() => {
    if (!document.hidden) {
      createCard()
    }
    scheduleNextSpawn()
  }, spawnInterval.value)
}

function syncMobileMode() {
  const nextIsMobile = pointerMediaQuery.value.matches || window.innerWidth <= 768
  if (nextIsMobile === isMobile.value) return

  isMobile.value = nextIsMobile
  maxCards.value = isMobile.value ? 120 : 180
  spawnInterval.value = isMobile.value ? 700 : 400
  scheduleNextSpawn()
}

function handleVisibilityChange() {
  if (!document.hidden) {
    scheduleNextSpawn()
  }
}

function handleCardPointerDown(event, card) {
  const control = event.target.closest('.control')
  const header = event.target.closest('.card-header')
  const pointerType = event.pointerType || 'mouse'
  const isPrimaryPointer = event.isPrimary !== false

  if (header && !control && pointerType !== 'touch' && isPrimaryPointer) {
    startDrag(event, card)
    return
  }

  bringToFront(card)
}

function createCard() {
  const angleRange = isMobile.value ? 6 : 10
  const angle = (Math.random() - 0.5) * angleRange
  const entryScale = isMobile.value ? 0.8 : 0.65
  const cardWidth = isMobile.value ? 180 : 220
  const cardHeight = isMobile.value ? 130 : 140
  const horizontalMargin = isMobile.value ? 12 : 16
  const verticalMargin = isMobile.value ? 12 : 20
  const left = horizontalMargin + Math.random() * Math.max(window.innerWidth - cardWidth - horizontalMargin * 2, 0)
  const top = verticalMargin + Math.random() * Math.max(window.innerHeight - cardHeight - verticalMargin * 2, 0)

  const card = {
    id: Date.now() + Math.random(),
    color: randomFrom(colors),
    message: randomFrom(messages),
    angle,
    scale: entryScale,
    left,
    top,
    opacity: 0,
    zIndex: ++zIndexCursor.value,
    maximized: false,
    dragging: false,
    closing: false,
    beforeMaximize: null,
    dragOffsetX: 0,
    dragOffsetY: 0
  }

  if (activeMaximizedCard.value && zIndexCursor.value >= MAXIMIZED_LAYER - 2) {
    zIndexCursor.value = MAXIMIZED_LAYER - 2
  }

  cards.value.push(card)

  // 入场动画
  setTimeout(() => {
    card.scale = 1
    card.opacity = 1
  }, 10)

  // 限制卡片数量
  if (cards.value.length > maxCards.value) {
    cards.value.shift()
  }
}

function closeCard(card) {
  if (card.closing) return
  if (card === activeMaximizedCard.value) {
    activeMaximizedCard.value = null
  }
  card.closing = true
  card.scale = 0.1
  card.opacity = 0

  setTimeout(() => {
    cards.value = cards.value.filter(c => c.id !== card.id)
  }, 350)
}

function minimizeCard(card) {
  if (card.closing) return

  const runMinimize = () => {
    card.closing = true
    bringToFront(card)
    const bottom = Math.max(window.innerHeight - 24, 0)
    const targetLeft = clamp(
      card.left,
      16,
      Math.max(window.innerWidth - 220 - 16, 16)
    )

    card.left = targetLeft
    card.top = bottom
    card.scale = 0.1
    card.angle = 0

    setTimeout(() => {
      cards.value = cards.value.filter(c => c.id !== card.id)
    }, 350)
  }

  if (card.maximized) {
    restoreFromMaximize(card)
    setTimeout(runMinimize, 50)
    return
  }

  runMinimize()
}

function toggleMaximize(card) {
  if (card.closing) return

  if (card.maximized) {
    restoreFromMaximize(card)
  } else {
    maximizeCard(card)
  }
}

function maximizeCard(card) {
  if (activeMaximizedCard.value && activeMaximizedCard.value !== card) {
    restoreFromMaximize(activeMaximizedCard.value)
  }

  card.beforeMaximize = {
    left: card.left,
    top: card.top,
    scale: card.scale,
    angle: card.angle
  }

  card.maximized = true
  card.scale = 1
  card.angle = 0
  activeMaximizedCard.value = card
  bringToFront(card)
}

function restoreFromMaximize(card) {
  const previous = card.beforeMaximize
  if (!previous) return

  card.maximized = false
  card.left = previous.left
  card.top = previous.top
  card.scale = previous.scale
  card.angle = previous.angle
  
  if (activeMaximizedCard.value === card) {
    activeMaximizedCard.value = null
  }
  bringToFront(card)
}

function startDrag(event, card) {
  if (card.closing || card.maximized) return

  event.preventDefault()
  bringToFront(card)

  card.dragging = true
  card.dragOffsetX = event.clientX - card.left
  card.dragOffsetY = event.clientY - card.top

  let dragFrame = null
  let pendingLeft = card.left
  let pendingTop = card.top

  const commitDrag = () => {
    dragFrame = null
    const maxLeft = Math.max(window.innerWidth - 220, 0)
    const maxTop = Math.max(window.innerHeight - 140, 0)
    card.left = clamp(pendingLeft, -220 * 0.4, maxLeft)
    card.top = clamp(pendingTop, -140 * 0.4, maxTop)
  }

  const handlePointerMove = (moveEvent) => {
    if (!card.dragging) return

    pendingLeft = moveEvent.clientX - card.dragOffsetX
    pendingTop = moveEvent.clientY - card.dragOffsetY
    if (dragFrame === null) {
      dragFrame = requestAnimationFrame(commitDrag)
    }
  }

  const handlePointerUp = () => {
    card.dragging = false
    if (dragFrame !== null) {
      cancelAnimationFrame(dragFrame)
      commitDrag()
    }
    document.removeEventListener('pointermove', handlePointerMove)
    document.removeEventListener('pointerup', handlePointerUp)
  }

  document.addEventListener('pointermove', handlePointerMove)
  document.addEventListener('pointerup', handlePointerUp)
}

onMounted(() => {
  pointerMediaQuery.value = window.matchMedia('(pointer: coarse)')
  isMobile.value = pointerMediaQuery.value.matches || window.innerWidth <= 768
  maxCards.value = isMobile.value ? 120 : 180
  spawnInterval.value = isMobile.value ? 700 : 400
  initialCardCount.value = isMobile.value ? 18 : 30

  // 初始化卡片
  for (let i = 0; i < initialCardCount.value; i++) {
    setTimeout(() => createCard(), i * (isMobile.value ? 60 : 40))
  }

  scheduleNextSpawn()

  // 事件监听
  if (typeof pointerMediaQuery.value.addEventListener === 'function') {
    pointerMediaQuery.value.addEventListener('change', syncMobileMode)
  } else if (typeof pointerMediaQuery.value.addListener === 'function') {
    pointerMediaQuery.value.addListener(syncMobileMode)
  }

  window.addEventListener('resize', syncMobileMode)
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  clearTimeout(spawnTimer)
  if (pointerMediaQuery.value) {
    if (typeof pointerMediaQuery.value.removeEventListener === 'function') {
      pointerMediaQuery.value.removeEventListener('change', syncMobileMode)
    } else if (typeof pointerMediaQuery.value.removeListener === 'function') {
      pointerMediaQuery.value.removeListener(syncMobileMode)
    }
  }
  window.removeEventListener('resize', syncMobileMode)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.sticky-wall-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-image: linear-gradient(0deg, #eee 1px, transparent 0),
    linear-gradient(90deg, #eee 1px, transparent 0);
  background-size: 30px 30px;
  color: #333;
  min-height: 100dvh;
  overflow: hidden;
}

.sticky-wall-container.has-maximized-card {
  overflow: hidden;
}

.sticky-wall-container.is-mobile {
  overflow-y: auto;
}

#board {
  position: relative;
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
}

.sticky-wall-container.is-mobile #board {
  height: auto;
  min-height: 100dvh;
}

.card {
  position: absolute;
  width: 220px;
  border-radius: 12px;
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.2);
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden;
  opacity: 0;
  transform-origin: center;
  transition: transform 0.35s ease, opacity 0.35s ease, left 0.35s ease,
    top 0.35s ease, width 0.35s ease, height 0.35s ease,
    border-radius 0.35s ease;
}

.card.dragging {
  transition: none;
  box-shadow: 0 22px 45px rgba(0, 0, 0, 0.35);
}

.card.maximized {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  border-radius: 0;
  box-shadow: 0 28px 60px rgba(0, 0, 0, 0.4);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.7);
  cursor: grab;
  user-select: none;
  touch-action: pan-y;
}

.card-header.dragging {
  cursor: grabbing;
}

.window-controls {
  display: flex;
  align-items: center;
  gap: 6px;
}

.window-controls .control {
  position: relative;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #ccc;
  cursor: pointer;
  outline: none;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.window-controls .control.close {
  background: #ff5f57;
  border-color: #e0443e;
}

.window-controls .control.minimize {
  background: #febb2e;
  border-color: #dea123;
}

.window-controls .control.maximize {
  background: #28c840;
  border-color: #1aab2c;
}

.window-controls .control::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.card-header:hover .window-controls .control::after {
  opacity: 0.8;
}

.window-controls .control.close::after {
  content: '×';
  width: auto;
  height: auto;
  background: none;
  font-size: 10px;
  line-height: 1;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.7);
}

.window-controls .control.minimize::after {
  width: 6px;
  height: 2px;
  background: rgba(0, 0, 0, 0.6);
}

.window-controls .control.maximize::after {
  width: 6px;
  height: 6px;
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.6) 45%,
    transparent 45%,
    transparent 55%,
    rgba(0, 0, 0, 0.6) 55%,
    rgba(0, 0, 0, 0.6) 100%
  );
}

.card-title {
  font-size: 13px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.55);
  padding-left: 10px;
  flex: 1;
}

.card-body {
  padding: 16px;
  font-size: 16px;
  line-height: 1.4;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.72);
  word-break: break-word;
  overflow-wrap: anywhere;
  white-space: normal;
}

.card.maximized {
  display: flex;
  flex-direction: column;
}

.card.maximized .card-title {
  display: none;
}

.card.maximized .card-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  padding: clamp(32px, min(10vw, 10vh), 128px);
  padding-top: clamp(72px, min(14vw, 14vh), 192px);
  font-size: clamp(48px, min(18vw, 18vh), 200px);
  line-height: 1.05;
}

@media (max-width: 768px) {
  .card {
    width: 180px;
    border-radius: 10px;
  }

  .card-body {
    padding: 14px;
    font-size: 14px;
  }

  .card-title {
    font-size: 12px;
  }
}
</style>