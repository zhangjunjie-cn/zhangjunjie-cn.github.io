/**
 * 网站访问量统计
 *
 * https://events.vercount.one/
 */
const SCRIPT_ID = 'vercount-injected-script'

const useVisitData = () => {
  // 路由切换会重复调用，先移除上一次注入的节点，避免 script 标签在 head 中无限累积
  document.getElementById(SCRIPT_ID)?.remove()

  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.defer = true
  script.async = true
  // 调用 Vercount 接口
  script.src = 'https://events.vercount.one/js'
  document.head.appendChild(script)
}

export default useVisitData