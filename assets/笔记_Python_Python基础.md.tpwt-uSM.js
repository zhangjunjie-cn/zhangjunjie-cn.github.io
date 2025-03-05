import{_ as m,z as y,L as n,c as t,W as e,E as c,aw as g,S as l,y as r,D as d,G as b}from"./chunks/framework.CM4BUq8o.js";const _=JSON.parse('{"title":"Python 基础","description":"","frontmatter":{"createtime":"2024/1/25","title":"Python 基础","outline":[2,3],"isTop":true,"categories":["笔记"],"tags":["Python"]},"headers":[],"relativePath":"笔记/Python/Python基础.md","filePath":"笔记/Python/Python基础.md","lastUpdated":1731934995000}'),E={name:"笔记/Python/Python基础.md"},v={class:"tip custom-block"};function f(a,s,C,q,P,F){const h=l("ArticleMetadata1"),o=l("ClientOnly"),u=l("NolebaseGitContributors"),k=l("NolebaseGitChangelog");return r(),y("div",null,[s[3]||(s[3]=n("h1",{id:"python-基础",tabindex:"-1"},[t("Python 基础 "),n("a",{class:"header-anchor",href:"#python-基础","aria-label":'Permalink to "Python 基础"'},"​")],-1)),e(o,null,{default:c(()=>{var p,i;return[(((p=a.$frontmatter)==null?void 0:p.aside)??!0)&&(((i=a.$frontmatter)==null?void 0:i.showArticleMetadata)??!0)?(r(),d(h,{key:0,article:a.$frontmatter},null,8,["article"])):b("",!0)]}),_:1}),n("div",v,[s[0]||(s[0]=n("p",{class:"custom-block-title"},"头文件",-1)),s[1]||(s[1]=n("p",null,"#!/usr/bin/python",-1)),s[2]||(s[2]=n("h1",{id:"coding-utf-8",tabindex:"-1"},[t("-"),n("em",null,"- coding: UTF-8 -"),t("- "),n("a",{class:"header-anchor",href:"#coding-utf-8","aria-label":'Permalink to "-*- coding: UTF-8 -*-"'},"​")],-1)),e(o,null,{default:c(()=>{var p,i;return[(((p=a.$frontmatter)==null?void 0:p.aside)??!0)&&(((i=a.$frontmatter)==null?void 0:i.showArticleMetadata)??!0)?(r(),d(h,{key:0,article:a.$frontmatter},null,8,["article"])):b("",!0)]}),_:1})]),s[4]||(s[4]=g(`<h2 id="_1-python3-x-的-print-函数" tabindex="-1">1.Python3.x 的 print 函数 <a class="header-anchor" href="#_1-python3-x-的-print-函数" aria-label="Permalink to &quot;1.Python3.x 的 print 函数&quot;">​</a></h2><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">list</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;a&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;b&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;c&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)            </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#没有报错，所以使用的是python3</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="_2-python-标识符" tabindex="-1">2.Python 标识符 <a class="header-anchor" href="#_2-python-标识符" aria-label="Permalink to &quot;2.Python 标识符&quot;">​</a></h2><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;hello&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;runoob&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="_3-行和缩进" tabindex="-1">3.行和缩进 <a class="header-anchor" href="#_3-行和缩进" aria-label="Permalink to &quot;3.行和缩进&quot;">​</a></h2><p>if True: print (&quot;True&quot;) else: print (&quot;False&quot;)</p><h2 id="_4-python注释" tabindex="-1">4.Python注释 <a class="header-anchor" href="#_4-python注释" aria-label="Permalink to &quot;4.Python注释&quot;">​</a></h2><p>&#39;&#39;&#39; 这是多行注释，使用单引号。 这是多行注释，使用单引号。 这是多行注释，使用单引号。 &#39;&#39;&#39;</p><p>&quot;&quot;&quot; 这是多行注释，使用双引号。 这是多行注释，使用双引号。 这是多行注释，使用双引号。 &quot;&quot;&quot;</p><h2 id="_5-print-输出" tabindex="-1">5.print 输出 <a class="header-anchor" href="#_5-print-输出" aria-label="Permalink to &quot;5.print 输出&quot;">​</a></h2><p>x=&quot;a&quot; y=&quot;b&quot;</p><h2 id="_6-换行输出" tabindex="-1">6.换行输出 <a class="header-anchor" href="#_6-换行输出" aria-label="Permalink to &quot;6.换行输出&quot;">​</a></h2><p>&quot;&quot;&quot; 逗号不换行是 print x print y</p><p>print &#39;---------&#39;</p><h3 id="不换行输出" tabindex="-1">不换行输出 <a class="header-anchor" href="#不换行输出" aria-label="Permalink to &quot;不换行输出&quot;">​</a></h3><p>print x, print y,</p><h3 id="不换行输出-1" tabindex="-1">不换行输出 <a class="header-anchor" href="#不换行输出-1" aria-label="Permalink to &quot;不换行输出&quot;">​</a></h3><p>print x,y &quot;&quot;&quot;</p><h2 id="_7-python列表" tabindex="-1">7.Python列表 <a class="header-anchor" href="#_7-python列表" aria-label="Permalink to &quot;7.Python列表&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>List（列表） 是 Python 中使用最频繁的数据类型。</p><p>列表可以完成大多数集合类的数据结构实现。它支持字符，数字，字符串甚至可以包含列表（即嵌套）。</p><p>列表用 [ ] 标识，是 python 最通用的复合数据类型。</p><p>列表中值的切割也可以用到变量 [头下标:尾下标] ，就可以截取相应的列表，从左到右索引默认 0 开始，从右到左索引默认 -1 开始，下标可以为空表示取到头或尾。</p></div><figure><img src="https://www.runoob.com/wp-content/uploads/2014/08/list_slicing1_new1.png" alt="" tabindex="0"><figcaption></figcaption></figure><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">str1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;Hello World!&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (str1)  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出完整字符串</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (str1[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出字符串中的第一个字符</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (str1[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出字符串中第三个至第六个之间的字符串</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (str1[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:])  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出从第三个字符开始的字符串</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (str1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出字符串两次</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (str1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;TEST&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出连接的字符串</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>输出结果:</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Hello World!</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">H</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">llo</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">llo World!</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Hello World</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Hello World!</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Hello World</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">!</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TEST</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="_8-python算术运算符" tabindex="-1">8.Python算术运算符 <a class="header-anchor" href="#_8-python算术运算符" aria-label="Permalink to &quot;8.Python算术运算符&quot;">​</a></h2><table tabindex="0"><thead><tr><th>运算符</th><th>描述</th><th>实例</th></tr></thead><tbody><tr><td>+</td><td>加 - 两个对象相加</td><td>a + b 输出结果 30</td></tr><tr><td>-</td><td>减 - 得到负数或是一个数减去另一个数</td><td>a - b 输出结果 -10</td></tr><tr><td>*</td><td>乘 - 两个数相乘或是返回一个被重复若干次的字符串</td><td>a * b 输出结果 200</td></tr><tr><td>/</td><td>除 - x除以y</td><td>b / a 输出结果 2</td></tr><tr><td>%</td><td>取模 - 返回除法的余数</td><td>b % a 输出结果 0</td></tr><tr><td>**</td><td>幂 - 返回x的y次幂</td><td>a**b 为10的20次方， 输出结果 100000000000000000000</td></tr><tr><td>//</td><td>取整除 - 返回商的整数部分（向下取整）</td><td>&gt;&gt;&gt; 9//2<br> 4<br> &gt;&gt;&gt; -9//2<br> -5</td></tr></tbody></table><h2 id="_9-python逻辑运算符" tabindex="-1">9.Python逻辑运算符 <a class="header-anchor" href="#_9-python逻辑运算符" aria-label="Permalink to &quot;9.Python逻辑运算符&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>a = 10</span></span>
<span class="line"><span>b = 20</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if a and b:</span></span>
<span class="line"><span>    print (&quot;1 - 变量 a 和 b 都为 True&quot;)</span></span>
<span class="line"><span>else:</span></span>
<span class="line"><span>    print (&quot;1 - 变量 a 和 b 有一个不为 True&quot;)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="_10-python-条件语句" tabindex="-1">10.Python 条件语句 <a class="header-anchor" href="#_10-python-条件语句" aria-label="Permalink to &quot;10.Python 条件语句&quot;">​</a></h2><figure><img src="https://www.runoob.com/wp-content/uploads/2014/05/006faQNTgw1f5wnm0mcxrg30ci07o47l.gif" alt="" tabindex="0"><figcaption></figcaption></figure><h2 id="_11-python-循环语句" tabindex="-1">11.Python 循环语句 <a class="header-anchor" href="#_11-python-循环语句" aria-label="Permalink to &quot;11.Python 循环语句&quot;">​</a></h2><p>Python 提供了 for 循环和 while 循环（在 Python 中没有 do..while 循环）:</p><table tabindex="0"><thead><tr><th>循环类型</th><th>描述</th></tr></thead><tbody><tr><td>while 循环</td><td>在给定的判断条件为 true 时执行循环体，否则退出循环体。</td></tr><tr><td>for 循环</td><td>重复执行语句</td></tr><tr><td>嵌套循环</td><td>你可以在while循环体中嵌套for循环</td></tr></tbody></table><h3 id="循环控制语句" tabindex="-1">循环控制语句 <a class="header-anchor" href="#循环控制语句" aria-label="Permalink to &quot;循环控制语句&quot;">​</a></h3><p>循环控制语句可以更改语句执行的顺序。Python支持以下循环控制语句：</p><table tabindex="0"><thead><tr><th>控制语句</th><th>描述</th></tr></thead><tbody><tr><td>break 语句</td><td>在语句块执行过程中终止循环，并且跳出整个循环</td></tr><tr><td>continue 语句</td><td>在语句块执行过程中终止当前循环，跳出该次循环，执行下一次循环。</td></tr><tr><td>pass 语句</td><td>pass是空语句，是为了保持程序结构的完整性。</td></tr></tbody></table><p>复杂一点： <img src="https://www.runoob.com/wp-content/uploads/2013/11/loop-over-python-list-animation.gif" alt=""></p><h2 id="_12-双重循环使用-else-语句" tabindex="-1">12.双重循环使用 else 语句 <a class="header-anchor" href="#_12-双重循环使用-else-语句" aria-label="Permalink to &quot;12.双重循环使用 else 语句&quot;">​</a></h2><p>在 python 中，for … else 表示这样的意思，for 中的语句和普通的没有区别，else 中的语句会在循环正常执行完（即 for 不是通过 break 跳出而中断的）的情况下执行，while … else 也是一样。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/usr/bin/python</span></span>
<span class="line"><span># -*- coding: UTF-8 -*-</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>for num in range(10,20):  # 迭代 10 到 20 (不包含) 之间的数字</span></span>
<span class="line"><span>   for i in range(2,num): # 根据因子迭代</span></span>
<span class="line"><span>      if num%i == 0:      # 确定第一个因子</span></span>
<span class="line"><span>         j=num/i          # 计算第二个因子</span></span>
<span class="line"><span>         print (&#39;%d 等于 %d * %d&#39; % (num,i,j))</span></span>
<span class="line"><span>         break            # 跳出当前循环</span></span>
<span class="line"><span>   else:                  # 循环的 else 部分</span></span>
<span class="line"><span>      print (&#39;%d 是一个质数&#39; % num)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>以上输出结果：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>10 等于 2 * 5</span></span>
<span class="line"><span>11 是一个质数</span></span>
<span class="line"><span>12 等于 2 * 6</span></span>
<span class="line"><span>13 是一个质数</span></span>
<span class="line"><span>14 等于 2 * 7</span></span>
<span class="line"><span>15 等于 3 * 5</span></span>
<span class="line"><span>16 等于 2 * 8</span></span>
<span class="line"><span>17 是一个质数</span></span>
<span class="line"><span>18 等于 2 * 9</span></span>
<span class="line"><span>19 是一个质数</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="_13-python-break-语句" tabindex="-1">13.Python break 语句 <a class="header-anchor" href="#_13-python-break-语句" aria-label="Permalink to &quot;13.Python break 语句&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/usr/bin/python</span></span>
<span class="line"><span># -*- coding: UTF-8 -*-</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for letter in &#39;Python&#39;:  # 第一个实例</span></span>
<span class="line"><span>    if letter == &#39;h&#39;:</span></span>
<span class="line"><span>        break</span></span>
<span class="line"><span>    print (&#39;当前字母 :&#39;, letter)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>var = 10  # 第二个实例</span></span>
<span class="line"><span>while var &gt; 0:</span></span>
<span class="line"><span>    print (&#39;当前变量值 :&#39;, var)</span></span>
<span class="line"><span>    var = var - 1</span></span>
<span class="line"><span>    if var == 5:  # 当变量 var 等于 5 时退出循环</span></span>
<span class="line"><span>        break</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print (&quot;Good bye!&quot;)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>当前字母 : P</span></span>
<span class="line"><span>当前字母 : y</span></span>
<span class="line"><span>当前字母 : t</span></span>
<span class="line"><span>当前变量值 : 10</span></span>
<span class="line"><span>当前变量值 : 9</span></span>
<span class="line"><span>当前变量值 : 8</span></span>
<span class="line"><span>当前变量值 : 7</span></span>
<span class="line"><span>当前变量值 : 6</span></span>
<span class="line"><span>Good bye!</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="_14-python-continue-语句" tabindex="-1">14.Python continue 语句 <a class="header-anchor" href="#_14-python-continue-语句" aria-label="Permalink to &quot;14.Python continue 语句&quot;">​</a></h2><p>Python continue 语句跳出本次循环，而break跳出整个循环。</p><p>continue 语句用来告诉Python跳过当前循环的剩余语句，然后继续进行下一轮循环。</p><p>continue语句用在while和for循环中。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/usr/bin/python</span></span>
<span class="line"><span># -*- coding: UTF-8 -*-</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>for letter in &#39;Python&#39;:     # 第一个实例</span></span>
<span class="line"><span>   if letter == &#39;h&#39;:</span></span>
<span class="line"><span>      continue</span></span>
<span class="line"><span>   print &#39;当前字母 :&#39;, letter</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>var = 10                    # 第二个实例</span></span>
<span class="line"><span>while var &gt; 0:              </span></span>
<span class="line"><span>   var = var -1</span></span>
<span class="line"><span>   if var == 5:</span></span>
<span class="line"><span>      continue</span></span>
<span class="line"><span>   print &#39;当前变量值 :&#39;, var</span></span>
<span class="line"><span>print &quot;Good bye!&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>当前字母 : P</span></span>
<span class="line"><span>当前字母 : y</span></span>
<span class="line"><span>当前字母 : t</span></span>
<span class="line"><span>当前字母 : o</span></span>
<span class="line"><span>当前字母 : n</span></span>
<span class="line"><span>当前变量值 : 9</span></span>
<span class="line"><span>当前变量值 : 8</span></span>
<span class="line"><span>当前变量值 : 7</span></span>
<span class="line"><span>当前变量值 : 6</span></span>
<span class="line"><span>当前变量值 : 4</span></span>
<span class="line"><span>当前变量值 : 3</span></span>
<span class="line"><span>当前变量值 : 2</span></span>
<span class="line"><span>当前变量值 : 1</span></span>
<span class="line"><span>当前变量值 : 0</span></span>
<span class="line"><span>Good bye!</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="_15-python-pass-语句" tabindex="-1">15.Python pass 语句 <a class="header-anchor" href="#_15-python-pass-语句" aria-label="Permalink to &quot;15.Python pass 语句&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/usr/bin/python</span></span>
<span class="line"><span># -*- coding: UTF-8 -*- </span></span>
<span class="line"><span> </span></span>
<span class="line"><span># 输出 Python 的每个字母</span></span>
<span class="line"><span>for letter in &#39;Python&#39;:</span></span>
<span class="line"><span>   if letter == &#39;h&#39;:</span></span>
<span class="line"><span>      pass</span></span>
<span class="line"><span>      print &#39;这是 pass 块&#39;</span></span>
<span class="line"><span>   print &#39;当前字母 :&#39;, letter</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>print &quot;Good bye!&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>以上实例执行结果：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>当前字母 : P</span></span>
<span class="line"><span>当前字母 : y</span></span>
<span class="line"><span>当前字母 : t</span></span>
<span class="line"><span>这是 pass 块</span></span>
<span class="line"><span>当前字母 : h</span></span>
<span class="line"><span>当前字母 : o</span></span>
<span class="line"><span>当前字母 : n</span></span>
<span class="line"><span>Good bye!</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div>`,55)),e(u),e(k)])}const w=m(E,[["render",f]]);export{_ as __pageData,w as default};
