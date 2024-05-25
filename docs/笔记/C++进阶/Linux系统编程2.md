---
createTime: 2024/1/25
tag: 'C++进阶,面试'
---
# Linux系统编程2

## 4. GDB

1. GDB 是由 GNU 软件系统社区提供的调试工具，同 GCC 配套组成了一套完整的开发环境，GDB 是 Linux 和许多类 Unix 系统中的标准开发环境。

2. 一般来说，GDB 主要帮助你完成下面四个方面的功能:
   
   - 启动程序，可以按照自定义的要求随心所欲的运行程序
   
   - 可让被调试的程序在所指定的调置的断点处停住(断点可以是条件表达式)
   
   - 当程序被停住时，可以检查此时程序中所发生的事
   
   - 可以改变程序，将一个 BUG 产生的影响修正从而测试其他 BUG

3. 通常，在为调试而编译时，我们会()关掉编译器的优化选项(-0)，并打开调试选项(-g)。另外，wa11 在尽量不影响程序行为的情况下选项打开所有 warning，也可以发现许多问题，避免一些不必要的BUG.
   
   ```shell
   gcc-g -Wa11 program.c -o program
   ```

4. `-g` 选项的作用是在可执行文件中加入源代码的信息，比如可执行文件中第几条机器指令对应源代码的第几行，但并不是把整个源文件嵌入到可执行文件中，所以在调试时必须保证 gdb 能找到源文件。

5. GDB命令

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/ff49b941-3689-4aae-8fcc-15077a51925e.png" style="zoom:67%;">

gcc 是专门来编译c++代码的，如果里面引用了c++的一些库，那gcc就不能编译了，需要make 然后 gcc 来执行.o文件

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/7426c9d4-2477-48d7-9e6e-6e1d47fa1c1f.png" title="" alt="7426c9d4-2477-48d7-9e6e-6e1d47fa1c1f" style="zoom:80%;">

## 5.静态库和动态库

### 5.1 什么是库

- 库文件是计算机上的一类文件，可以简单的把库文件看成一种代码仓库，它提供给使用者一些可以直接拿来用的变量、函数或类。

- 库是特殊的一种程序，编写库的程序和编写一般的程序区别不大，只是库不能单独运行。

- 库文件有两种，静态库和动态库(共享库)，区别是:静态库在程序的链接阶段（把多个目标代码，包括静态库代码、启动代码链接成一个可执行程序）被复制到了程序中;动态库在链接阶段没有被复制到程序中，而是程序在运行时由系统动态加载到内存中供程序调用。

- 库的好处:1.代码保密（看不到你的原代码）  2.方便部署和分发

### 5.2静态库

#### 命名规则

```shell
Linux : libxxx.a
    lib : 前缀（固定）
    xxx : 库的名字，自己起
     .a : 后缀（固定）
windouws: libxxx.lib
```

#### 静态库的制作

1. gcc 获得.o文件

2. 将.o文件打包，使用 ar 工具(archive)

```shell
gcc hello.c -c   //这样就能生成hello.o目标文件

ar rcs libxxx.a xxx.o xxx.o
```

> **r - 将文件插入备存文件中
> c - 建立备存文件
> s - 索引**

#### 5.2.1命名规则

#### 5.2.2分文件项目：

- 头文件是函数的声明，源文件是具体函数的实现，main文件是导入头文件用一下。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/927caa82-0c63-4a47-b1c5-72f769b7b429.png" title="" alt="927caa82-0c63-4a47-b1c5-72f769b7b429" style="zoom:72%;">

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/6440a43d-aad8-48ed-a618-1489c01267ee.png" title="" alt="6440a43d-aad8-48ed-a618-1489c01267ee" style="zoom:100%;">

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/f64957dc-0843-4b47-a2c5-9c40d282a2f1.png" title="" alt="f64957dc-0843-4b47-a2c5-9c40d282a2f1" style="zoom:80%;">

```shell
gcc add.c div.c mult.c sub.c -c  //-c 是编译、汇编源文件，但不进行链接。
                                 //会把每个文件的.o文件生成


ar rcs libcalc.a  *.o   //所有的 .o文件，生成libcalc.a静态库文件。
```

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/15bec7ae-03ab-451c-a4ed-42aa2ade0067.png" title="" alt="15bec7ae-03ab-451c-a4ed-42aa2ade0067" style="zoom:76%;">

