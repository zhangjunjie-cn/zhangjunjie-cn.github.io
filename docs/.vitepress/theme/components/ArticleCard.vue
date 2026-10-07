<script setup lang="ts">
/**
 * Vue port of `ArticleCard.tsx` from the note.weizwz.com clone.
 *
 * `icon` is a raw SVG string rendered with `v-html` (the React version passed a
 * rendered node). All Tailwind class strings, text, dates, tags and hrefs are
 * copied verbatim.
 */
interface Article {
  title: string
  description: string
  date: string
  tags: readonly string[]
  href: string
  icon: string
}

defineProps<Article>()
</script>

<template>
  <div class="group bg-bg shadow-shadow relative flex h-full w-full flex-col overflow-hidden rounded-2xl p-6 shadow-xs transition-all duration-600 hover:shadow-xl">
    <a :href="href" class="absolute inset-0 z-0" :aria-label="title" />
    <div class="relative z-10 mb-4">
      <div class="text-text3 text-xs font-bold tracking-wider uppercase">
        {{ date }}
      </div>
      <span class="article-glyph absolute -top-2 -right-2 block h-6 w-6" v-html="icon" />
    </div>
    <div class="mb-2 line-clamp-1 bg-[linear-gradient(to_right,var(--color-main)_50%,var(--color-text1)_50%)] bg-size-[200%_100%] bg-clip-text bg-position-[100%_0] text-lg font-bold break-all text-transparent transition-[background-position] duration-1000 group-hover:bg-position-[0_0]">
      {{ title }}
    </div>
    <div class="mb-4 line-clamp-2 text-sm leading-6 break-all text-gray-500 dark:text-gray-400">
      {{ description }}
    </div>
    <div class="relative z-10 flex flex-1 items-center gap-3 overflow-hidden">
      <a
        v-for="(tag, index) in tags"
        :key="tag"
        :href="'/pages/tags?q=' + encodeURIComponent(tag)"
        :class="[
          'hover:text-main! text-xs font-medium text-nowrap',
          index === 0 ? 'text-main!' : 'text-gray-400! dark:text-gray-500!',
        ]"
      >
        # {{ tag }}
      </a>
    </div>
  </div>
</template>
