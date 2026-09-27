<template>
  <div class="VPDoc">
    <div class="vp-doc">
      <div class="container">
        <div id="tags">
          <h1>标签列表</h1>
          <div
            ref="tagsWrapper"
            class="tags-wrapper"
            @mouseleave="hideIndicator">
            <!-- 跟随鼠标的指示框：全局只有一个，靠 left/top/width/height 的过渡滑到当前标签的位置 -->
            <div
              class="tag-indicator"
              :class="{ 'is-visible': indicatorVisible, 'is-ready': indicatorReady }"
              :style="indicatorStyle"></div>
            <div
              v-for="(item, index) of tagsText"
              :key="index"
              @mouseenter="moveIndicator"
              @click="activeTag(item)"
              v-bind:class="{ tag: true, 'tag-active': currentTag === item }">
              {{ item }}
              <span class="tag-length">{{ tags[item].length }}</span>
            </div>
          </div>
        </div>
        <div id="posts">
          <div class="title-wrapper">
            <h3 class="title">文章列表</h3>
          </div>
          <div class="posts-wrapper">
            <el-row v-if="posts.length === 0" class="container-row" :gutter="24">
              <el-col v-for="idx of 8" :key="idx" :xs="24" :sm="12" :md="6">
                <WPostCard :noData="true" />
              </el-col>
            </el-row>
            <el-row v-else class="container-row" :gutter="24">
              <el-col v-for="item of posts" :key="item.url" :xs="24" :sm="12" :md="6">
                <WPostCard :post="Object.assign({ baseUrl: '../' }, item)" />
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vitepress'
import { type Post, data } from '../utils/post.data'

const routeData = useRouter()
const tags = ref(data.tags)
const tagsText = ref(Object.keys(tags.value))

let currentTag = ref('')
let posts = ref<Post[]>([])

const tagsWrapper = ref<HTMLElement | null>(null)
const indicatorStyle = ref<Record<string, string>>({})
const indicatorVisible = ref(false)
const indicatorReady = ref(false)

// 鼠标进入标签时，把指示框移动到该标签的位置
const moveIndicator = (event: MouseEvent) => {
  const el = event.currentTarget as HTMLElement
  if (!el || !tagsWrapper.value) return

  // offsetLeft/offsetWidth 取的是布局几何，不受 .tag:hover 的 scale(1.2) 影响，
  // 指示框再用同样的 scale(1.2) 即可与放大后的标签完全重合
  indicatorStyle.value = {
    left: el.offsetLeft + 'px',
    top: el.offsetTop + 'px',
    width: el.offsetWidth + 'px',
    height: el.offsetHeight + 'px'
  }
  indicatorVisible.value = true

  // 首次定位不加位移过渡，避免指示框从容器左上角飞过来
  if (!indicatorReady.value) {
    requestAnimationFrame(() => {
      indicatorReady.value = true
    })
  }
}

const hideIndicator = () => {
  indicatorVisible.value = false
}

const activeTag = (tag) => {
  routeData.go(routeData.route.path + '?q=' + encodeURIComponent(tag))
}

// 监听url里参数
const handleUrlState = () => {
  const params = new URLSearchParams(window.location.search)
  let tag = params.get('q') ? decodeURIComponent(params.get('q') as string) : ''
  tag = tagsText.value.indexOf(tag) !== -1 ? tag : tagsText.value[0]
  currentTag.value = tag
  posts.value = tags.value[tag]
}

onMounted(() => {
  handleUrlState()
  window.addEventListener('popstate', handleUrlState)

  const originalReplaceState = history.replaceState;
  history.replaceState = function(state, title, url) {
    originalReplaceState.apply(history, arguments);
    setTimeout(() => {
      handleUrlState()
    })
  };
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', handleUrlState)
})
</script>

<style lang="scss" scoped>
// 指示框需要相对 .tags-wrapper 定位
.tags-wrapper {
  position: relative;
}

// 跟随鼠标的标签指示框
.tag-indicator {
  position: absolute;
  pointer-events: none; // 必须：否则会挡住标签的 hover，导致指示框反复闪烁
  border: 1px solid var(--weiz-primary-color);
  border-radius: 16px;
  opacity: 0;
  transform: scale(1);
  // 首次定位只淡入，不播放位移动画
  transition:
    opacity 200ms ease-out,
    transform 400ms ease;
}

// 首次定位完成后才开启位移/尺寸过渡，之后在标签之间移动就会顺滑滑动
.tag-indicator.is-ready {
  transition:
    left 600ms cubic-bezier(0.34, 1.56, 0.64, 1),
    top 600ms cubic-bezier(0.34, 1.56, 0.64, 1),
    width 600ms cubic-bezier(0.34, 1.56, 0.64, 1),
    height 600ms cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 200ms ease-out,
    transform 400ms ease;
}

// 与 .tag:hover / .tag-active 的 scale(1.2)、0.4s 保持一致，才能和放大的标签重合
.tag-indicator.is-visible {
  opacity: 1;
  transform: scale(1.2);
}

@media (prefers-reduced-motion: reduce) {
  .tag-indicator,
  .tag-indicator.is-ready {
    transition: none;
  }
}
</style>
