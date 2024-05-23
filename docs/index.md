---
layout: home
layoutClass: "m-home-layout"
---

<home>
</home>



<script lang="ts" setup>
import home from './.vitepress/theme/views/home.vue'

</script>

<style>

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .item:last-child .details {
  display: flex;
  justify-content: flex-end;
  align-items: end;
}

.m-home-layout {
  /* 覆盖全局的 vp-layout-max-width（仅home 页面使用的） */
  --vp-layout-max-width: 100%;

  .container {
   max-width: var(--vp-layout-max-width) !important;
   padding:0 !important;
  }
  .content-container,
  .content {
    max-width: 100% !important;
  }

  /* .VPHero.has-image.VPHomeHero{
    margin-top: 0px !important;
    margin-left: 310px !important;
    margin-right: 310px !important;
  }

  .VPFeatures{
    margin-top: 0px !important;
    margin-left: 310px !important;
    margin-right: 310px !important;
  } */

  /* .m-home-layout .VPNavBar{
    margin-left: 0 !important;
    margin-right: 0 !important;
  } */




}

</style>
