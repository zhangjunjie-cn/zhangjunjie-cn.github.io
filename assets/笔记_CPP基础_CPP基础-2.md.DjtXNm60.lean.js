import{_ as C}from"./chunks/ArticleMetadata.Dat26yyY.js";import{_ as F,U as h,y as o,A as d,L as i,W as n,ae as k,b as a,E as l,D as B,G as c}from"./chunks/framework.CncsO2go.js";import"./chunks/theme.pqFGKIL6.js";const q=JSON.parse('{"title":"C++语言基础-2","description":"","frontmatter":{"createtime":"2024/1/25","title":"C++语言基础-2","outline":[2,3],"isTop":true,"categories":["笔记"],"tags":["C++"]},"headers":[],"relativePath":"笔记/CPP基础/CPP基础-2.md","filePath":"笔记/CPP基础/CPP基础-2.md","lastUpdated":1731934995000}'),E={name:"笔记/CPP基础/CPP基础-2.md"};function u(t,s,m,b,_,f){const g=C,A=h("ClientOnly"),p=h("font"),y=h("NolebaseGitContributors"),D=h("NolebaseGitChangelog");return d(),o("div",null,[s[7]||(s[7]=i("h1",{id:"c-语言基础-2",tabindex:"-1"},[a("C++语言基础-2 "),i("a",{class:"header-anchor",href:"#c-语言基础-2","aria-label":'Permalink to "C++语言基础-2"'},"​")],-1)),n(A,null,{default:l(()=>{var e,r;return[(((e=t.$frontmatter)==null?void 0:e.aside)??!0)&&(((r=t.$frontmatter)==null?void 0:r.showArticleMetadata)??!0)?(d(),B(g,{key:0,article:t.$frontmatter},null,8,["article"])):c("",!0)]}),_:1}),s[8]||(s[8]=k("",13)),i("ol",null,[s[2]||(s[2]=i("li",null,[i("p",null,[i("strong",null,"首先从作用域考虑"),a("：C++里作用域可分为6种：全局，局部，类，语句，命名空间和文件作用域。 全局变量：全局作用域，可以通过extern作用于其他非定义的源文件。 静态全局变量 ：全局作用域+文件作用域，所以无法在其他文件中使用。 局部变量：局部作用域，比如函数的参数，函数内的局部变量等等。 静态局部变量 ：局部作用域，只被初始化一次，直到程序结束。")])],-1)),s[3]||(s[3]=i("li",null,[i("p",null,[i("strong",null,"从所在空间考虑"),a("：除了局部变量在栈上外，其他都在静态存储区。因为静态变量都在静态存储区，所以下次调用函数的时候还是能取到原来的值。")])],-1)),i("li",null,[n(p,{color:"#FF0000"},{default:l(()=>s[0]||(s[0]=[a("生命周期：")])),_:1}),s[1]||(s[1]=a(" 局部变量在栈上，出了作用域就回收内存；而全局变量、静态全局变量、静态局部变量都在静态存储区，直到程序结束才会回收内存。"))]),s[4]||(s[4]=i("li",null,[i("p",null,[i("strong",null,"使用场景"),a("：从它们各自特点就可以看出各自的应用场景，不再赘述。")])],-1))]),s[9]||(s[9]=k("",12)),n(p,{color:"#FF0000"},{default:l(()=>s[5]||(s[5]=[a("先看到实现代码：")])),_:1}),s[10]||(s[10]=k("",44)),n(p,{color:"#FF0000"},{default:l(()=>s[6]||(s[6]=[a("代码示例")])),_:1}),s[11]||(s[11]=k("",6)),n(y),n(D)])}const P=F(E,[["render",u]]);export{q as __pageData,P as default};
