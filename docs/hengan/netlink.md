---
title: 个人 SQL 优化技巧
author: 查尔斯
createtime: 2024/07/28
isTop: true
categories:
 - hengan
tags:
 - WORK
---
## 发现问题

如果您的浏览器和企业微信无网络连接，同时OA、Lims、SAP系统出现无法访问，尝试以下步骤：

> [!note] 操作
> <kbd data-windows-keyboard-key="windows">Win</kbd> + <kbd>R</kbd> 键在左下角出现的运行框中，输入 <mark>cmd</mark>， 在弹出的终端中输入 <mark>ipconfig/all</mark> 。
> 

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202408251602807.png"/>

---

##  请仔细比较这张图

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202408251625453.png"/>

::: warning
- IPv4 地址范围应该是  &emsp; 172.20.80.50 ~ 172.20.81.255
- 默认网关应该是 &emsp;&emsp;&emsp;&nbsp; 172.20.83.254
- DNS服务器应该是 &emsp;&emsp;&nbsp; 192.168.0.15 或 192.168.0.16
:::

## 问题1：IP 地址不在上述范围

IP 地址变成了 192.168.x.x 或者 169.254.x.x ，这表示你IP被别人给抢了，所以电脑给你重新分配了可上网的策略地址，但并不处于内网段。

解决方案：

## 问题2：DNS 服务器不在上述范围

DNS 服务器地址是192.168.0.15 或 192.168.0.16，是用来寻找内网系统地址的。

解决方案：


## 问题3：没有以上问题，但访问不了OA

解决方案：

## 问题4：SAP 无法登录且弹窗错误

解决方案：






> [!note] 操作
> <kbd data-windows-keyboard-key="windows">Win</kbd> + <kbd>R</kbd> 键在左下角出现的运行框中，输入 <mark>cmd</mark>， 在弹出的终端中输入 <mark>nslookup oa.hengan.com</mark> 。
> 

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202408252027732.png"/>

解决方案：




















