# JavaScript基础-replace方法的第二个参数

> 最近又重新看了下高程4，又是不同的收获，其中对`replace`方法印象较深，因为之前做的一个小功能可以用这个方法的第二个参数很轻松轻松地实现，这里简单记录一下。

## 基本使用

一般来说，用得最多的可能就是`'some string'.replace(/s/gi, 'target')`这样的了

其中，第一个参数可以是一个字符串`'some string'.replace('s', 'target')`，也可以是刚才提到的正则表达式，有人讨厌正则表达式，说当你认为这个问题可以用正则表达式来解决的时候，那么你就陷入了另外一个问题，不过我确挺喜欢正则的，几乎所有的字符串处理都可以用其方便地处理，这里地第一个参数没什么可讨论的，接下来就直接讨论第二个参数吧。

第二个参数的第一种用法就是刚才使用的也是一个字符串，作用就是替换参数一匹配的字符串，比如刚才的运行结果就是这样，平常这样使用也完全足够了：

![](https://oss.justin3go.com/blogs/Pasted%20image%2020221201164355.png)

其实，第二个参数作为字符串还有一些高阶的用法，就是字符序列，在作为字符串的第二个参数中，`$`符号开头的某些特殊字符会被替换成其它字符，MDN上的表格是这样:

![](https://oss.justin3go.com/blogs/Pasted%20image%2020221201164712.png)
第一个变量名`$$`很好理解，就是用来转义的，当我们真正想插入一个`$`字符时，就需要使用`$$`来标识，接下来分别对下面集中变量名进行尝试，都是很好理解的，看看代码就懂了：

1. `$&`例子：匹配`.com`字符并将其替换为10个一样的，相当于增加了9个`.com`

```js
console.log('justin3go.com'.replace(/\.\w+/g, '$&'.repeat(10)));
```

		justin3go.com.com.com.com.com.com.com.com.com.com

2. 三四例子（基本一致）：将目标匹配字符串替换为其左边或右边部分，直接看例子吧:

```js
console.log('justin3go.com'.replace(/\.\w+/g, '$`'));
console.log('justin3go.com/demo'.replace(/\.\w+/g, "$'"));
```

		justin3gojustin3go
		justin3go/demo/demo

3. `$n`，第一个匹配的组和第二个匹配的组进行交换

```js
console.log('justin3go.com'.replace(/(\w+)\.(\w+)/g, '$2.$1'));
```

		com.justin3go

## 当第二个参数为回调函数时

回调函数在JavaScript中广泛使用，对于用户自定以一些功能来说特别有用，比如基本的数组迭代方法都是通过回调函数进行处理的`[1,2,3].map(item => item.toString())`等等，还有比如`[2,1,3].sort((a, b) => a-b)`这类

这里使用的replace方法同样支持传递一个函数进行自定义操作，基本用法如下：

MDN中介绍的参数为：

![](https://oss.justin3go.com/blogs/Pasted%20image%2020221201171454.png)
而函数的返回值就是替换后的值

举个例子，自实现模板字符串，我们有如下输入:

```js
const tpl = '欢迎参观我的博客${website}，博客的作者为${writer}，哈哈哈哈哈😀'
const var2str = {
	website: 'justin3go.com',
	writer: 'justin3go'
}
```

我们需要实现一个转换函数将`tpl`中的变量转换为我们对应的字符串，比如：

```js
const res = renderTpl(tpl, var2str);
```

这时候用`replace`的回调函数就非常方便了，具体实现如下：

```js
function renderTpl(tpl, var2str) {
	const res = tpl.replace(/\${\w+\}/gi, (match) => {
		const item = match.substring(2, match.length - 1)
		if(item in var2str)return var2str[item]
		else console.warn(`未找到可匹配的标识符: [${item}]`);
	})
	return res
}
console.log(renderTpl(tpl, var2str));
```

		欢迎参观我的博客justin3go.com，博客的作者为justin3go，哈哈哈哈哈😀

## 参考

- 《JavaScript》高级程序设计第4版
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions

