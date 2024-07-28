---
createTime: 2024/07/28
tag: '网络打印机'
outline: [2,3]
---

# 打印机共享解决方案


## 呼出控制面板

进入 `程序` -> `启动或关闭windos功能`。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202407281816921.png"/>

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202407281817146.png"/>

## 启动LPD服务

两台电脑都需要在`windows功能` 开启以下功能，如果弹出重启，重启后再进行下一步操作。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202407281739731.png"/>

## 添加共享打印机

**第一步：安装好对应型号的打印机的驱动程序**

**第二步：进入控制面板\硬件和声音\设备和打印机，右键点击 "添加打印机"**

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202407281743175.png"/>

**第三步：在弹出的“添加打印机”窗口中，选择“通过手动设置添加本地打印机或网络打印机”，然后“下一页”。**

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202407281743178.png"/>

**第四步：选择“创建新端口”，然后从下拉菜单中选择“LPR Port”，点击“下一页”。**

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202407281745297.png"/>

---


::: details 点击展开： 查看电脑IP地址及名称

---

- 按下键盘上的“Win+I”组合键，打开Windows设置界面。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202407282002048.png"/>

- 在设置界面中，点击“网络和Internet”选项。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202407282004432.png"/>

- 在弹出的属性窗口中，您可以看到当前设备的网络连接信息，包括IPv4地址（即IP地址）。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202407282005586.png"/>

- 在设置界面，点击“系统” 再点击 “关于” 选项。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202407282007850.png"/>

:::



**第五步：在“添加LPR 兼容打印机”窗口中，输入如下信息（上方记住的计算机名和共享名）**

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202407281745630.png"/>

**第六步：选择打印机的品牌和型号。**

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202407281745116.png"/>

以上就是利用LPD协议来共享打印机的方法。







