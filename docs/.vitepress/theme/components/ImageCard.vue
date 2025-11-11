<script setup lang="ts">
import { computed } from 'vue'
import { withBase, useData } from 'vitepress'

const { site } = useData()
const lang = computed(() => site.value.lang || 'en')

const { image, title, description, href, author, date, width, center } = defineProps<{
  image: string
  title?: string
  description?: string
  href?: string
  author?: string
  date?: string | Date | number
  width?: string | number
  center?: boolean
}>()

const dateStr = computed(() => {
  if (!date) return ''
  const instance = date instanceof Date ? date : new Date(date)
  const intl = new Intl.DateTimeFormat(
    lang.value,
    { year: 'numeric', month: 'short', day: 'numeric' },
  )
  return intl.format(instance)
})

const styles = computed(() => ({
  width: width
    ? String(Number(width)) === String(width)
      ? `${width}px`
      : width
    : undefined,
}))
</script>

<template>
  <div class="vp-image-card" :style="styles" :class="{ center }">
    <div class="image-container">
      <img :src="withBase(image)" :alt="title" loading="lazy">
      <div v-if="title || author || dateStr || description" class="image-info">
        <h3 v-if="title" class="title">
          <a v-if="href" :href="href" target="_blank" rel="noopener noreferrer" class="no-icon">{{ title }}</a>
          <span v-else>{{ title }}</span>
        </h3>
        <p v-if="author || date" class="copyright">
          <span v-if="author">{{ author }}</span>
          <span v-if="author && dateStr"> | </span>
          <span v-if="dateStr">{{ dateStr }}</span>
        </p>
        <p v-if="description" class="description">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vp-image-card {
  max-width: 100%;
  margin: 16px 0;
  border-radius: 8px;
  box-shadow: var(--vp-shadow-2);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
}

.vp-image-card.center {
  margin: 16px auto;
}

.vp-image-card:hover {
  box-shadow: var(--vp-shadow-4);
  transform: translateY(-2px);
}

.vp-image-card .image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 0;
  line-height: 1;
  border-radius: 8px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.vp-image-card:hover .image-container img {
  transform: scale(1.05);
}

.image-info {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100%;
  padding: 20px 20px 0;
  overflow-y: hidden;
  font-size: 14px;
  color: var(--vp-c-white);
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(0, 0, 0, 0.4) 80%,
    rgba(0, 0, 0, 0) 100%
  );
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: translateY(calc(100% - 60px));
  opacity: 0.95;
}

.vp-image-card:hover .image-info {
  transform: translateY(0);
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.8) 30%,
    rgba(0, 0, 0, 0.5) 70%,
    rgba(0, 0, 0, 0.2) 100%
  );
}

:where(.vp-card-grid.cols-3, .vp-card-masonry.cols-3) .image-info {
  padding: 12px 12px 0;
  font-size: 12px;
  transform: translateY(calc(100% - 40px));
}

@media (max-width: 767px) {
  :where(.vp-card-grid.cols-2, .vp-card-masonry.cols-2) .image-info {
    padding: 12px 12px 0;
    font-size: 12px;
    transform: translateY(calc(100% - 40px));
  }
}

.image-info .title {
  min-height: 28px;
  margin: 0 0 12px;
  overflow: hidden;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-white);
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: transform 0.3s ease;
}

.vp-image-card:hover .image-info .title {
  transform: translateY(0);
}

:where(.vp-card-grid.cols-3, .vp-card-masonry.cols-3) .image-info .title {
  min-height: 20px;
  margin: 0 0 8px;
  font-size: 16px;
  line-height: 20px;
}

@media (max-width: 767px) {
  :where(.vp-card-grid.cols-2, .vp-card-masonry.cols-2) .image-info .title {
    min-height: 20px;
    margin: 0 0 8px;
    font-size: 16px;
    line-height: 20px;
  }
}

.image-info .title a {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
}

.image-info .title a:hover {
  color: var(--vp-c-brand);
}

.image-info p {
  margin: 0;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
  transition: transform 0.3s ease 0.1s;
  transform: translateY(5px);
}

.vp-image-card:hover .image-info p {
  transform: translateY(0);
}

:where(.vp-card-grid.cols-3, .vp-card-masonry.cols-3) .image-info p {
  line-height: 1.4;
}

@media (max-width: 767px) {
  :where(.vp-card-grid.cols-2, .vp-card-masonry.cols-2) .image-info p {
    line-height: 1.4;
  }
}

.image-info p:last-child {
  margin-bottom: 16px;
}

.image-info .copyright {
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: flex-end;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.image-info .copyright span:first-child {
  flex: 1;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.image-info .description {
  flex: 1;
  max-height: 60px;
  overflow-y: auto;
  padding-right: 4px;
  margin-bottom: 8px;
}

.image-info .description::-webkit-scrollbar {
  width: 4px;
}

.image-info .description::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.image-info .description::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}
</style>