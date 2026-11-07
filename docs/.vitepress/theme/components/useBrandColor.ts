/**
 * 全站品牌色偏好的持久化与落地。
 *
 * 站点的所有高亮（正文二级标题、链接、右侧目录当前项、侧栏激活项、分页按钮…）
 * 最终都指向 `--site-main`（见 `styles/tailwind.css`），所以只要在 <html> 上把
 * 这个变量覆盖掉，整站颜色就会跟着换；关掉时把内联值移除，回落到 CSS 里的默认色。
 *
 * 偏好存在 localStorage：`enabled` 表示是否启用自定义色，`color` 记住上次选的颜色，
 * 这样下次切回「自定义」时还是同一色，而不是回到预设的蓝色。
 */
export const BRAND_STORAGE_KEY = 'site-brand-preference'

export interface BrandPreference {
  enabled: boolean
  color: string
}

export function readBrandPreference(): BrandPreference | null {
  try {
    const raw = localStorage.getItem(BRAND_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<BrandPreference>
    if (typeof parsed.enabled !== 'boolean' || typeof parsed.color !== 'string') {
      return null
    }
    return { enabled: parsed.enabled, color: parsed.color }
  } catch {
    // 隐私模式下 localStorage 不可读，当作没有偏好。
    return null
  }
}

export function applyBrandColor(color: string) {
  const root = document.documentElement
  root.style.setProperty('--site-main', color)
  // 「页面属性」的进度条只在自定义品牌色时跟随主色（见 tailwind.css）。
  root.classList.add('brand-custom')
}

export function clearBrandColor() {
  const root = document.documentElement
  root.style.removeProperty('--site-main')
  root.classList.remove('brand-custom')
}

/** 应用启动时（任意路由）恢复上次的自定义色。 */
export function restoreBrandColor() {
  const preference = readBrandPreference()
  if (preference?.enabled) applyBrandColor(preference.color)
}
