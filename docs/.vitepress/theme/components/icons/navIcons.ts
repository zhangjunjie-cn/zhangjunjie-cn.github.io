/**
 * Raw SVG markup for the icons used by the cloned note.weizwz.com navbar.
 *
 * These are byte-for-byte copies of the React source (`SiteNav.tsx`), including
 * the `class` attribute on each `<svg>`, so `SiteNav.vue` can drop them in with
 * `v-html` on the wrapper element the React version used.
 *
 * The sun/moon toggle ships in two variants because the original swapped an
 * `opacity-0` / `opacity-100` utility with the active colour scheme.
 */

const APPEARANCE_ICON_CLASS =
  "absolute top-[3px] left-[3px] h-3 w-3 text-text1 [transition:opacity_.25s]";

export const searchIcon =
  '<svg class="relative top-px mr-2 h-3.5 w-3.5 text-text2" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14.386 14.386 4.088 4.088-4.088-4.088A7.533 7.533 0 1 1 3.733 3.733a7.533 7.533 0 0 1 10.653 10.653z" /></svg>';

export const chevronDownIcon =
  '<svg class="ml-1 h-3.5 w-3.5 text-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>';

/** Sun — `opacity-100` in light mode, `opacity-0` in dark mode. */
export const sunIcon = `<svg class="${APPEARANCE_ICON_CLASS} opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>`;

export const sunIconFaded = `<svg class="${APPEARANCE_ICON_CLASS} opacity-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>`;

/** Moon — `opacity-100` in dark mode, `opacity-0` in light mode. */
export const moonIcon = `<svg class="${APPEARANCE_ICON_CLASS} opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>`;

export const moonIconFaded = `<svg class="${APPEARANCE_ICON_CLASS} opacity-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>`;
