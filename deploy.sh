#!/usr/bin/env sh

# 忽略错误
set -e

# 打包
pnpm run build

# 切换到 docs/.vitepress.dist目录
cd dist

msg="StackBlitz 自动部署 NetLify"

git init

# git config --global http.postBuffer 524288000
# git commit -m "自动部署vitepress"
# git config --global core.autocrlf false
git remote add origin https://github.com/zhangjunjie-cn/zhangjunjiee.git

# git checkout -b dist
#拉取fetch到最新仓库并merge合并
# git pull origin dist
# git merge origin/dist 
# git checkout dist 
# git branch --set-upstream-to=origin/dist  

git add -A
git commit -m "${msg}"
git push https://github.com/zhangjunjie-cn/zhangjunjiee.git --force master:dist 

# 返回上次所在的目录
cd -

# 删除dist文件夹
rm -rf dist