#### 5.2.3 使用静态库文件

- 如果别人要使用你这个库，需要头文件 head.h (才知道你有哪些方法)和这个库文件libcalc.a

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/0132dd38-b6ca-4e9f-ad38-eda5e1bef21b.png" title="" alt="0132dd38-b6ca-4e9f-ad38-eda5e1bef21b" style="zoom:80%;">

- 如果直接使用，会因找不到 include而报错，因为代码中#include 就是当前目录，需要`-I` 来指定路径。
  
  ```shell
  gcc main.c -o app -I ../jinclude/
  ```

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/bbc89353-d6a9-40df-9953-bc3849a5b9da.png" title="" alt="bbc89353-d6a9-40df-9953-bc3849a5b9da" style="zoom:57%;">

- 但也报错了，因为仅找到了 head.h的声明头文件，但是没有找到 具体的实现函数。

```shell
gcc main.c -o app -I ../include/ -l calc -L ../lib/
```

> 需要 `-o` 指定项目名，`-I` 指定头文件目录，`-l` 指定项目实现名称，`-L`指定项目实现路径。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/01602b2e-a33a-431b-a090-621152788f01.png" title="" alt="01602b2e-a33a-431b-a090-621152788f01" style="zoom:80%;">

### 5.3动态库

动态库的制作:

1. gcc 得到.0 文件，fpic 得到和位置无关的代码

```shell
gcc -c fpic/-fpIc a.c  b.c
```

2. gcc 得到动态库

```shell
gcc -shared  a.o  b.o -o  libcalc.so
```

- `-o` 是指定的生成目标的名称。就生成一个动态库。

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/a9daea0b-0cd5-4d82-9f02-f8828dd6e064.png" title="" alt="a9daea0b-0cd5-4d82-9f02-f8828dd6e064" style="zoom:67%;">

- 目录

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/1ed6e4d2-bed9-4aa1-acd1-c8bb06ea8692.png" alt="1ed6e4d2-bed9-4aa1-acd1-c8bb06ea8692" style="zoom:100%;">

- 编译

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/c7d3dea7-c391-49a6-a766-56721b6cb64d.png" title="" alt="c7d3dea7-c391-49a6-a766-56721b6cb64d" style="zoom:61%;">

- 查看缺少的动态库

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/4fc775bd-4776-4eb5-bde4-a7491305468c.png" title="" alt="4fc775bd-4776-4eb5-bde4-a7491305468c" style="zoom:80%;">

- 手动设置动态去绝对路径

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/06e62d29-6601-4dde-89ec-52027e3f5d80.png" title="" alt="06e62d29-6601-4dde-89ec-52027e3f5d80" style="zoom:62%;">

### 5.4工作原理

- 静态库:GCC进行链接时，会把静态库中代码打包到可执行程序中（饿汉式加载）

- 动态库:GCC进行链接时，动态库的代码不会被打包到可执行程序中

- 程序启动之后，动态库会被动态加载到内存中（懒加载），通过ldd  (list dynamic dependencies) 命令检查动态库依赖关系

- 如何定位共享库文件呢?
  当系统加载可执行代码时候，能够知道其所依赖的库的名字，但是还需要知道绝对路径，此时就需要系统的动态载入器来获取该绝对路径。对于 elf格式的可执行程序，是由 ld-inux.so 来完成的，它先后搜索 elf文件的DT_RPATH段 -->环境变量LD_LIBRARY_PATH -->/etc/ld.so.cache 文件列表 --> /ib/，/usr/lib目录找到库文件后将其载入内存。

> /etc/   是全局配置环境变量
> 
> /usr/  是用户级别配置变量

```shell
export  LD_LIBRARY  PATH=$LD_LIBRARY   PATH:/home/nowcoder/Linux/lesson03/04_lib/library/lib
```



### 5.5区别

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/163a2dde-53e9-4717-b7af-bc20e1104ce4.png" alt="163a2dde-53e9-4717-b7af-bc20e1104ce4" style="zoom:67%;">

- 静态库

在链接阶段就放到应用程序当中了

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/33dd9f27-d986-4dfb-84b9-78316b33ea22.png" alt="33dd9f27-d986-4dfb-84b9-78316b33ea22" style="zoom:67%;">

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/fc23de14-bf8e-4cc1-bd24-7941598f8c6a.png" alt="fc23de14-bf8e-4cc1-bd24-7941598f8c6a" style="zoom:80%;">

