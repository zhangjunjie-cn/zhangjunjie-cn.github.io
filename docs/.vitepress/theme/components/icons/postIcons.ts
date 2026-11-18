/**
 * Inline SVG markup for the article chrome (meta row + doc footer), extracted
 * verbatim from the original by scripts/… and kept as raw strings for `v-html`.
 *
 * These are iconify icons: the original ships them as empty shells and hydrates
 * them on the client, so the captured `viewBox`/`path` data is the hydrated
 * result. The masked icon's generated id is re-keyed so it can never collide with
 * another inline icon on the page.
 */

export const metaIconDate = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="text-text2! mr-1 w-4 h-4 iconify iconify--fluent" style="color:currentColor;" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 8.5v9.25A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V8.5zM7.25 15a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5M12 15a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5m-4.75-4.5a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5m4.75 0a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5m4.75 0a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5m1-7.5A3.25 3.25 0 0 1 21 6.25V7H3v-.75A3.25 3.25 0 0 1 6.25 3z"></path></svg>`

export const metaIconUpdated = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="text-text2! mr-1 w-4 h-4 iconify iconify--iconamoon" style="color:currentColor;" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-4a1 1 0 1 0-2 0v5a1 1 0 0 0 1 1h5a1 1 0 1 0 0-2h-4z" clip-rule="evenodd"></path></svg>`

export const metaIconWords = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="text-text2! mr-1 w-4 h-4 iconify iconify--icon-park-solid" style="color:currentColor;" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="post-meta-words-mask"><g fill="none" stroke-width="4"><rect width="36" height="36" x="6" y="6" fill="#fff" stroke="#fff" rx="3"></rect><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="m14 16l4 16l6-13l6 13l4-16"></path></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#post-meta-words-mask)"></path></svg>`

export const metaIconViews = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="text-text2! mr-1 w-4 h-4 iconify iconify--mdi" style="color:currentColor;" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 19.2c-2.5 0-4.71-1.28-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.23 7.23 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10"></path></svg>`

/** 版权卡片右上角的水印：原站是 iconify 的 `ri:creative-commons-line`，
 *  位置/尺寸/透明度类名照抄 `customClass`。 */
export const footerIconCreativeCommons = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="text-text3! pointer-events-none absolute -top-1/4 right-6 h-56 w-56 opacity-15" style="color:currentColor;" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9 8c1.104 0 2.105.448 2.829 1.173l-1.414 1.413a2 2 0 1 0 0 2.828l1.413 1.414A4.001 4.001 0 0 1 5 12c0-2.208 1.792-4 4-4m9.829 1.173A4.001 4.001 0 0 0 12 12a4.001 4.001 0 0 0 6.828 2.828l-1.414-1.414a2 2 0 1 1 0-2.828zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16a8 8 0 0 0 0-16"/></svg>`
