/**
 * The glyph an article card shows.
 *
 * The original drives a card's icon from the article's **first tag**: an article
 * tagged `VSCode` carries the VS Code mark, one tagged `网站` the server mark,
 * `Skill` the design-skill mark — verified against the captured home page, where
 * every card's inline SVG matches the leading tag in its own tag row.
 *
 * Those card icons turned out to be the very same glyphs as the tag pills'
 * (`vscodeIcon`/`TagVscodeIcon`, `serverIcon`/`TagWebsiteIcon`, …), so the cards
 * resolve straight through `tagIcons` instead of keeping a second copy that can
 * drift out of sync with the tags.
 *
 * `tagIcons` markup is sized for the 16px inline pill (`mr-1 h-4 w-4`); the
 * `.article-glyph` rules in `styles/tailwind.css` resize the same glyph to the
 * source's own card sizes — 24px in `ArticleCard`'s `h-6 w-6` box (its markup
 * ships `absolute -top-2 -right-2 h-6 w-6`), 32px in `RecommendedCard`'s
 * `h-14 w-14` box (the source's `h-8 w-8`).
 */
import { TagDefaultIcon, tagIcons } from './tagIcons'

export function articleIcon(tags: readonly string[]): string {
  const [first] = tags
  return (first && tagIcons[first]) || TagDefaultIcon
}

export const viewAllArrowIcon = `<svg aria-hidden="true" role="img" viewBox="0 0 24 24" width="1em" height="1em" class="text-main! ml-1 transition-transform duration-300 group-hover:translate-x-2"><path fill="currentColor" d="M4 11v2h12l-5.5 5.5l1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5L16 11z" /></svg>`
