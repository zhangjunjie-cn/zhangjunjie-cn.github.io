<!-- AI 摘要（假） -->
<template>
    <div v-if="frontmatter.articleGPT" class="article-gpt s-card">
      <div class="title">
        <span class="name" @click="router.go('/posts/2024/0218')">
          <i class="iconfont icon-deepseek">
          </i>
          文章摘要
          <i class="iconfont icon-Rightyou"></i>
        </span>
        <span :class="['logo', { loading }]" @click="showOther"> DeepSeek </span>
      </div>
      <div class="content s-card">
        <span class="text">{{ abstractData === "" ? "加载中..." : abstractData }}</span>
        <span v-if="loading" class="point">|</span>
      </div>
      <div class="meta">
        <span class="tip">文章摘要由DeepSeek Ai生成，并经过人工审核，仅用于文章内容的解释与总结</span>
        <a
          href="https://eqnxweimkr5.feishu.cn/share/base/form/shrcnCXCPmxCKKJYI3RKUfefJre"
          class="report"
          target="_blank"
        >
          投诉
        </a>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useData } from "vitepress";
  import { ref, onMounted, onBeforeUnmount } from "vue";
  
  const { frontmatter } = useData();
  
  // 摘要数据
  const loading = ref(true);
  const waitTimeOut = ref(null);
  const abstractData = ref("");
  const showIndex = ref(0);
  const showType = ref(false);
  
// 输出摘要
const typeWriter = (text = null) => {
  try {
    const data = text || frontmatter.value.articleGPT;
    if (!data) return false;
    if (showIndex.value < data.length) {
      abstractData.value += data.charAt(showIndex.value++);
      // 生成字符延迟
      const delay = Math.random() * (150 - 30) + 30;
      setTimeout(() => {
        typeWriter(text);
      }, delay);
    } else {
      loading.value = false;
    }
  } catch (error) {
    loading.value = false;
    abstractData.value = "摘要生成失败";
    $message.error("摘要生成失败，请重试");
    console.error("摘要生成失败：", error);
  }
};
  
  // 初始化摘要
  const initAbstract = () => {
    waitTimeOut.value = setTimeout(
      () => {
        typeWriter();
      },
      Math.random() * (3800 - 2500) + 2500,
    );
  };
  
  // 输出摘要介绍
const showOther = () => {
  if (loading.value) return false;
  const text =
    "我是無名开发的摘要生成助理 FakeGPT，如你所见，这是一个假的 GPT，所有文本皆源于本地书写的内容。我在这里只负责显示，并仿照 GPT 的形式输出，如果你像我一样囊中羞涩，你也可以像我这样做，当然，你也可以使用 Tianli 开发的 TianliGPT 来更简单地实现真正的 AI 摘要。";
  showIndex.value = 0;
  loading.value = true;
  abstractData.value = "";
  if (!showType.value) {
    showType.value = true;
    typeWriter(text);
  } else {
    typeWriter();
    showType.value = false;
  }
};


onMounted(() => {
  if (frontmatter.value.articleGPT) initAbstract();
});

onBeforeUnmount(() => {
  clearTimeout(waitTimeOut.value);
});
  </script>

<style lang="scss" scoped>
.article-gpt {
  margin-top: 1.2rem;
  // background-color: #f7f7f9 !important;
  background-color: var(--main-card-second-background)!important;
  user-select: none;
  cursor: auto;
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.8rem;
    padding: 0 8px;
    .name {
      display: flex;
      align-items: center;
      color: var(--main-color);
      font-weight: bold;
      cursor: pointer;
      .icon-robot {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: normal;
        width: 26px;
        height: 26px;
        color: #fff;
        // background-color: #425aef;
        border-radius: 50%;
        margin-right: 8px;
      }
      .icon-up {
        font-weight: normal;
        font-size: 12px;
        margin-left: 6px;
        opacity: 0.6;
        color: var(--main-color);
        transform: rotate(90deg);
      }
    }
    .logo {
      padding: 4px 10px;
      font-size: 12px;
      color: var(--main-font-color);
      background-color: var(--main-color);
      border-radius: 25px;
      font-weight: bold;
      cursor: pointer;
      &.loading {
        animation: loading 1s infinite;
        cursor: not-allowed;
      }
    }
  }
  .content {
    font-family: 'PingFang SC', sans-serif;
    line-height: 1.5;
    cursor: auto;
    .point {
      color: var(--main-color);
      font-weight: bold;
      margin-left: 4px;
      animation: loading 0.8s infinite;
    }
  }
  .meta {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    padding: 0 8px;
    font-size: 12px;

    .tip {
      opacity: 0.6;
    }
    .report {
      white-space: nowrap;
      margin-left: 12px;
      opacity: 0.8;
    }
  }
}

.s-card {
  padding: 0.8rem;
  border-radius: 16px;
  background-color: var(--main-card-background);   // 卡片里面背景色
  border: 1px solid var(--main-card-border);
  box-shadow: 0 8px 16px -4px var(--main-card-second-background);
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    &.hover {
      border-color: var(--main-color);
      box-shadow: 0 8px 16px -4px #fff;
    }
  }
}

</style>