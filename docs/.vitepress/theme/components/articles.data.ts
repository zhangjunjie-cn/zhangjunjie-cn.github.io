import { createContentLoader, type ContentData } from 'vitepress'

/**
 * The site's article list — the single data source behind /, /pages/posts,
 * /pages/tags and the home page's 「推荐文章」 carousel.
 *
 * VitePress inlines this at build time (and re-runs it on every markdown edit
 * under `watch`), so everything is derived from the articles' own frontmatter
 * rather than hand-written JSON:
 *   - only files with a `date:` are listed — `index.md` and the `pages/*`
 *     route stubs have none, so they drop out on their own;
 *   - newest first.
 *
 * The card glyph is not part of the payload — consumers resolve it from the
 * article's first tag (`articleIcon`).
 */
export interface Article {
  title: string
  description: string
  date: string
  tags: string[]
  /** Root-absolute (`/ai/qq-agent-mail`) so the same value works on every route. */
  href: string
}

/** Unquoted YAML dates arrive as `Date`; quoted ones as strings. */
function toDay(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (typeof value === 'string') return value.slice(0, 10)
  return ''
}

function toTags(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : []
}

declare const data: Article[]
export { data }

export default createContentLoader('**/*.md', {
  transform(raw: ContentData[]): Article[] {
    return raw
      // `travel/**` are notes, not blog posts: they have no `date` and are shown
      // on /pages/case by `pages-case/TravelCases.vue` instead.
      .filter(({ url, frontmatter }) => !url.startsWith('/travel/') && frontmatter.date && frontmatter.title)
      .map(({ url, frontmatter }) => ({
        title: String(frontmatter.title),
        description: String(frontmatter.description ?? ''),
        date: toDay(frontmatter.date),
        tags: toTags(frontmatter.tags),
        href: url.replace(/\.html$/, ''),
      }))
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  },
})
