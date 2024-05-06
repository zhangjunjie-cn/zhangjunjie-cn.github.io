---
createTime: 2024/1/25
tag: 'C++进阶,面试'
---

# Linux系统编程



## 1. 开发环境搭建

安装sshd 服务

```shell
sudo apt install openssh-server
```

安装 gcc/g++/make等 工具

```
sudo apt install build-essential
```

安装tree

```shell
sudo at install tree
```



```shell
lyz@lyz-virtual-machine:~/WebServer-master$ ^C
lyz@lyz-virtual-machine:~/WebServer-master$ cd ..
lyz@lyz-virtual-machine:~$ ls
Linux  WebServer-master  公共的  模板  视频  图片  文档  下载  音乐  桌面

lyz@lyz-virtual-machine:~$ cd Linux/
lyz@lyz-virtual-machine:~/Linux$ gcc test.c -o test
lyz@lyz-virtual-machine:~/Linux$ ls
test  test.c
lyz@lyz-virtual-machine:~/Linux$  linux中，可执行文件是绿色的。

lyz@lyz-virtual-machine:~/Linux$ ./test
Hello World
lyz@lyz-virtual-machine:~/Linux$ 
```



## 2.GCC

- GCC 原名为 GNU C语言编译器(GNUCCompiler)
  GCC(GNU Compiler Collection，GNU编译器套件)是由 GNU 开发的编程语言译器。GNU 编译器套件包括C、C++、Objective·C、java、Ada和 Go语言前端，也包括了这些语言的库(如 libstdc++，libgcj等)

- GCC不仅支持C的许多“方言”，也可以区别不同的C语言标准;可以使用命令行选项来控制编译器在翻译源代码时应该遵循哪个C标准。例如，当使用命令行参数-std=c99 启动 GCC 时，编译器支持 C99 标准。

- 安装命令 sudo apt install build-essential   (这里面不仅包括gcc，还有make)

- 查看版本 gcc/g++ -v/--version

### 2.1 GCC工作流程

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/ebd380ab-e7d4-4f09-89b9-4612adc4e176.png" title="" alt="ebd380ab-e7d4-4f09-89b9-4612adc4e176" style="zoom:80%;">

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/9e7a3fdd-900e-4a22-836c-7a133d115248.png" title="" alt="9e7a3fdd-900e-4a22-836c-7a133d115248" style="zoom:80%;">

| 预处理 | 它会把 .h 头文件的内容，原封不动的拷贝到 .cpp里面。<br/>如果定义了宏，就会在.cpp中替换成宏值。 |
| --- | -------------------------------------------------------- |
|     |                                                          |
|     |                                                          |
|     |                                                          |



<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/23a17251-8f81-4230-b17d-9b95cc42135f.png" alt="23a17251-8f81-4230-b17d-9b95cc42135f" style="zoom:80%;">

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/62856142-1896-4a6d-b96c-e01d153c5fea.png" alt="62856142-1896-4a6d-b96c-e01d153c5fea" data-align="inline" style="zoom:80%;">

使用 方言c++14

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/247f3a57-b8d7-4799-842b-73a7e6184eb7.png" title="" alt="247f3a57-b8d7-4799-842b-73a7e6184eb7" style="zoom:80%;">

## 3. Makefile

### 3.1 简介

一个工程中的源文件不计其数，其按类型、功能、模块分别放在若干个目录中，Makefile 文件定义了一系列的规则来指定哪些文件需要先编译，哪些文件需要后编译，哪些文件需要重新编译，甚至于进行更复杂的功能操作，因为 Makefile 文件就像一个 Shell 脚本一样，也可以执行操作系统的命令。

Makefile 带来的好处就是”自动化编译”，一旦写好，只需要一个 make 命令，整个工程完全自动编译，极大的提高了软件开发的效率。make 是一个命令工具，是一个解释 Makefile 文件中指令的命令工具，一般来说，大多数的 IDE 都有这个命令，比如 Delphi的 make,Visual C++的 nmake,Linux下 GNU 的 make。

### 3.2 Makefile 文件命名和规则

1.文件命名:makefile 或者 Makefile
2.Makefile 规则:一个 Makefile 文件中可以有一个或者多个规则

```shell
目标...:依赖...
    命令（shell 命令）
    ...
```

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/691419f1-1498-462d-a3d5-0a427e3cb192.png" title="" alt="691419f1-1498-462d-a3d5-0a427e3cb192" style="zoom:80%;">

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/11478d4f-ae2b-4460-bd22-2f7915312782.png" title="" alt="11478d4f-ae2b-4460-bd22-2f7915312782" style="zoom:75%;">

**真实的Makefile：** 目标是all，不会生成具体的文件。然后命令是创建一个bin目录，进入到build，目录下执行make，&&如果前面执行成功后面make执行，否则make不会执行。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/d20fd3ef-afdd-4a7e-8651-57229d4d633d.png" title="" alt="d20fd3ef-afdd-4a7e-8651-57229d4d633d" style="zoom:80%;">

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/33f44bec-e81b-40d4-940e-3fc1d0ae699f.png" alt="33f44bec-e81b-40d4-940e-3fc1d0ae699f" style="zoom:60%;">

> 定义一个变量，值是g++，CFLAGS变量， -02优化的级别，大写o。-wall开启所有的警告级别，-g开启调试。
> 
> TARGET目标，生成server，OBJS，生成目标的依赖。
> 
> all，就是大的目标，获取所有的依赖，编译cpp的代码，一般用g++的命令， -o生成目标文件。
> 
> -pthread使用线程库。-lmysqlclient，`-l`是使用库，这里使用mysqlclient客户端的库（静态库，动态库）。
> 
> cleam，清理文件



目标：最终要生成的文件(伪目标除外)

依赖：生成目标所需要的文件或是目标

命令：通过执行命令对依赖操作生成目标(命令前必须Tab 缩进)

Makefile 中的其它规则一般都是为第一条规则服务的。

### 3.3基本原理

1. 命令在执行之前，需要先检查规则中的依赖是否存在
    a. 如果存在，执行命令
    b. 如果不存在，向下检查其它的规则，检查有没有一个规则是用来生成这个依赖的，如果找到了，则执行该规则中的命令

2. 检测更新，在执行规则中的命令时，会比较目标和依赖文件的时间。
   a. 如果依赖的时间比目标的时间晚，需要重新生成目标。
   b. 如果依赖的时间比目标的时间早，目标不需要更新，对应规则中的命令不需要被执行。

3. `就是说，如果没有更新内容的项目，他第二次部署就不会更新，`
