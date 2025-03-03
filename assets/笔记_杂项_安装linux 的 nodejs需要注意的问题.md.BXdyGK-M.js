import{_ as m}from"./chunks/ArticleMetadata.CtBSOJVh.js";import{a2 as u,a as c,u as e,B as _,e as s,x as b,ap as h,m as o,o as r,p as j,q as f}from"./chunks/framework.DM74m2GY.js";import"./chunks/theme.DeB3itL1.js";const O=JSON.parse('{"title":"Ubuntu 下 更新默认 nodejs/npm 版本至最新版本","description":"","frontmatter":{"createtime":"2024/2/22","title":"Ubuntu 下 更新默认 nodejs/npm 版本至最新版本","outline":[2,3],"isTop":true,"categories":["笔记"],"tags":["Linux"]},"headers":[],"relativePath":"笔记/杂项/安装linux 的 nodejs需要注意的问题.md","filePath":"笔记/杂项/安装linux 的 nodejs需要注意的问题.md","lastUpdated":1731934995000}'),g={name:"笔记/杂项/安装linux 的 nodejs需要注意的问题.md"},x=s("h1",{id:"ubuntu-下-更新默认-nodejs-npm-版本至最新版本",tabindex:"-1"},[b("Ubuntu 下 更新默认 nodejs/npm 版本至最新版本 "),s("a",{class:"header-anchor",href:"#ubuntu-下-更新默认-nodejs-npm-版本至最新版本","aria-label":'Permalink to "Ubuntu 下 更新默认 nodejs/npm 版本至最新版本"'},"​")],-1),q=h('<p>Ubuntu 下 更新默认 nodejs/npm 版本至最新版本 步骤一：更新 nodejs 源为淘宝源：</p><h2 id="_1-通过下面配置-可以不使用-cnpm-而直接在-npm-情况下使用新的-nodejs-源" tabindex="-1">1.通过下面配置，可以不使用 cnpm 而直接在 npm 情况下使用新的 nodejs 源 <a class="header-anchor" href="#_1-通过下面配置-可以不使用-cnpm-而直接在-npm-情况下使用新的-nodejs-源" aria-label="Permalink to &quot;1.通过下面配置，可以不使用 cnpm 而直接在 npm 情况下使用新的 nodejs 源&quot;">​</a></h2><p>npm config set registry <a href="https://registry.npm.taobao.org" target="_blank" rel="noreferrer">https://registry.npm.taobao.org</a></p><h2 id="_2-获取刚刚设置配置是否如我们所愿" tabindex="-1">2.获取刚刚设置配置是否如我们所愿 <a class="header-anchor" href="#_2-获取刚刚设置配置是否如我们所愿" aria-label="Permalink to &quot;2.获取刚刚设置配置是否如我们所愿&quot;">​</a></h2><p>npm config get registry<br></p><p>步骤二：更新 npm<br> sudo npm install -g n<br></p><p>步骤三：更新 nodejs n stable</p><h2 id="_3-确认-nodejs-版本" tabindex="-1">3.确认 nodejs 版本 <a class="header-anchor" href="#_3-确认-nodejs-版本" aria-label="Permalink to &quot;3.确认 nodejs 版本&quot;">​</a></h2><p>nodejs -v 可能出现更新后， nodejs -v 还是老版本的问题 原因：</p><p>nodejs 有一个全局安装目录和更新安装目录之分：</p><p>查看 npm 更新安装路径：npm root -g 查看 npm 全局安装路径：npm config get prefix</p><p>默认看到的是 npm 全局安装路径，sudo npm install -g n 和 n stable 都会安装到 更新目录 下，故而如果安装程序调整没有到位时，就可能出现问题。</p><p>不建议通过修改 nodejs 安装目录的方式来切换版本。</p><p>方案： 替换默认的可执行文件名，进行版本切换（建议）</p><h2 id="_4-nodejs-全局安装-node-在-bin-node-目录下" tabindex="-1">4.nodejs 全局安装 node 在 /bin/node 目录下 <a class="header-anchor" href="#_4-nodejs-全局安装-node-在-bin-node-目录下" aria-label="Permalink to &quot;4.nodejs 全局安装 node 在 /bin/node 目录下&quot;">​</a></h2><h2 id="_5-nodejs-更新目录在-usr-local-bin-node-下" tabindex="-1">5.nodejs 更新目录在 /usr/local/bin/node 下 <a class="header-anchor" href="#_5-nodejs-更新目录在-usr-local-bin-node-下" aria-label="Permalink to &quot;5.nodejs 更新目录在 /usr/local/bin/node 下&quot;">​</a></h2><p>sudo mv /bin/node /bin/nodeOld<br> sudo mv /bin/npm /bin/npmOld<br> sudo mv /bin/npx /bin/npxOld</p><p>sudo ln -s /usr/local/bin/node /bin/node<br> sudo ln -s /usr/local/bin/npm /bin/npm<br> sudo ln -s /usr/local/bin/npx /bin/npx</p><ul><li><a href="https://blog.csdn.net/qq_48455576/article/details/120468488" target="_blank" rel="noreferrer">npm显示升级到最新版本仍然显示npm为原版本的问题解决</a></li></ul>',19);function k(n,C,N,P,v,T){const d=m,l=o("ClientOnly"),i=o("NolebaseGitContributors"),p=o("NolebaseGitChangelog");return r(),c("div",null,[x,e(l,null,{default:_(()=>{var a,t;return[(((a=n.$frontmatter)==null?void 0:a.aside)??!0)&&(((t=n.$frontmatter)==null?void 0:t.showArticleMetadata)??!0)?(r(),j(d,{key:0,article:n.$frontmatter},null,8,["article"])):f("",!0)]}),_:1}),q,e(i),e(p)])}const U=u(g,[["render",k]]);export{O as __pageData,U as default};
