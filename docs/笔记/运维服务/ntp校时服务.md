---
title: ntp校时服务
description: 略
firstCommit: 2025-12-27 13:36
lastUpdated: 2025-12-27 13:36
tags:
  - operation
---
# ntp校时服务

## 一、修改注册表

使用win + R 组合键在运行窗口中输入regedit，打开注册表编辑器。
![](https://pic4.zhimg.com/v2-0e3141e70d7c576f2f25ce3c4f678bcd_1440w.jpg)

**依次展开项目:**

> 计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\W32Time\TimeProviders\NtpServer

把Enabled设置为1，为打开NTP服务，操作如下图所示。

![](https://pic4.zhimg.com/v2-7061eaa2b793b1c3add1529979aa7ce5_1440w.jpg)

依次展开项目:

> 计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\W32Time\Config

并把AnnounceFlags的值设置为5（系统默认为a）。


![](https://pic3.zhimg.com/v2-c951afc7f7959b83c3dd7f6ef6b8edb4_1440w.jpg)

## 二、启动NTP服务

使用win + R 组合键在运行窗口中输入`services.msc` ，打开服务。

![](https://pic3.zhimg.com/v2-18273d90e57c7259b3c7f15b67bb9684_1440w.jpg)

在服务项中找到Windows Time，双击打开，将【启动类型】设置为自动。

![](https://picx.zhimg.com/v2-507c392078ac5221037173c2c29edc11_r.jpg)

然后右键重新启动此服务，服务启动成功。

设置为自动后确定，点击右键重新启动此服务，至此服务启动成功。


## 三、功能测试

启动和关闭windows NTP的方式，还可以使用命令行来管理

```bash
netstopw32time//停止netstartw32time//启动

```

在cmd窗口中输入w32tm /stripchart /computer:127.0.0.1 ，如果有回显则服务正常。

![](https://picx.zhimg.com/v2-1b4277d6511185c27aa4d2ffe43142af_1440w.jpg)


## 四、错误处理

##### 测试报错1：

![](https://pic2.zhimg.com/v2-8910306a713c085b6c387511a1f95a6d_1440w.jpg)

> 如出现上述错误可能服务被防火墙拦截，可以关闭系统防火墙重新测试。

##### 测试报错2：

![](https://pica.zhimg.com/v2-50a3ae2e90a6d0e95a006eef05b8849e_1440w.jpg)

> 如出现上述错误可能NTP服务未启动完成，可返回第二步重启NTP服务后重新测试。

