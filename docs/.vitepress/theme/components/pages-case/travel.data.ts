import { createContentLoader, type ContentData } from 'vitepress'

/**
 * Every note under `docs/travel/` — the data behind the 「我的游记」 block on
 * /pages/case.
 *
 * Kept separate from `articles.data.ts` on purpose: travel notes carry no
 * `date` and are not blog posts, so they must not leak into /pages/posts,
 * /pages/tags, 最新文章 or 推荐文章 (that file skips `travel/**`).
 *
 * Each note declares its own card face in frontmatter:
 *   thumbnail: the card cover
 *   author / avatar: the footer, i.e. the site the note came from
 */
export interface TravelArticle {
  title: string
  description: string
  /** Root-absolute (`/sites/…`) so the same value works on every route. */
  thumbnail: string
  author: string
  avatar: string
  /** Root-absolute (`/travel/test`) — the card links to the note itself. */
  href: string
}

declare const data: TravelArticle[]
export { data }

export default createContentLoader('travel/**/*.md', {
  transform(raw: ContentData[]): TravelArticle[] {
    return raw
      .filter(({ frontmatter }) => frontmatter.title && frontmatter.thumbnail)
      .map(({ url, frontmatter }) => ({
        title: String(frontmatter.title),
        description: String(frontmatter.description ?? ''),
        thumbnail: String(frontmatter.thumbnail),
        author: String(frontmatter.author ?? ''),
        avatar: String(frontmatter.avatar ?? ''),
        href: url.replace(/\.html$/, ''),
      }))
  },
})
