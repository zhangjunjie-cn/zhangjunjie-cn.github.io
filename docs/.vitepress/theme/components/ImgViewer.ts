import type { FancyboxOptions } from '@fancyapps/ui'
import { nextTick } from 'vue'

import '@fancyapps/ui/dist/fancybox/fancybox.css'

/**
 * Fancybox — the full-screen viewer the source site uses for its article images,
 * wired the way its author documents it
 * (note.weizwz.com/vitepress/extend/vitepress-fancybox).
 *
 * VitePress never fires a Vue `update` on navigation, so re-binding hangs off the
 * router hooks instead: `onBeforeRouteChange` tears down, `onAfterRouteChange`
 * re-binds, and `Layout.vue` covers the very first mount (the router hooks only
 * run for a navigation).
 */

/**
 * `not` is the original's own opt-out marker, and `no-preview` is the one Teek
 * ships on its card covers (`docs/pages/case.md` keeps them verbatim). Ours goes
 * on images the gallery components already own, where a click means something
 * else: a deck card opens the viewfinder, a thumbnail selects it, and the
 * viewfinder's photo opens the whole memory list through `showGallery()`.
 */
const SELECTOR =
  '.vp-doc img:not(.not):not(.no-preview):not([src^="https://img.shields.io/"]):not([src^="data:"])'

const OPTIONS: Partial<FancyboxOptions> = {
  Hash: false,
  // Colours and the blurred backdrop live in `styles/tailwind.css`.
  Thumbs: { type: 'modern', showOnStart: false },
  Images: { Panzoom: { maxScale: 4 } },
  Carousel: { transition: 'slide' },
  Toolbar: {
    display: {
      left: ['infobar'],
      middle: ['zoomIn', 'zoomOut', 'toggle1to1', 'rotateCCW', 'rotateCW', 'flipX', 'flipY'],
      right: ['slideshow', 'thumbs', 'close'],
    },
  },
}

/** The original fills in `alt` — and with it the caption — from the nearest heading. */
function nearestHeading(image: HTMLElement): string {
  let node: HTMLElement | null = image
  while (node && node !== document.body) {
    let sibling = node.previousElementSibling
    while (sibling) {
      if (/^H[1-6]$/.test(sibling.tagName)) {
        return sibling.textContent?.replace(/\u200B/g, '').trim() ?? ''
      }
      sibling = sibling.previousElementSibling
    }
    node = node.parentElement
  }
  return ''
}

/** Groups every article image on the page into one gallery. */
export function bindFancybox(): void {
  void nextTick(async () => {
    const { Fancybox } = await import('@fancyapps/ui')
    document.querySelectorAll<HTMLImageElement>(SELECTOR).forEach((image) => {
      // A cover or avatar inside a card link keeps its click: it navigates.
      if (image.closest('a')) return
      if (!image.hasAttribute('data-fancybox')) image.setAttribute('data-fancybox', 'gallery')
      if (!image.getAttribute('alt')) image.setAttribute('alt', nearestHeading(image))
      image.setAttribute('data-caption', image.getAttribute('alt') ?? '')
    })
    Fancybox.bind('[data-fancybox="gallery"]', OPTIONS)
  })
}

export async function destroyFancybox(): Promise<void> {
  const { Fancybox } = await import('@fancyapps/ui')
  Fancybox.destroy()
}

export interface GalleryItem {
  src: string
  /** Video entries only — the still shown while the clip loads. */
  poster?: string
  caption?: string
}

/**
 * Opens a gallery we own, rather than one scraped from the page: `/travel/test
 * copy` points both its deck and its viewfinder here, so the 28 photos and the
 * clip can be browsed, zoomed and played full-screen from one place.
 */
export async function showGallery(items: GalleryItem[], startIndex = 0): Promise<void> {
  const { Fancybox } = await import('@fancyapps/ui')
  Fancybox.show(items, { ...OPTIONS, startIndex })
}
