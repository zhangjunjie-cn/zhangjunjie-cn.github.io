---
createtime: 2024/2/22
title: snapd安装软件
outline: [2,3]
isTop: true
categories:
 - 笔记
tags:
 - Linux

---
# snapd安装软件

[snapd安装软件](https://zhuanlan.zhihu.com/p/639665168)

如何使用 snap 软件包

通过上述简单介绍，大概了解了什么是 snap 应用包，如你已经在电脑上安装了Ubuntu系统，那么就可以通过下面的操作来安装使用 snap 软件包。Snap 的基本命令：install, remove, find, list, infor, refresh 等等。

1.安装 snap，可使用以下命令或图形界面的 store 通过鼠标点击操作：

```
sudo snap install code //安装code snap
```

2.卸载 snap

```
sudo snap remove code
```


3.搜索 snap

```
snap find code
```


4.查看 snap 信息

```
snap info code
```

5.查看已安装的 snap

```
snap list
```

6.更新 snap

sudo snap refresh code channel=latest/stable //channel来指定通道版本

