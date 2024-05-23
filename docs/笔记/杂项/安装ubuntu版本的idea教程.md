---
createTime: 2024/2/22
tag: 'Linux系统,实践'
---
# 安装ubuntu版本的idea教程

## 1.下载linux版本的idea

链接地址：[IntelliJ IDEA: The Capable & Ergonomic Java IDE by JetBrains](https://www.jetbrains.com/idea/)

## 2.解压到自己的路径下

在`/usr/local/ `路径下新建安装目录IDEA：


```
sudo mkdir -p /usr/local/IDEA
```





解压下载的压缩包到指定目录，执行下面的命令 

```
sudo tar -zxvf ideaIU-2022.2.3.tar.gz -C /usr/local/IDEA
```


 或者使用下面的界面直接解压

 ![](https://img-blog.csdnimg.cn/4de20ff09cd4449aae1fcda35a8de897.png)

 
::: tip 如果需要移动到其他文件路径
 
 1.打开终端（快捷键Ctrl+Alt+T）

 2.sudo nautilus



此时会跳出一个带有权限的文件管理器，接下来就能拖拽文件到本地计算机目录了，解决了权限不够的问题，注意移动结束前不要关闭终端。
:::

## 3.运行IDEA

``` 
cd /usr/local/IDEA/idea-IU-222.4345.14/bin/idea.sh
```


```
sudo sh ./install.sh 或者
su -c './install.sh'
```


 运行Intellij IDEA软件协议同意，然后点击Continue按钮 


![](https://img-blog.csdnimg.cn/72b89963691d4b41b2fe1e196d805ba4.png)

数据分享，如果不想分享，可以点击Don't Send 

 ![](https://img-blog.csdnimg.cn/7812fb01315a4210b240a6d1e5182212.png)


激活后安装成功 

![](https://img-blog.csdnimg.cn/c8c65c0d5de44243a61bcc1633dd2dfb.png)

## 4.配置IDEA快捷方式

 创建一个文件叫idea.desktop

```
sudo vim /usr/share/applications/idea.desktop 
```
启动vim 后i写入下面的内容 

```
[Desktop Entry]
Name=IntelliJ IDEA
Comment=IntelliJ IDEA
Exec=/usr/local/IDEA/idea-IU-222.4345.14/bin/idea.sh #换成自己的 idea 路径
Icon=/usr/local/IDEA/idea-IU-222.4345.14/bin/idea.png #换成自己的 idea 路径
Terminal=false
Type=Application
Categories=Developer;
```


查看是否生成idea图标 

![](https://img-blog.csdnimg.cn/f15c59aacf874a73a6854d90987bd860.png)