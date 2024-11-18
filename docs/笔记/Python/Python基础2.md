---

createtime: 2024/1/25
title: Python 基础2
outline: [2,3]
isTop: true
categories:
 - 笔记
tags:
 - Python

---
## 1. Python math 模块、cmath 模块 
Python 中数学运算常用的函数基本都在 math 模块、cmath 模块中。

Python math 模块提供了许多对浮点数的数学运算函数。

Python cmath 模块包含了一些用于复数运算的函数。

cmath 模块的函数跟 math 模块函数基本一致，区别是 cmath 模块运算的是复数，math 模块运算的是数学运算。

要使用 math 或 cmath 函数必须先导入：

```
import math
```
```
>>> import math
>>> dir(math)
['__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atan2', 'atanh', 'ceil', 'copysign', 'cos', 'cosh', 'degrees', 'e', 'erf', 'erfc', 'exp', 'expm1', 'fabs', 'factorial', 'floor', 'fmod', 'frexp', 'fsum', 'gamma', 'gcd', 'hypot', 'inf', 'isclose', 'isfinite', 'isinf', 'isnan', 'ldexp', 'lgamma', 'log', 'log10', 'log1p', 'log2', 'modf', 'nan', 'pi', 'pow', 'radians', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'tau', 'trunc']
>>>
```
实例
```
>>> import cmath
>>> cmath.sqrt(-1)
1j
>>> cmath.sqrt(9)
(3+0j)
>>> cmath.sin(1)
(0.8414709848078965+0j)
>>> cmath.log10(100)
(2+0j)
>>>
```

## 2.Python数学函数
|函数 |	返回值 ( 描述 )|
|---|---|
|abs(x)	   |返回数字的绝对值，如abs(-10) 返回 10|
|ceil(x) 	|返回数字的上入整数，如math.ceil(4.1) 返回 5|
|cmp(x, y)|如果 x < y 返回 -1, 如果 x == y 返回 0, 如果 x > y 返回 1|
|exp(x) 	|返回e的x次幂(ex),如math.exp(1) 返回2.718281828459045|
|fabs(x)	|以浮点数形式返回数字的绝对值，如math.fabs(-10) 返回10.0|
|floor(x) |返回数字的下舍整数，如math.floor(4.9)返回 4|
|log(x) 	|如math.log(math.e)返回1.0,math.log(100,10)返回2.0|
|log10(x) |返回以10为基数的x的对数，如math.log10(100)返回 2.0|
|max(x1, x2,...) 	|返回给定参数的最大值，参数可以为序列。|
|min(x1, x2,...) 	|返回给定参数的最小值，参数可以为序列。|
|modf(x) 	|返回x的整数部分与小数部分，两部分的数值符号与x相同，整数部分以浮点型表示。|
|pow(x, y)	|x**y 运算后的值。|
|round(x [,n])	|返回浮点数x的四舍五入值，如给出n值，则代表舍入到小数点后的位数。|
|sqrt(x) 	|返回数字x的平方根|


## 3.Python字符串运算符
下表实例变量 a 值为字符串 "Hello"，b 变量值为 "Python"：

|操作符|   描述 |	实例|
|---|---|---|
|+	   |字符串连接	 |  >>>a + b <br>'HelloPython'|
|*	   |重复输出字符串	|>>>a * 2<br>'HelloHello'|
|[]	   |通过索引获取字符串中字符|>>>a[1] <br>'e'|
|[ : ]	| 截取字符串中的一部分|	>>>a[1:4]<br>'ell'|
|in	   |成员运算符 - 如果字符串中包含给定的字符返回 True 	   | >>>"H" in a <br>True|
|not in |成员运算符 - 如果字符串中不包含给定的字符返回 True 	|>>>"M" not in a<br>True |
|r/R	   |原始字符串 - 原始字符串：所有的字符串都是直接按照字面的意思来使用，没有转义特殊或不能打印的字符。 原始字符串除在字符串的第一个引号前加上字母"r"（可以大小写）以外，与普通字符串有着几乎完全相同的语法。	 |>>>print r'\n'<br>\n<br>>>> print R'\n'<br>\n<br>
|%	|格式字符串	|请看下一章节|