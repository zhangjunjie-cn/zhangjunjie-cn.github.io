// https://vite-pwa-org.netlify.app/
import { resolve } from "path";
import type { VitePWAOptions } from "vite-plugin-pwa";

const pwa: Partial<VitePWAOptions> = {
  // 根目录
  outDir: resolve(__dirname, "../../../dist"),
  registerType: "autoUpdate",
  // includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
  includeManifestIcons: false,
  manifest: {
    id: "/",
    name: "张俊杰的博客",
    short_name: "张俊杰的博客",
    description: "张俊杰的博客人生",
    theme_color: '#ffffff',
    icons: [
      {
        src: "/images/pwa-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        src: "/images/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  },
  workbox: {
    globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"],
    maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "gstatic-fonts-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
        handler: "NetworkFirst",
        options: {
          cacheName: "jsdelivr-images-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 7, // <== 7 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  // 请求页面不存在，强制返回404
  strategies: 'generateSW', 
  experimental: {
    includeAllowlist: true
  }
};
export default pwa;