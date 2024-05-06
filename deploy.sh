#!/usr/bin/end sh

set -e

# 打包
npm run build

# 切换到 docs/.vitepress.dist目录
cd dist

msg="gitee actions自动部署"

git init
git add -A
git commit --no-verify -m "${msg}"
git config --global http.postBuffer 524288000
# git commit -m "自动部署vitepress"
git config --global core.autocrlf false
# git push https://gitee.com/zhangjunjiee/zhangjunjiee.git --force master:dist 
git push https://gitee.com/zhangjunjiee/zhangjunjiee.git --force master:dist 

cd ..
rm -rf zhangjunjiee/dist
