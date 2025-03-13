import { createSidebar } from "./createSidebar";

export interface IPost {
  text: string;
  link: string;
}

export function getRecentlyPost(recentlyPostNumber = 12): IPost[] {
  const allSideBar = createSidebar();

  // 用于存储最近的文章
  const posts: IPost[] = [];

  // 递归遍历侧边栏配置，找到所有文章
  function findItems(items: any[]) {
    if (posts.length >= recentlyPostNumber) return;

    for (const item of items) {
      if (item.items) {
        // 如果当前项有子项，递归遍历子项
        findItems(item.items);
      } else if (item.link) {
        // 如果当前项是文章，将其加入 posts 数组
        posts.push({
          text: item.text,
          link: item.link,
        });
      }

      // 如果已经找到足够数量的文章，提前退出
      if (posts.length >= recentlyPostNumber) return;
    }
  }

  // 遍历所有侧边栏配置
  for (const key in allSideBar) {
    findItems(allSideBar[key]);
  }

  // 返回最近的文章
  return posts;
}