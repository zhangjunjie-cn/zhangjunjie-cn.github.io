---
title: 01 常用命令
description: pnpm 的四条日常命令，以及用 ffmpeg 压缩、修复 mp4 的 pnpm video 脚本。
---

# 常用命令

日常只用这四条。`dev` 是边改边看，`preview` 用来验证最终构建产物。

```vue
pnpm install          # 安装依赖
pnpm dev              # 本地开发，默认 http://localhost:5173
pnpm build            # 构建，产物在 docs/.vitepress/dist
pnpm preview          # 预览构建产物，默认 http://localhost:4173
```

| 命令 | 什么时候用 |
|---|---|
| `pnpm dev` | 写文章、改样式时的默认选择，热更新 |
| `pnpm build` | 提交前跑一次，能提前暴露链接、图片路径这类构建期错误 |
| `pnpm preview` | 只在 `build` 之后用，看的就是线上那份产物 |

写完先在 `pnpm dev` 里看一眼，`build` 通过再推送。

## 视频压缩

浏览器要边下边播，视频的索引（`moov`）必须在文件开头。手机或剪辑软件导出的 mp4 经常把索引放在文件尾，于是点击视频时浏览器要先跑到文件末尾取索引、再回到开头缓冲，表现就是「点了半天没反应」。

`pnpm video` 做的就是重编码并加上 `-movflags +faststart`，把索引挪到开头：

```powershell
pnpm video                          # 压缩 docs/public/video 下所有 mp4
pnpm video docs/public/video/a.mp4  # 只处理单个文件
pnpm video --dry-run                # 只打印计划，不动文件
pnpm video --crf 26 --preset medium # 体积更小 / 速度更快
pnpm video --force                  # 强制重压（默认跳过压过的）
pnpm video --help                   # 全部参数
```

| 参数 | 作用 |
|---|---|
| `--crf <n>` | 质量，默认 24；越大体积越小、画质越差 |
| `--preset <name>` | 编码速度，默认 `slow`；想快用 `medium` |
| `--max-height <n>` | 最大高度，默认 1080，超过才等比缩放 |
| `--force` | 忽略「已处理」判断，强制重压 |
| `--no-backup` | 不备份原文件 |
| `--dry-run` | 只打印计划 |

脚本原地替换、文件名不变，原文件默认备份到系统临时目录。处理过的文件会写入 `comment=video-script` 标记，下次运行自动跳过，避免反复转码造成画质损失。

:::tip 先 dry-run 再动手
`pnpm video` 是不可逆的重编码（除备份外）。先 `--dry-run` 看一眼要处理哪些文件、预计输出多大，再正式执行。
:::

ffmpeg 不在 PATH 时，先安装或临时指定路径：

```powershell
winget install Gyan.FFmpeg

# 或者
$env:FFMPEG_PATH="C:\path\to\ffmpeg.exe"
$env:FFPROBE_PATH="C:\path\to\ffprobe.exe"
```
