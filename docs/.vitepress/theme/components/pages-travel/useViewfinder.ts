import { onMounted, onUnmounted, ref } from 'vue'

/**
 * The four live read-outs in the viewfinder. The source gets them from
 * `@vueuse/core`; this project has no such dependency, so they are
 * re-implemented here with the same contracts.
 */

/** `navigator.onLine`, tracked across online/offline events (`useOnline`). */
export function useOnline() {
  const online = ref(true)
  const update = () => {
    online.value = navigator.onLine
  }

  onMounted(() => {
    update()
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
  })
  onUnmounted(() => {
    window.removeEventListener('online', update)
    window.removeEventListener('offline', update)
  })

  return { online }
}

/** Frames per second over the last second (`useFps`). */
export function useFps(everyMs = 1000) {
  const fps = ref(0)
  let raf = 0
  let frames = 0
  let last = 0

  const loop = () => {
    frames++
    const now = performance.now()
    if (now - last >= everyMs) {
      fps.value = Math.round((frames * 1000) / (now - last))
      frames = 0
      last = now
    }
    raf = requestAnimationFrame(loop)
  }

  onMounted(() => {
    last = performance.now()
    raf = requestAnimationFrame(loop)
  })
  onUnmounted(() => cancelAnimationFrame(raf))

  return { fps }
}

/** `window.devicePixelRatio`, kept in sync with resize (`useDevicePixelRatio`). */
export function usePixelRatio() {
  const pixelRatio = ref(1)
  const update = () => {
    pixelRatio.value = window.devicePixelRatio || 1
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })
  onUnmounted(() => window.removeEventListener('resize', update))

  return { pixelRatio }
}

/**
 * Battery Status API (`useBattery`). Unsupported browsers keep the defaults,
 * exactly like the source — Chromium desktop reports 1 / false here.
 */
export function useBattery() {
  const charging = ref(false)
  const level = ref(1)

  onMounted(async () => {
    const nav = navigator as Navigator & { getBattery?: () => Promise<BatteryManager> }
    if (typeof nav.getBattery !== 'function') return
    try {
      const battery = await nav.getBattery()
      const sync = () => {
        charging.value = battery.charging
        level.value = battery.level
      }
      sync()
      battery.addEventListener('chargingchange', sync)
      battery.addEventListener('levelchange', sync)
    } catch {
      /* keep the defaults */
    }
  })

  return { charging, level }
}
