// 运行时值（函数）从 vue 导入 - 不使用 type
import { ref, defineComponent, computed, provide, inject, h } from "vue";

// 类型从 vue 导入 - 使用 type
import type { Component, InjectionKey, ComputedRef } from "vue";

// 从 vitepress 导入运行时值和类型
import { useData } from "vitepress";

export const useTypewriter = (string: string, time: number) => {
  const currentString = ref("");
  const currentIndex = ref(0);

  // totelTime.value = string.length * time
  let clock = setInterval(() => {
    currentIndex.value += 1;
    if (string.length >= currentIndex.value) {
      currentString.value = string.substring(0, currentIndex.value);
    } else {
      clearInterval(clock);
    }
  }, time);

  return { currentString };
};

const resolveConfig = (config) => {
  // console.log("config: ", config);
  return {
    ...config,
    // blog: {
    //   ...config?.blog,
    //   pagesData: config?.blog?.pagesData || []
    // }
  };
};

const configSymbol: InjectionKey<ComputedRef<any>> = Symbol("theme-config");

export const withConfigProvider = (App: Component) => {
  return defineComponent({
    name: "ConfigProvider",
    setup(_, { slots }) {
      const { theme } = useData();
      const config = computed(() => resolveConfig(theme.value));

      provide(configSymbol, config);
      return () => h(App, null, slots);
    },
  });
};

export function useConfig() {
  return inject(configSymbol)!.value;
}

export function useBlogConfig() {
  return inject(configSymbol)!.value.blog!;
}

export const insetToAfterDocTitle = (dom: HTMLElement) => {};
