#!/usr/bin/end sh

# 忽略错误
set -e

# 打包
pnpm run build

# 切换到 docs/.vitepress.dist目录
cd dist

msg="github actions自动部署"

git init
git add -A
git commit -m "${msg}"
# git config --global http.postBuffer 524288000
# git commit -m "自动部署vitepress"
# git config --global core.autocrlf false
git remote add origin https://github.com/zhangjunjie-cn/zhangjunjiee.git
git push -f origin main:dist

# 返回上次所在的目录
cd -

# 删除dist文件夹
rm -rf dist