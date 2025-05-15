import { inBrowser } from "vitepress";

// 判断当前页面是否为移动端
export function isMobile() {
  if (inBrowser) {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
  return false;
}

// export const isMobile1 = (): boolean => {
//     return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//         navigator.userAgent
//     );
// };
