<!-- 访问次数 -->
<script setup lang="ts">
import { inject, Ref } from 'vue'

const DEV = inject('DEV') as Ref<boolean>
</script>

<template>
  <img
    v-if="!DEV"
    class="visitor"
    src="https://visitor-badge.laobi.icu/badge?page_id=zhangjunjie-cn.notes"
    onerror="this.style.display='none'"
  />
</template>

<style scoped>
.visitor {
  margin-left: 0px;
}
@media (min-width: 768px) and (max-width: 920px) {
  .visitor {
    display: none;
  }
}
</style>