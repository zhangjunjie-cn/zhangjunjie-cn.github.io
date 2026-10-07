import { onUnmounted, ref, type CSSProperties } from 'vue'

/**
 * The floating box in the tag cloud — the ring that jumps onto whichever pill
 * the pointer is over. Shared by `/pages/tags` and `/pages/posts`, because the
 * original runs the very same wiring on both.
 *
 * Measured on the live page (both routes):
 *
 *   · pointer away   — `opacity: 0`, box `0×0`; the selected pill keeps its own
 *                      `border-main!` instead.
 *   · pointer enters — the ring lands on that pill's offset box inside the cloud
 *                      (`offsetLeft/offsetTop/offsetWidth/offsetHeight`), fades
 *                      in, and `scale-120` pops it; 600ms later the class drops
 *                      back to `scale-100` and the 600ms spring settles it.
 *   · pointer leaves — the ring fades out where it stands and the selected
 *                      pill's border takes over again.
 *
 * While a pill is hovered the selected pill drops its own border, so the ring
 * is never doubled up with a static outline.
 */
export function useTagRing() {
  const ringStyle = ref<CSSProperties>({
    left: '0px',
    top: '0px',
    width: '0px',
    height: '0px',
    opacity: 0,
  })
  /** Label of the pill under the pointer; `''` when the pointer is off the cloud. */
  const hovered = ref('')
  /** Drives the one-off `scale-120` pop. */
  const popped = ref(false)

  let popTimer: number | null = null

  function moveTo(pill: HTMLElement) {
    ringStyle.value = {
      left: `${pill.offsetLeft}px`,
      top: `${pill.offsetTop}px`,
      width: `${pill.offsetWidth}px`,
      height: `${pill.offsetHeight}px`,
      opacity: 1,
    }
  }

  function enter(event: MouseEvent, label: string) {
    const pill = event.currentTarget as HTMLElement | null
    if (!pill) return
    hovered.value = label
    popped.value = true
    if (popTimer !== null) window.clearTimeout(popTimer)
    moveTo(pill)
    popTimer = window.setTimeout(() => {
      popTimer = null
      popped.value = false
    }, 600)
  }

  function leave() {
    ringStyle.value = { ...ringStyle.value, opacity: 0 }
    popped.value = false
    hovered.value = ''
    if (popTimer !== null) window.clearTimeout(popTimer)
    popTimer = null
  }

  onUnmounted(() => {
    if (popTimer !== null) window.clearTimeout(popTimer)
  })

  return { ringStyle, hovered, popped, enter, leave }
}
