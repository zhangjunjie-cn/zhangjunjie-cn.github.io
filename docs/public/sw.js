/**
 * 视频缓存 Service Worker。
 *
 * GitHub Pages 给所有静态资源的 Cache-Control 只有 max-age=600，且不能自定义响应头。
 * 这里把 /video/*.mp4 在第一次播放时完整下载进 Cache Storage，之后直接由本地缓存切出
 * 206 片段返回，不再走网络，也不再受那 10 分钟的限制。
 *
 * 缓存不是无脑永久：每次从缓存播放前会发一个 HEAD 请求比对 Last-Modified，文件换过了
 * 就在后台重新拉一份，所以同名覆盖视频也能自动更新。
 */

const CACHE_NAME = 'video-cache-v1'
const VIDEO_PATH = /\/video\/[^/]+\.(mp4|webm)$/i

/** 同一个 URL 的下载去重，避免并发请求重复拉取。 */
const inFlight = new Map()
/** 同一个 URL 的 HEAD 校验去重。 */
const revalidating = new Set()

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys()
      await Promise.all(
        names
          .filter((name) => name.startsWith('video-cache-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name)),
      )
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin || !VIDEO_PATH.test(url.pathname)) return

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      const key = new Request(url.href, { method: 'GET' })
      const cached = await cache.match(key)

      if (cached) {
        // 有缓存就先秒回，同时后台确认源文件有没有被替换。
        event.waitUntil(revalidate(cache, key, cached))
        return slice(request, cached)
      }

      // 第一次播放：照常交给浏览器流式加载，同时在后台完整下载一份留作缓存。
      event.waitUntil(downloadFull(cache, key))
      return fetch(request)
    })(),
  )
})

/** 把整个文件（不带 Range）下载进缓存。 */
function downloadFull(cache, key) {
  if (inFlight.has(key.url)) return inFlight.get(key.url)

  const task = (async () => {
    try {
      const response = await fetch(key.url)
      if (response.status !== 200) return
      await cache.put(key, response.clone())
    } catch {
      // 网络失败就下次播放再试，不影响当前播放。
    } finally {
      inFlight.delete(key.url)
    }
  })()

  inFlight.set(key.url, task)
  return task
}

/** 用 HEAD 比对 Last-Modified，源文件变了就替换缓存。 */
async function revalidate(cache, key, cached) {
  if (revalidating.has(key.url)) return
  revalidating.add(key.url)

  try {
    const response = await fetch(key.url, { method: 'HEAD', cache: 'no-store' })
    if (!response.ok) return

    const current = response.headers.get('Last-Modified')
    const stored = cached.headers.get('Last-Modified')
    if (!current || !stored || current === stored) return

    // 先退出校验去重，再把下载交给 inFlight 去重，否则 downloadFull 会以为
    // 已经有一个下载在跑而直接返回。
    revalidating.delete(key.url)
    await downloadFull(cache, key)
  } catch {
    // 离线或校验失败时继续用旧缓存。
  } finally {
    revalidating.delete(key.url)
  }
}

/**
 * 从缓存里切出播放器要的 Range 片段。
 *
 * <video> 拿到缓存后仍会带 `Range: bytes=…` 请求，直接回 200 整包会让部分浏览器
 * 无法拖动。这里按 Range 返回 206，并补上一年期的 Cache-Control。
 */
async function slice(request, cached) {
  const range = request.headers.get('range')
  if (!range) return cached

  const blob = await cached.blob()
  const size = blob.size
  const match = /^bytes=(\d*)-(\d*)$/.exec(range.trim())
  if (!match) return cached

  let start
  let end
  if (match[1] === '') {
    const suffix = Number(match[2])
    start = Math.max(0, size - suffix)
    end = size - 1
  } else {
    start = Number(match[1])
    end = match[2] === '' ? size - 1 : Math.min(Number(match[2]), size - 1)
  }

  if (!Number.isFinite(start) || !Number.isFinite(end) || start >= size) {
    return new Response(null, {
      status: 416,
      headers: { 'Content-Range': `bytes */${size}` },
    })
  }

  const chunk = blob.slice(start, end + 1)
  const headers = new Headers()
  headers.set('Content-Type', cached.headers.get('Content-Type') || 'video/mp4')
  headers.set('Content-Length', String(chunk.size))
  headers.set('Content-Range', `bytes ${start}-${end}/${size}`)
  headers.set('Accept-Ranges', 'bytes')
  headers.set('Cache-Control', 'public, max-age=31536000, immutable')

  return new Response(chunk, { status: 206, statusText: 'Partial Content', headers })
}
