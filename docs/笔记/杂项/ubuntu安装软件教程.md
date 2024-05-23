---
createTime: 2024/2/22
tag: 'Linux系统,实践'
---

## 卸载

```
sudo apt remove nodejs
sudo apt remove npm
```
然后到以下文件夹删除相关残留文件：
进入 /usr/local/lib 删除所有 node 和 node_modules文件夹
进入 /usr/local/include 删除所有 node 和 node_modules 文件夹
进入 /usr/local/bin 删除 node 的可执行文件

然后就删除干净了

## 安装

使用apt install nodejs安装的并不是最新版的node.js，较为简单的安装最新版需要安装curl和git包，没有安装的话执行以下命令：

```
sudo apt install git curl
```

安装结束或者已经安装了的话执行以下命令：

```
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

就能安装最新的node.js，使用node -v , npm -v , npx -v 检查版本

[](https://img-blog.csdnimg.cn/09af03a2c4ad421b8ff9821fe9a6ffde.png)

## 常用的包管理器
1.dpkg  --  ubuntu
2.apt   --  ubuntu
3.rpm   --  centos
4.yum   --  centos
5.dnf   --  

## yum 和 apt 的区别

yum 和 apt 是两个不同的包管理工具，它们分别用于不同的Linux发行版。它们最主要的区别在于支持的发行版和使用的底层包管理系统。

yum:
    发行版： yum 主要用于基于RPM包管理系统的Linux发行版，例如Fedora、CentOS、RHEL（Red Hat Enterprise Linux）等。
    底层包管理系统： yum 使用的是RPM（Red Hat Package Manager）包管理系统。
    命令： 使用 yum 命令来安装、更新和卸载软件包。

示例：
```
sudo yum install [软件包名]
```
apt:
    发行版： apt 主要用于基于Debian包管理系统的Linux发行版，例如Ubuntu、Debian等。
    底层包管理系统： apt 使用的是dpkg（Debian Package）包管理系统。
    命令： 使用 apt-get 或 apt 命令来安装、更新和卸载软件包。

示例：
```
sudo apt-get install [软件包名]
```
或者

```
sudo apt install [软件包名]
```

使用方式：
    yum 和 apt 在命令行使用上有一些差异，例如 yum 通常使用 yum install，而 apt 使用 apt-get install 或者 apt install。
    在某些发行版中，也可以直接使用 dnf 命令（Fedora、RHEL 8及更新版本）替代 yum，它是 yum 的后继版本。

总的来说，选择使用 yum 还是 apt 取决于你使用的Linux发行版。如果你使用的是基于RPM包管理系统的发行版，就使用 yum 或者 dnf；如果是基于Debian包管理系统的发行版，就使用 apt-get 或者 apt。


## yum 和 rpm 的区别
RPM与yum介绍

RPM，全称为RPM Package Manager，是由Red Hat推出的软件包管理系统，现在在各种发行版中普遍使用。RPM仅适用于安装用RPM来打包的软件，目前是GNU/Linux下软件包资源最丰富的软件包类型。

Yum (Yellow dog Updater, Modified) 是一个基于 RPM 包管理的字符前端软件包管理器，能够从指定的服务器自动下载 RPM 包并且安装，可以自动解决处理包依赖性关系，并且一次安装所有依赖的软件包，无须繁琐地一次次下载、安装，更方便的添加/删除/更新RPM包，便于管理系统的更新问题。被Yellow Dog Linux本身，以及Fedora、Red Hat Enterprise Linux采用。

Yum和RPM的关系就如同apt（前端）和dpkg（后端）。