---
createtime: 2024/2/22
title: Ubuntu 下 更新默认 nodejs/npm 版本至最新版本
outline: [2,3]
isTop: true
categories:
 - 笔记
tags:
 - Linux

---
# Ubuntu 下 更新默认 nodejs/npm 版本至最新版本

Ubuntu 下 更新默认 nodejs/npm 版本至最新版本
步骤一：更新 nodejs 源为淘宝源：

## 1.通过下面配置，可以不使用 cnpm 而直接在 npm 情况下使用新的 nodejs 源
npm config set registry https://registry.npm.taobao.org

## 2.获取刚刚设置配置是否如我们所愿
npm config get registry<br>

步骤二：更新 npm<br>
sudo npm install -g n<br>

步骤三：更新 nodejs
n stable

## 3.确认 nodejs 版本
nodejs -v
可能出现更新后， nodejs -v 还是老版本的问题
原因：

nodejs 有一个全局安装目录和更新安装目录之分：

查看 npm 更新安装路径：npm root -g 查看 npm 全局安装路径：npm config get prefix

默认看到的是 npm 全局安装路径，sudo npm install -g n 和 n stable 都会安装到 更新目录 下，故而如果安装程序调整没有到位时，就可能出现问题。

不建议通过修改 nodejs 安装目录的方式来切换版本。

方案： 替换默认的可执行文件名，进行版本切换（建议）

## 4.nodejs 全局安装 node 在 /bin/node 目录下
## 5.nodejs 更新目录在 /usr/local/bin/node 下

sudo mv /bin/node /bin/nodeOld<br>
sudo mv /bin/npm /bin/npmOld<br>
sudo mv /bin/npx /bin/npxOld

sudo ln -s  /usr/local/bin/node  /bin/node<br>
sudo ln -s  /usr/local/bin/npm  /bin/npm<br>
sudo ln -s  /usr/local/bin/npx  /bin/npx


- [npm显示升级到最新版本仍然显示npm为原版本的问题解决](https://blog.csdn.net/qq_48455576/article/details/120468488)