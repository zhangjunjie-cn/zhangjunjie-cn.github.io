---

createtime: 2024/1/25
title: Python 基础
outline: [2,3]
isTop: true
categories:
 - 笔记
tags:
 - Python

---
# Python 基础

::: tip 头文件
#!/usr/bin/python
# -*- coding: UTF-8 -*-
:::

## 1.Python3.x 的 print 函数
```python
list =["a", "b", "c"]
print (list)            #没有报错，所以使用的是python3
```


## 2.Python 标识符
```python
print ('hello');print ('runoob');
```



## 3.行和缩进
if True:
    print ("True")
else:
    print ("False")


## 4.Python注释
'''
这是多行注释，使用单引号。
这是多行注释，使用单引号。
这是多行注释，使用单引号。
'''

"""
这是多行注释，使用双引号。
这是多行注释，使用双引号。
这是多行注释，使用双引号。
"""

## 5.print 输出
x="a"
y="b"

## 6.换行输出
"""  逗号不换行是
print x
print y

print '---------'
### 不换行输出
print x,
print y,

### 不换行输出
print x,y
"""

## 7.Python列表
::: tip
List（列表） 是 Python 中使用最频繁的数据类型。

列表可以完成大多数集合类的数据结构实现。它支持字符，数字，字符串甚至可以包含列表（即嵌套）。

列表用 [ ] 标识，是 python 最通用的复合数据类型。

列表中值的切割也可以用到变量 [头下标:尾下标] ，就可以截取相应的列表，从左到右索引默认 0 开始，从右到左索引默认 -1 开始，下标可以为空表示取到头或尾。
:::

![](https://www.runoob.com/wp-content/uploads/2014/08/list_slicing1_new1.png)

```python
str1 = 'Hello World!'

print (str1)  # 输出完整字符串
print (str1[0])  # 输出字符串中的第一个字符
print (str1[2:5])  # 输出字符串中第三个至第六个之间的字符串
print (str1[2:])  # 输出从第三个字符开始的字符串
print (str1 * 2)  # 输出字符串两次
print (str1 + "TEST")  # 输出连接的字符串
```

输出结果:
```python
Hello World!
H
llo
llo World!
Hello World!Hello World!
Hello World!TEST
```

## 8.Python算术运算符


|运算符 | 描述| 实例|
|---|---|---|
|+  | 加 - 两个对象相加| a + b 输出结果 30 |
|-  | 减 - 得到负数或是一个数减去另一个数|a - b 输出结果 -10 |
|*	|乘 - 两个数相乘或是返回一个被重复若干次的字符串 |	a * b 输出结果 200
| / |	除 - x除以y	| b / a 输出结果 2|
| % |	取模 - 返回除法的余数 |	b % a 输出结果 0 |
| ** |	幂 - 返回x的y次幂| a**b 为10的20次方， 输出结果 100000000000000000000|
|//|	取整除 - 返回商的整数部分（向下取整） | >>> 9//2<br> 4<br> >>> -9//2<br> -5 |


## 9.Python逻辑运算符
```
a = 10
b = 20

if a and b:
    print ("1 - 变量 a 和 b 都为 True")
else:
    print ("1 - 变量 a 和 b 有一个不为 True")
```

## 10.Python 条件语句
![](https://www.runoob.com/wp-content/uploads/2014/05/006faQNTgw1f5wnm0mcxrg30ci07o47l.gif)


## 11.Python 循环语句
Python 提供了 for 循环和 while 循环（在 Python 中没有 do..while 循环）:

|循环类型	|描述|
|---|---|
|while 循环	|在给定的判断条件为 true 时执行循环体，否则退出循环体。|
|for 循环|	重复执行语句|
|嵌套循环	|你可以在while循环体中嵌套for循环|

### 循环控制语句
循环控制语句可以更改语句执行的顺序。Python支持以下循环控制语句：

|控制语句|	描述|
|---|---|
|break 语句	|在语句块执行过程中终止循环，并且跳出整个循环|
|continue 语句 |	在语句块执行过程中终止当前循环，跳出该次循环，执行下一次循环。|
|pass 语句	|pass是空语句，是为了保持程序结构的完整性。|

复杂一点：
![](https://www.runoob.com/wp-content/uploads/2013/11/loop-over-python-list-animation.gif)

## 12.双重循环使用 else 语句
在 python 中，for … else 表示这样的意思，for 中的语句和普通的没有区别，else 中的语句会在循环正常执行完（即 for 不是通过 break 跳出而中断的）的情况下执行，while … else 也是一样。

```
#!/usr/bin/python
# -*- coding: UTF-8 -*-
 
for num in range(10,20):  # 迭代 10 到 20 (不包含) 之间的数字
   for i in range(2,num): # 根据因子迭代
      if num%i == 0:      # 确定第一个因子
         j=num/i          # 计算第二个因子
         print ('%d 等于 %d * %d' % (num,i,j))
         break            # 跳出当前循环
   else:                  # 循环的 else 部分
      print ('%d 是一个质数' % num)
```
以上输出结果：
```
10 等于 2 * 5
11 是一个质数
12 等于 2 * 6
13 是一个质数
14 等于 2 * 7
15 等于 3 * 5
16 等于 2 * 8
17 是一个质数
18 等于 2 * 9
19 是一个质数

```
## 13.Python break 语句

```
#!/usr/bin/python
# -*- coding: UTF-8 -*-

for letter in 'Python':  # 第一个实例
    if letter == 'h':
        break
    print ('当前字母 :', letter)


var = 10  # 第二个实例
while var > 0:
    print ('当前变量值 :', var)
    var = var - 1
    if var == 5:  # 当变量 var 等于 5 时退出循环
        break

print ("Good bye!")
```

```
当前字母 : P
当前字母 : y
当前字母 : t
当前变量值 : 10
当前变量值 : 9
当前变量值 : 8
当前变量值 : 7
当前变量值 : 6
Good bye!
```

## 14.Python continue 语句
Python continue 语句跳出本次循环，而break跳出整个循环。

continue 语句用来告诉Python跳过当前循环的剩余语句，然后继续进行下一轮循环。

continue语句用在while和for循环中。

```
#!/usr/bin/python
# -*- coding: UTF-8 -*-
 
for letter in 'Python':     # 第一个实例
   if letter == 'h':
      continue
   print '当前字母 :', letter
 
var = 10                    # 第二个实例
while var > 0:              
   var = var -1
   if var == 5:
      continue
   print '当前变量值 :', var
print "Good bye!"
```

```
当前字母 : P
当前字母 : y
当前字母 : t
当前字母 : o
当前字母 : n
当前变量值 : 9
当前变量值 : 8
当前变量值 : 7
当前变量值 : 6
当前变量值 : 4
当前变量值 : 3
当前变量值 : 2
当前变量值 : 1
当前变量值 : 0
Good bye!

```

## 15.Python pass 语句
```
#!/usr/bin/python
# -*- coding: UTF-8 -*- 
 
# 输出 Python 的每个字母
for letter in 'Python':
   if letter == 'h':
      pass
      print '这是 pass 块'
   print '当前字母 :', letter
 
print "Good bye!"
```

以上实例执行结果：
```
当前字母 : P
当前字母 : y
当前字母 : t
这是 pass 块
当前字母 : h
当前字母 : o
当前字母 : n
Good bye!

```