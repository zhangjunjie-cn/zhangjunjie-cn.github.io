---
createtime: 2024/6/10 20:37
title: gitee pages 部署脚本
outline: [2,3]
categories:
 - 笔记
tags:
 - 网工
---

# gitee pages 部署脚本

不用质疑，用git base here在项目目录下(docs父级文件路径)，执行 `sh deploy.sh` 命令即可!

```shell
#!/usr/bin/end sh

set -e

# 打包
npm run docs:build

# 切换到 docs/.vitepress.dist目录
cd docs/.vitepress/dist

msg="gitee actions自动部署"

git init
git add -A
git commit -m "${msg}"
git config --global http.postBuffer 524288000
# git commit -m "自动部署"
git config --global core.autocrlf false
git push https://gitee.com/zhangjunjie/docs.git --force master:dist 

cd -
rm -rf docs/.vitepress/dist
```

不用质疑，--force强制推送即可，很强，能有效减少一半的报错几率!


