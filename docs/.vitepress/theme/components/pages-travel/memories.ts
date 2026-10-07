/**
 * What the hero band's particle layer can be — `<Swiper weather="…">`. `snow` is
 * the source's own effect; the rest are additions, and `none` switches it off.
 */
export type Weather = 'snow' | 'sun' | 'leaf' | 'petal' | 'wind' | 'none'

/**
 * The shape of one memory: the still, its captions and the source's own
 * `createTime` string.
 *
 * Types only. The 28 records the source keeps in `/json/nostalgia.json` (kept
 * as `docs/research/…/nostalgia.json`) now live inline in the notes that show
 * them — `<Swiper :items="[…]">` in `docs/travel/*.md` — so a gallery is edited
 * where it is written rather than in this shared file.
 */
export interface Memory {
  title: string
  description: string
  /** Source string (`2026:04:05 00:00:00`) — the viewfinder normalises it. */
  createTime: string
  image: string
  /**
   * Set on a video entry (only `<Swiper>` produces those): the clip to play in
   * the viewfinder. `image` is then the still, used by the deck card, the
   * thumbnail strip and the player's poster.
   */
  video?: string
}
