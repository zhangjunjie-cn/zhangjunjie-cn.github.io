---
hide: true  # 隐藏
index: 1  #文章顺序
group: true  # 分组
groupIndex: 2  # 分组排序
collapsed: false  # 折叠为打开状态
groupTitle: Hello 2025  # 分组文件夹名称
createtime: 2025/01/15
title: 文档书写规范
outline: [2,3]
categories:
 - 1
tags:
 - 1
---
# 文档书写规范

> 规定插入图片大小比例为 `1420` * `900` 像素。

```json 标签管理
---
hide: true  # 文件左侧目录隐藏
index: 1  #文章顺序
group: true  # 分组开启
groupIndex: 2  # 分组排序
collapsed: false  # 折叠为打开状态
groupTitle: Hello 2025  # 分组文件夹名称
createtime: 2025/01/15  #创建时间
title: 文档书写规范    # 文章标题
outline: [2,3]  # 右侧显示的层级关系
categories:
 - 1
tags:
 - 1
---
```

## 1.markdown 行号

::: code-group 
```ts:no-line-numbers [无行号显示]
123
```

```ts [有行号显示]
123
```
:::

```md 无行号显示代码组
::: code-group 
```ts:no-line-numbers [无行号显示]
123
``
```ts [有行号显示]
123
``
:::
```


## 2.容器布局示例

### 2.1 GitHub风格

```md:no-line-numbers
> [!NOTE] 重要
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。
```
> [!NOTE] 重要
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。

### 2.2 Badge组件
```md:no-line-numbers
::: info
这是一条info，自定义格式：info+空格+自定义文字
:::

::: tip 提示
这是一个提示，自定义格式：tip+空格+自定义文字
:::

::: warning 警告
这是一条警告，自定义格式：warning+空格+自定义文字
:::

::: danger 危险
这是一个危险警告，自定义格式：danger+空格+自定义文字
:::

::: details 点我查看
这是一条详情，自定义格式：details+空格+自定义文字
:::
```
::: info
这是一条info，自定义格式：info+空格+自定义文字
:::

::: tip 提示
这是一个提示，自定义格式：tip+空格+自定义文字
:::

::: warning 警告
这是一条警告，自定义格式：warning+空格+自定义文字
:::

::: danger 危险
这是一个危险警告，自定义格式：danger+空格+自定义文字
:::

::: details 点我查看
这是一条详情，自定义格式：details+空格+自定义文字
:::

## 3. 双栏布局示例

<br/>

### 3.1 一行两栏
```md:no-line-numbers
<div style="display: flex; gap: 0; border: 1px solid #ccc; border-radius: 10px; overflow: hidden;">
  <div style="flex: 1; padding: 10px; border-right: 1px solid #ccc;">
    左栏内容
  </div>
  <div style="flex: 1; padding: 10px;">
    右栏内容
  </div>
</div>
```

<div style="display: flex; gap: 0; border: 1px solid #ccc; border-radius: 10px; overflow: hidden;">
  <div style="flex: 1; padding: 10px; border-right: 1px solid #ccc;">
    左栏内容
  </div>
  <div style="flex: 1; padding: 10px;">
    右栏内容
  </div>
</div>

---

### 3.2 二行二列
```md:no-line-numbers
<div style="display: flex; gap: 0; border: 1px solid #ccc; border-radius: 10px; overflow: hidden;">
  <!-- 左栏 -->
  <div style="flex: 1; padding: 10px; border-right: 1px solid #ccc;">
    <div>左栏内容</div>
    <div style="margin-top: 10px; border-top: 1px solid #ccc; padding-top: 10px;">
      左栏下方内容
    </div>
  </div>
  <!-- 右栏 -->
  <div style="flex: 2; padding: 10px;">
    <div>右栏内容</div>
    <div style="margin-top: 10px; border-top: 1px solid #ccc; padding-top: 10px;">
      右栏下方内容
    </div>
  </div>
</div>
```

<div style="display: flex; gap: 0; border: 1px solid #ccc; border-radius: 10px; overflow: hidden;">
  <!-- 左栏 -->
  <div style="flex: 1; padding: 10px; border-right: 1px solid #ccc;">
    <div>左栏内容</div>
    <div style="margin-top: 10px; border-top: 1px solid #ccc; padding-top: 10px;">
      左栏下方内容
    </div>
  </div>
  <!-- 右栏 -->
  <div style="flex: 2; padding: 10px;">
    <div>右栏内容</div>
    <div style="margin-top: 10px; border-top: 1px solid #ccc; padding-top: 10px;">
      右栏下方内容
    </div>
  </div>
</div>

---

### 3.3 一行三栏
```md:no-line-numbers
<div style="display: flex; gap: 0; border: 1px solid #ccc; border-radius: 10px; overflow: hidden;">
  <!-- 左栏 -->
  <div style="flex: 1; padding: 10px; border-right: 1px solid #ccc;">
    左栏内容<br>
    左栏下方内容
  </div>
  <!-- 右栏 -->
  <div style="flex: 2; padding: 10px;">
    <div>右栏内容</div>
    <hr style="margin: 10px 0; border: none; border-top: 1px solid #ccc;">
    <div>右栏下方内容</div>
  </div>
</div>
```

<div style="display: flex; gap: 0; border: 1px solid #ccc; border-radius: 10px; overflow: hidden;">
  <!-- 左栏 -->
  <div style="flex: 1; padding: 10px; border-right: 1px solid #ccc;">
    左栏内容<br>
    左栏下方内容
  </div>
  <!-- 右栏 -->
  <div style="flex: 2; padding: 10px;">
    <div>右栏内容</div>
    <hr style="margin: 10px 0; border: none; border-top: 1px solid #ccc;">
    <div>右栏下方内容</div>
  </div>
</div>

---
### 3.4 一行多栏

```md:no-line-numbers
<div style="display: flex; gap: 0; border: 1px solid #ccc; border-radius: 10px; overflow: hidden;">
  <div style="flex: 1; padding: 10px; border-right: 1px solid #ccc;">
    左栏内容
  </div>
  <div style="flex: 2; padding: 10px;border-right: 1px solid #ccc;">
    右栏内容
  </div>
  <div style="flex: 1; padding: 10px;border-right: 1px solid #ccc;">
    右栏内容
  </div>
  <div style="flex: 1; padding: 10px;">
    右栏内容
  </div>
</div>
```

<div style="display: flex; gap: 0; border: 1px solid #ccc; border-radius: 10px; overflow: hidden;">
  <div style="flex: 1; padding: 10px; border-right: 1px solid #ccc;">
    左栏内容
  </div>
  <div style="flex: 2; padding: 10px;border-right: 1px solid #ccc;">
    右栏内容
  </div>
  <div style="flex: 1; padding: 10px;border-right: 1px solid #ccc;">
    右栏内容
  </div>
  <div style="flex: 1; padding: 10px;">
    右栏内容
  </div>
</div>

## 4. 跳转链接

```vue
<div class="linkcard">
  <a href="https://vitepress.yiov.top/" target="_blank">
    <p class="description">Vitepress中文搭建教程<br><span>https://vitepress.yiov.top/</span></p>
    <div class="logo">
        <img alt="Logo" width="70px" height="70px" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405051433983.jpg" />
    </div>
  </a>
</div>
```

<div class="linkcard">
  <a href="https://vitepress.yiov.top/" target="_blank">
    <p class="description">Vitepress中文搭建教程<br><span>https://vitepress.yiov.top/</span></p>
    <div class="logo">
        <img alt="Logo" width="70px" height="70px" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405051433983.jpg" />
    </div>
  </a>
</div>
