import{_ as c}from"./chunks/ArticleMetadata.Dat26yyY.js";import{_ as u,U as a,y as _,A as l,L as i,W as r,ae as g,b as m,E as y,D as b,G as E}from"./chunks/framework.CncsO2go.js";import"./chunks/theme.pqFGKIL6.js";const S=JSON.parse('{"title":"EnergyPlus入门","description":"","frontmatter":{"createtime":"2024/1/25","title":"EnergyPlus入门","outline":[2,3],"isTop":true,"categories":["笔记"],"tags":["EnergyPlus"]},"headers":[],"relativePath":"笔记/EnergyPlus/入门.md","filePath":"笔记/EnergyPlus/入门.md","lastUpdated":1731934995000}'),P={name:"笔记/EnergyPlus/入门.md"};function f(e,t,A,k,C,x){const p=c,s=a("ClientOnly"),d=a("NolebaseGitContributors"),h=a("NolebaseGitChangelog");return l(),_("div",null,[t[0]||(t[0]=i("h1",{id:"energyplus入门",tabindex:"-1"},[m("EnergyPlus入门 "),i("a",{class:"header-anchor",href:"#energyplus入门","aria-label":'Permalink to "EnergyPlus入门"'},"​")],-1)),r(s,null,{default:y(()=>{var n,o;return[(((n=e.$frontmatter)==null?void 0:n.aside)??!0)&&(((o=e.$frontmatter)==null?void 0:o.showArticleMetadata)??!0)?(l(),b(p,{key:0,article:e.$frontmatter},null,8,["article"])):E("",!0)]}),_:1}),t[1]||(t[1]=g('<h2 id="_1-版本依赖" tabindex="-1">1.版本依赖 <a class="header-anchor" href="#_1-版本依赖" aria-label="Permalink to &quot;1.版本依赖&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Sinergym version</th><th>Ubuntu version</th><th>Python version</th><th>nergyPlus version</th><th>---</th></tr></thead><tbody><tr><td>1.9.5</td><td>22.04 LTS</td><td>3.10.6</td><td>9.5.0</td><td>IDF</td></tr><tr><td>2.4.0</td><td>22.04 LTS</td><td>3.10.6</td><td>9.5.0</td><td>epJSON</td></tr><tr><td>2.5.0</td><td>22.04 LTS</td><td>3.10.6</td><td>23.1.0</td><td>epJSON</td></tr></tbody></table><h2 id="_2-包管理" tabindex="-1">2.包管理 <a class="header-anchor" href="#_2-包管理" aria-label="Permalink to &quot;2.包管理&quot;">​</a></h2><ul><li><p>apt-transport-https 是一个用于在Ubuntu和Debian系统上使用HTTPS协议进行软件包管理的工具。它允许用户通过HTTPS协议从安全的源中下载软件包，以确保软件包的完整性和安全性。</p></li><li><p>Conda 作为软件包管理器，可以帮助您查找和安装软件包。如果您需要一个能够使用不同版本Python的软件包，则无需切换到其他环境管理器，因为conda也是环境管理器。仅需几个命令，您就可以设置一个完全独立的环境来运行不同版本的Python，同时继续在正常环境中运行喜欢的Python版本。</p></li><li><p>pip install -e 是 Python 包管理工具 pip 的一种安装模式，该模式允许我们在开发过程中直接在本地安装目录链接包，以便于在代码修改时能够立即反映到我们所依赖的包中。</p></li></ul><h2 id="_3-conda与pip的区别" tabindex="-1">3.Conda与pip的区别 <a class="header-anchor" href="#_3-conda与pip的区别" aria-label="Permalink to &quot;3.Conda与pip的区别&quot;">​</a></h2><p><strong>背景</strong></p><p>最为 python 的包安装工具，conda 与 pip 经常性的被使用，但却不甚了解两者之间的区别，现总结一下。</p><p><strong>被设计的初衷：</strong></p><p>Pip：专门从 Python Package Index ( 简称 PyPI，也就是 python 相关包的仓库)中下载 Conda：安装和管理 Anaconda repository 的 Anaconda Cloud 包</p><p><strong>最大的不同点：</strong></p><p>Pip 只能安装 python 语言写的包，而 conda 可以安装任何语言写的包</p><p><strong>多 Python 环境管理：</strong></p><p>conda 可以在同一个机器上同时管理多个不能版本的 python ，并且各个版本的 python 互不影响。 pip 没有这样的功能，只能依赖于第三方工具，比如 venv</p><p><strong>包的类型不同：</strong></p><p>Pip 安装的包可以是 wheels or source distributions ，而 conda 安装的包为 二进制格式的</p><p><strong>如何选择和使用</strong></p><p>建议两者混合使用。 因为 conda 的 软件包更多的是偏向于 数据科学、机器学习和人工智能框架等，相比如 PyPI 中软件包的数据量仍然小的很多。</p><p>总结一下：<br><img src="https://ask.qcloudimg.com/http-save/yehe-3680559/7e8799881d34d31f25c96ebaf208ac7a.png" style="zoom:67%;"></p><h2 id="_4-依赖包解释" tabindex="-1">4.依赖包解释 <a class="header-anchor" href="#_4-依赖包解释" aria-label="Permalink to &quot;4.依赖包解释&quot;">​</a></h2><ul><li>wxWidgets是一个程序员的开发工具包，这个工具包用来开发用于桌面或者移动设备的图形界面应用程序。或者说它提供了一个框架，它作了很多底层的管家婆似的工作以便给应用程序提供一些默认的行为。wxWidgets库给程序员提供了大量的类以及类的方法，以供其使用和定制。一个典型图形界面应用程序所作的事情包括：显示一个包含各种标准控件的窗口，也可能需要在窗口中绘制某种特别的图形或者图像，并且还要响应来自鼠标，键盘以及其它输入设备的输入。很可能这个应用程序还要和其它的进程通信，甚至还要驱动别的应用程序，换句话说，wxWidgets可以让程序员编写一个拥有所有通用特性的时髦应用程序的工作变的相对容易。</li></ul><h2 id="_8-教程" tabindex="-1">8.教程 <a class="header-anchor" href="#_8-教程" aria-label="Permalink to &quot;8.教程&quot;">​</a></h2><ul><li><p><a href="https://zhuanlan.zhihu.com/p/651148141" target="_blank" rel="noreferrer">最详细的ubuntu 安装 docker教程</a></p></li><li><p><a href="https://blog.csdn.net/qq_42411805/article/details/124506368#:~:text=Ubuntu%E5%BF%AB%E9%80%9F%E5%AE%89%E8%A3%85Docker%E5%8F%8A%E7%AE%A1%E7%90%86%E7%95%8C%E9%9D%A2portainer%201%201%20%E5%BC%80%E5%A7%8B%E5%AE%89%E8%A3%85%202%202%20%E9%AA%8C%E8%AF%81docker,3%203%20%E6%9B%B4%E6%8D%A2%E9%98%BF%E9%87%8C%E6%BA%90%204%204%20docker%20UI%E7%AE%A1%E7%90%86%E7%95%8C%E9%9D%A2" target="_blank" rel="noreferrer">Ubuntu快速安装Docker及管理界面portainer</a></p></li><li><p><a href="https://digitalixy.com/linux/503438.html" target="_blank" rel="noreferrer">如何在 Ubuntu 20.04 中安装 Portainer Docker Manager</a></p></li><li><p><a href="https://zhuanlan.zhihu.com/p/338424040" target="_blank" rel="noreferrer">Python虚拟环境Virtualenv详解</a></p></li><li><p><a href="https://geek-docs.com/python/python-ask-answer/274_python_what_is_the_use_case_for_pip_install_e.html" target="_blank" rel="noreferrer">Python pip install -e的用途何在 ——（教程较多）</a></p></li></ul>',22)),r(d),r(h)])}const B=u(P,[["render",f]]);export{S as __pageData,B as default};