- 动态库（懒加载）

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/2417bd49-7a79-4545-9821-c56d34845670.png" title="" alt="2417bd49-7a79-4545-9821-c56d34845670" style="zoom:67%;">

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/1f2c1bb4-7bc2-4fda-9047-956a9fdb066b.png" alt="1f2c1bb4-7bc2-4fda-9047-956a9fdb066b" style="zoom:80%;">

> 保存的不是文件，而是库的路径信息。程序运行起来后，才会把加载进来，用到的时候才去。
> 
> 热部署快，更新方便。

## 6. 文件IO

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/ba63bf4b-e89c-4892-8652-ce87ebcf04d6.png" title="" alt="ba63bf4b-e89c-4892-8652-ce87ebcf04d6" style="zoom:80%;">

### 6.1标准C库IO函数

> 其实用到的就是Linux系统的函数

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/12a9bd67-54a9-431e-b6d4-82f3129095e5.png" title="" alt="12a9bd67-54a9-431e-b6d4-82f3129095e5" style="zoom:80%;">

>  *fp 文件指针。通过文件描述符，找到对应的文件。
> 
> 通过指针，能操作文件位置。
> 
> 通过缓冲区就能找到对应的内存块。
> 
> 把缓冲区的内容刷新到文件当中。

### 6.2 标准C库IO和Linux系统IO的关系

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/e3906e68-7b22-4665-bed1-5de1e575a529.png" title="" alt="e3906e68-7b22-4665-bed1-5de1e575a529" style="zoom:80%;">

- 标准C库里面有缓冲区，然后Linux的api （write\read） 再从缓冲区里去操作，操作读写。所以操作起来比Linux io的函数效率要高。

### 6.3 虚拟地址空间

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/77fb94ad-660f-4bb4-aad1-394bdc904a32.png" title="" alt="77fb94ad-660f-4bb4-aad1-394bdc904a32" style="zoom:67%;">

- 当 a.out 运行起来，就是一个进程，进程要分配资源，对于进程来说 ，系统会为他创建虚拟地址空间（虚拟内存空间）。

- 其实 int* 指针的内存地址，其实就是虚拟地址空间来的，并不是真实的物理地址。

- 堆和栈，就是从低到高，和从高到低进行增长的。

- 共享库，就是动态库，环境变量在这里面。

> 有一个静态变量，未初始化在 .bss段，初始化在 .data段。
> 
> 堆空间是从低地址到高地址，栈空间是从高地址到低地址。

## 6.4 文件描述符

<img title="" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/71f40f28-4991-4b64-8222-f2dee52f6c6e.png" alt="71f40f28-4991-4b64-8222-f2dee52f6c6e" style="zoom:67%;">

- 文件描述符，有一个 PCB 进程控制块，就是一个内存，一个struct 数据结构结构体。Linux中一切皆文件。

### 6.5 Linux系统io 函数

- Linux系统api，也称系统调用

```c
int open(const char *pathname, int flags);        //打开一个文件
int open(const char *pathname,int flags, mode_t mode);
int close(int fd);ssize_t read(int fd, void *buf, size_t count);
ssize_t write(int fd, const void *buf, size_t count);
off_t lseek(int fd, off_t offset, int whence);
int stat(const char *pathname, struct stat *statbuf);
int 1stat(const char *pathname, struct stat *statbuf);
```

stat 结构体

```c
struct stat{
    dev_t   st_dev;    //文件的设备编号
    ino_t   st_ino;    // 节点


    穑ode_tst_mode;//文件的类型和存取的权限
    nlink_t st_nlink;//连到该文件的硬连接数目// 用户I// 组ID//设备文件的设备编号//文件字节数(文件大小)//块大小//块数
    uid_tst_uid;
    gid_tst_gid;
    dev_tst_rdev;
    off_tst_size;
bksize_t st_blksize;
b1kcnt_t
st_blocks;
time_tst_atime;
//最后一次访问时间
//最后一次修改时
time_tst_mtime;
//最后一次改变时间(指属性)
time_t st_ctime;
```

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/011c8fc7-6bc3-42e0-bd31-9b5a147e7953.png" title="" alt="011c8fc7-6bc3-42e0-bd31-9b5a147e7953" style="zoom:67%;">

# 





# 
