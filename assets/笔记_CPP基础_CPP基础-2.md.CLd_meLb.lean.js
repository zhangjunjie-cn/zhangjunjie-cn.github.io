import{_ as D}from"./chunks/ArticleMetadata.CtBSOJVh.js";import{a2 as C,a as F,u as a,B as n,e as s,x as i,ap as k,m as h,o as r,p as o,q as c}from"./chunks/framework.DM74m2GY.js";import"./chunks/theme.DeB3itL1.js";const V=JSON.parse('{"title":"C++语言基础-2","description":"","frontmatter":{"createtime":"2024/1/25","title":"C++语言基础-2","outline":[2,3],"isTop":true,"categories":["笔记"],"tags":["C++"]},"headers":[],"relativePath":"笔记/CPP基础/CPP基础-2.md","filePath":"笔记/CPP基础/CPP基础-2.md","lastUpdated":1731934995000}'),B={name:"笔记/CPP基础/CPP基础-2.md"},E=s("h1",{id:"c-语言基础-2",tabindex:"-1"},[i("C++语言基础-2 "),s("a",{class:"header-anchor",href:"#c-语言基础-2","aria-label":'Permalink to "C++语言基础-2"'},"​")],-1),u=k("",13),_=s("li",null,[s("p",null,[s("strong",null,"首先从作用域考虑"),i("：C++里作用域可分为6种：全局，局部，类，语句，命名空间和文件作用域。 全局变量：全局作用域，可以通过extern作用于其他非定义的源文件。 静态全局变量 ：全局作用域+文件作用域，所以无法在其他文件中使用。 局部变量：局部作用域，比如函数的参数，函数内的局部变量等等。 静态局部变量 ：局部作用域，只被初始化一次，直到程序结束。")])],-1),m=s("li",null,[s("p",null,[s("strong",null,"从所在空间考虑"),i("：除了局部变量在栈上外，其他都在静态存储区。因为静态变量都在静态存储区，所以下次调用函数的时候还是能取到原来的值。")])],-1),b=s("li",null,[s("p",null,[s("strong",null,"使用场景"),i("：从它们各自特点就可以看出各自的应用场景，不再赘述。")])],-1),f=k("",12),L=k("",44),v=k("",6);function N(l,q,P,U,T,x){const d=D,g=h("ClientOnly"),t=h("font"),A=h("NolebaseGitContributors"),y=h("NolebaseGitChangelog");return r(),F("div",null,[E,a(g,null,{default:n(()=>{var p,e;return[(((p=l.$frontmatter)==null?void 0:p.aside)??!0)&&(((e=l.$frontmatter)==null?void 0:e.showArticleMetadata)??!0)?(r(),o(d,{key:0,article:l.$frontmatter},null,8,["article"])):c("",!0)]}),_:1}),u,s("ol",null,[_,m,s("li",null,[a(t,{color:"#FF0000"},{default:n(()=>[i("生命周期：")]),_:1}),i(" 局部变量在栈上，出了作用域就回收内存；而全局变量、静态全局变量、静态局部变量都在静态存储区，直到程序结束才会回收内存。")]),b]),f,a(t,{color:"#FF0000"},{default:n(()=>[i("先看到实现代码：")]),_:1}),L,a(t,{color:"#FF0000"},{default:n(()=>[i("代码示例")]),_:1}),v,a(A),a(y)])}const I=C(B,[["render",N]]);export{V as __pageData,I as default};
