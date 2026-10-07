/**
 * Raw SVG markup for the icons the original React home-page cards inlined as JSX.
 *
 * VitePress renders them through `v-html`, so they are kept as plain SVG strings.
 * The JSX-only camelCase attributes (`strokeLinejoin`, `strokeWidth`,
 * `strokeLinecap`) are written with their real SVG names, because a raw string is
 * parsed by the HTML parser — which lowercases attribute names and would drop
 * them. The resulting DOM is identical to what React produced.
 */

/** Recommended article icon: Claude. */
export const claudeIcon = `<svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" class="h-8 w-8 text-[#9200ff]"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"><path d="M14.17 20.89c4.184-.277 7.516-3.657 7.79-7.9c.053-.83.053-1.69 0-2.52c-.274-4.242-3.606-7.62-7.79-7.899a33 33 0 0 0-4.34 0c-4.184.278-7.516 3.657-7.79 7.9a20 20 0 0 0 0 2.52c.1 1.545.783 2.976 1.588 4.184c.467.845.159 1.9-.328 2.823c-.35.665-.526.997-.385 1.237c.14.24.455.248 1.084.263c1.245.03 2.084-.322 2.75-.813c.377-.279.566-.418.696-.434s.387.09.899.3c.46.19.995.307 1.485.34c1.425.094 2.914.094 4.342 0Z" /><path stroke-linecap="round" d="m7.5 15l1.842-5.526a.694.694 0 0 1 1.316 0L12.5 15m3-6v6m-7-2h3" /></g></svg>`

/** Recommended article icon: Apple. */
export const appleIcon = `<svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" class="h-8 w-8 text-[#61748d]"><path fill="currentColor" d="M11.673 7.222c-.876 0-2.232-.996-3.66-.96c-1.884.024-3.612 1.092-4.584 2.784c-1.956 3.396-.504 8.412 1.404 11.172c.936 1.344 2.04 2.856 3.504 2.808c1.404-.06 1.932-.912 3.636-.912c1.692 0 2.172.912 3.66.876c1.512-.024 2.472-1.368 3.396-2.724c1.068-1.56 1.512-3.072 1.536-3.156c-.036-.012-2.94-1.128-2.976-4.488c-.024-2.808 2.292-4.152 2.4-4.212c-1.32-1.932-3.348-2.148-4.056-2.196c-1.848-.144-3.396 1.008-4.26 1.008m3.12-2.832c.78-.936 1.296-2.244 1.152-3.54c-1.116.048-2.46.744-3.264 1.68c-.72.828-1.344 2.16-1.176 3.432c1.236.096 2.508-.636 3.288-1.572" /></svg>`
