---
createtime: 2024/11/27 17:40
title: 27Daily Notes
outline: [2,3]
categories:
 - 博客
tags:
 - 日记
---

# 日常笔记 Daily Notes
:::tip
下班红绿灯十字路口
:::
![黄昏梦境](https://gitee.com/zhangjunjiee/article-images/raw/master/images/202411272258763.png)

:::tip
工作日常笔记
:::

![一层交换机](https://gitee.com/zhangjunjiee/article-images/raw/master/images/202411272310614.png)

桌子交换机指的是 前门车闸控制终端，172.29.84.10，手里拿的那根网线是级联到二层交换机的，流入到门闸主板和人脸机。最上方的网线是到保安室的电脑的。


![二层交换机](https://gitee.com/zhangjunjiee/article-images/raw/master/images/202411272302763.png)

白色粘带的那根网线是摩托车人脸，然后依次是入口、出口的人脸，然后是门闸主板。
最下方的网线是级联，流入为172.20 的办公网。

![另一层交换机](https://gitee.com/zhangjunjiee/article-images/raw/master/images/202411272322334.png)

标记机房的，是来着机房的光收发出来的电口，流入172.20.80.1/22，邻接的是到AP设备的网线，另外四个网线口分别是出入、口闸机主板，出、入口立杆抓拍。

注意，这四个的网段是172.29.84.10~14,主机是 172.29.84.254。

![考勤及大门门禁设备IP地址段](https://gitee.com/zhangjunjiee/article-images/raw/master/images/202411272327188.png)

## 后记

在以后网建规划中，避免 172.29.84 段，其实这个段意义不大，完全可以配置为 192.168 段，因为完全不联网，但！需要有网线连接，因为抬杆，需要道闸主板来控制。

## 思考

人脸考勤机都是近接的办公网 172.20.80.1/22 段，是通过防火墙策略实现的 考勤网访问 办公网。其实这个防火墙策略根据地址来就可以了，还插一个端口到防火墙的考勤端口上，意义不大。

未来，可以给这块，除了考勤外，单独划分一个VLan。但你说办公网的考勤人脸区域都划分一个VLan，这个有无意义存在呢？

