// 判断是否在客户端环境（浏览器）
export const isClient = typeof window !== 'undefined' && typeof document !== 'undefined';