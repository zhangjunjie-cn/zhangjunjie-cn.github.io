<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { data as articles } from './travel.data'

/**
 * 「我的游记」 —— the block on /pages/case that lists `docs/travel/`.
 *
 * The markup is the case page's own `img-card` card, copied verbatim from the
 * raw HTML the other two grids in `case.md` use, so a travel note renders
 * exactly like the site cases above it: cover (`thumbnail`) + name + desc +
 * a 29px round avatar with the author underneath.
 *
 * Add a markdown file to `docs/travel/` with `title` / `description` /
 * `thumbnail` / `author` / `avatar` in its frontmatter and a card appears here —
 * nothing in this file needs touching.
 */
const root = ref<HTMLElement | null>(null)

/**
 * The same contract as the markdown grids' inline `onload` / `onerror`: the
 * cover stays behind `.skeleton-image` until the browser adds `.loaded`.
 */
function markLoaded(event: Event) {
  ;(event.target as HTMLImageElement | null)?.classList.add('loaded')
}

onMounted(() => {
  // A server-rendered <img> can finish loading before Vue attaches its
  // listeners, in which case no `load` event ever reaches them. A failed load
  // also reports `complete`, which is what the markdown cards' `onerror` does.
  for (const img of root.value?.querySelectorAll('img') ?? []) {
    if (img.complete) img.classList.add('loaded')
  }
})
</script>

<template>
  <div ref="root" class="container img-card-container">
    <div class="img-card index-auto" style="--row-gap: 20px; --column-gap: 20px">
      <a
        v-for="article in articles"
        :key="article.href"
        :href="article.href"
        class="img-card__item row-4"
        style="--img-height: auto; --img-object-fit: cover; --desc-line-clamp: 2"
      >
        <div class="img-card__item__img skeleton-image">
          <img
            :src="article.thumbnail"
            class="no-preview"
            :alt="article.title"
            @load="markLoaded"
            @error="markLoaded"
          />
        </div>
        <div class="img-card__item__info">
          <p class="name">{{ article.title }}</p>
          <p class="desc">{{ article.description }}</p>
        </div>
        <div class="img-card__item__footer">
          <img :src="article.avatar" :alt="article.author" />
          <span>{{ article.author }}</span>
        </div>
      </a>
    </div>
  </div>
</template>
