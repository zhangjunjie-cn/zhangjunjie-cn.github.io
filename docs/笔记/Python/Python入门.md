---

createtime: 2024/1/25
title: Python入门
outline: [2,3]
isTop: true
categories:
 - 笔记
tags:
 - Python

---
## 在Linux脚本中使用#!

在Linux中，你可以将Python程序转换为自我可执行的脚本。代码中的第一条语句应该是一个#! 。它必须包含到Python可执行文件的路径。在Linux中，Python安装在/usr/bin目录下，可执行文件的名称是python3。因此，我们将这个语句添加到hello.py文件中。

```
#!/usr/bin/python3

print ("Hello World")
```

您还需要使用chmod +x命令给文件赋予可执行权限
```
$ chmod +x hello.py
```
然后，您可以使用以下命令行运行该程序−
```
$ ./hello.py
```
这将显示以下输出
```
Hello World
```
因此，我们可以使用解释器模式和脚本模式在Python中编写和运行 Hello World 程序。