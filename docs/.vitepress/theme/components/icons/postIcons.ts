/**
 * Inline SVG markup for the doc footer, extracted verbatim from the original by
 * scripts/… and kept as raw strings for `v-html`.
 *
 * These are iconify icons: the original ships them as empty shells and hydrates
 * them on the client, so the captured `viewBox`/`path` data is the hydrated
 * result. The masked icon's generated id is re-keyed so it can never collide with
 * another inline icon on the page.
 */

export const footerIconAuthor = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="text-main! mr-1 h-4 w-4 align-top iconify iconify--mdi" style="color:currentColor;" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 19.2c-2.5 0-4.71-1.28-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.23 7.23 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10"></path></svg>`

export const footerIconLink = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="text-main! mr-1 h-4 w-4 align-top iconify iconify--material-symbols" style="color:currentColor;" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 11h2v1.4q0 .175.15.238t.275-.063l2.225-2.225q.15-.15.15-.35t-.15-.35l-2.225-2.225q-.125-.125-.275-.062T13 7.6V9h-2q-1.25 0-2.125.875T8 12v1q0 .425.288.713T9 14t.713-.288T10 13v-1q0-.425.288-.712T11 11M2 21q-.425 0-.712-.288T1 20t.288-.712T2 19h20q.425 0 .713.288T23 20t-.288.713T22 21zm2-3q-.825 0-1.412-.587T2 16V5q0-.825.588-1.412T4 3h16q.825 0 1.413.588T22 5v11q0 .825-.587 1.413T20 18z"></path></svg>`

export const footerIconCopyright = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="text-main! mr-1 h-4 w-4 align-top iconify iconify--mage" style="color:currentColor;" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1.75A10.25 10.25 0 1 0 22.25 12A10.26 10.26 0 0 0 12 1.75m-1 5a1 1 0 0 1 2 0v6.33a1 1 0 0 1-2 0zm1 11.08a1.25 1.25 0 1 1 1.25-1.25a1.24 1.24 0 0 1-1.21 1.23z"></path></svg>`

export const footerIconCcBadge = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="text-main! absolute top-2 right-2 h-5 w-5 iconify iconify--boxicons" style="color:currentColor;" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.58 2 2 6.58 2 12s4.58 10 10 10s10-4.58 10-10S17.42 2 12 2m0 13c.99 0 1.85-.26 2.29-.71l1.41 1.42C14.57 16.83 12.89 17 11.99 17c-2.76 0-5-2.24-5-5s2.24-5 5-5c.9 0 2.58.17 3.71 1.29L14.29 9.7c-.44-.44-1.3-.71-2.29-.71c-1.63 0-3 1.37-3 3s1.37 3 3 3Z"></path></svg>`
