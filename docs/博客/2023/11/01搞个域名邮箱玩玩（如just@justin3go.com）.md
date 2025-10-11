# 搞个域名邮箱玩玩（如`just@justin3go.com`）

## 前言

一直觉得之前的邮箱`<XXX英文名>@qq.com`或者`XXX@gmail.com`这两个常用邮箱后缀“不高级”，其次，如果自己做一个应用程序需要收发邮件的话，使用这些域名就太难看了。所以，我就搜了搜域名邮箱怎么搞，发现真的挺简单的，毕竟我自己是有一个域名的，只需绑定一个邮箱服务就好了。

目前打算该邮箱用于比较私人的重要的信息接收，比如个人博客中挂上该邮箱，某些正式场合使用该邮箱接收信息，至于一些网站注册，则还是使用之前的两个邮箱，毕竟不想该域名邮箱中拥有太多广告信息。

- `@qq.com`，国内使用
- `@gmail.com`，国外使用
- `@justin3go.com`，正式场合

> 唉，其实就是为了装一装

## 解析域名

我是很久以前在阿里云注册的，也可以在其他平台注册，比如腾讯云、Godaddy、Cloudflare之类的网站都可以，反正花钱就对了，无论什么网站，花钱都是非常快捷的，入口都是非常显眼的，我就不管这一步了。

这里以阿里云为例：

我们到该域名的[域名解析控制台](https://dns.console.aliyun.com/)，点击新手引导，点击邮箱解析，选择你要使用的企业邮箱，这里我选择的是腾讯企业邮：

![](https://oss.justin3go.com/blogs/Pasted%20image%2020231101153102.png)

然后他就会自动给你解析出如下记录：

![](https://oss.justin3go.com/blogs/Pasted%20image%2020231101153214.png)

如果你是使用的其他域名控制台，则解析最后两条就可以了。

## 创建企业邮

进入[腾讯企业邮官网](https://work.weixin.qq.com/mail/)，注册你的企业，然后在下面这里绑定你的域名地址，我这里已经绑定过了：

![](https://oss.justin3go.com/blogs/Pasted%20image%2020231101153810.png)

好了，可以了，等个2个小时左右，会收到一封官方邮件告诉你域名审核成功后，你就可以使用自己的域名邮箱了。

哦，对了，在那里看邮件呢？

## 绑定邮箱客户端

首先，腾讯企业邮有官方的网页版，并且，如果你是付费用户的话，你可以关注企业邮的公众号，收到邮件就会在微信通知你，免费的没有，只能在企业微信、网页版、第三方客户端中查看自己的邮件。

所以这里我绑定一下第三方客户端，我平常使用的是开源的[Thunderbird](https://www.thunderbird.net/zh-CN/)，

![](https://oss.justin3go.com/blogs/Pasted%20image%2020231101154351.png)

首先，我们进入[腾讯企业邮网页版](https://work.weixin.qq.com/mail/)，登录并选择你的成员账号。

然后按照如下步骤生成一个安全密码方便绑定第三方客户端使用：

![](https://oss.justin3go.com/blogs/Pasted%20image%2020231101154717.png)

接下来进入邮箱客户端，这里还是以Thunderbird为例：

![](https://oss.justin3go.com/blogs/Pasted%20image%2020231101154827.png)

点击添加账户->现有电子邮箱->填写如下表单：

![](https://oss.justin3go.com/blogs/Pasted%20image%2020231101154948.png)

密码就是刚刚复制的密码，名字随便取就好了。

如果需要其他信息，则按如下信息填就可以了

```
接收服务器：

imap.exmail.qq.com(使用SSL，端口号993)

发送服务器：

smtp.exmail.qq.com(使用SSL，端口号465)
```

发一封邮件试试，OK了：

![](https://oss.justin3go.com/blogs/Pasted%20image%2020231101155235.png)

## 最后

大功告成~

10月一整月都没输出了，愧疚啊

![](https://oss.justin3go.com/blogs/Pasted%20image%2020231101162722.png)