import{_ as l,m as t,f as p,h as r,V as u,k as d,y as a,u as s,B as c}from"./chunks/framework.QwH3YlDt.js";const _=JSON.parse('{"title":"安装Openstudio","description":"","frontmatter":{"createtime":"2024/1/25","title":"安装Openstudio","outline":[2,3],"isTop":true,"categories":["笔记"],"tags":["EnergyPlus"]},"headers":[],"relativePath":"笔记/EnergyPlus/安装EnergyPlus环境.md","filePath":"笔记/EnergyPlus/安装EnergyPlus环境.md","lastUpdated":1731934995000}'),g={name:"笔记/EnergyPlus/安装EnergyPlus环境.md"};function b(k,e,m,x,h,v){const n=t("VPNolebaseInlineLinkPreview"),o=t("NolebaseGitContributors"),i=t("NolebaseGitChangelog");return p(),r("div",null,[e[2]||(e[2]=u('<h2 id="_1-安装openstudio" tabindex="-1">1.安装Openstudio <a class="header-anchor" href="#_1-安装openstudio" aria-label="Permalink to &quot;1.安装Openstudio&quot;">​</a></h2><p>安装 <code>OpenStudioApplication-1.7.0+b070178884-Ubuntu22.04</code>，会报缺少依赖</p><blockquote><p>dpkg: 依赖关系问题使得 openstudioapplication-1.7.0 的配置工作不能继续： openstudioapplication-1.7.0 依赖于 libwxgtk3.0-0v5 (&gt;= 3.0.0) | libwxgtk3.0-0 (&gt;= 3.0.0) | libwxgtk3.0-gtk3-0v5 (&gt;= 3.0.0)；然而： 未安装软件包 libwxgtk3.0-0v5。 未安装软件包 libwxgtk3.0-0。 未安装软件包 libwxgtk3.0-gtk3-0v5。 openstudioapplication-1.7.0 依赖于 libxcb-cursor0；然而： 未安装软件包 libxcb-cursor0。</p></blockquote><p><strong>Ubuntu20.04中安装wxWidgets库</strong></p><p>在ubuntu中通过apt 直接安装wxWidgets 开发套件：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sudo apt install libwxgtk3.0-gtk3-dev</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>随后通过wx-config对源文件进行编译：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>g++ wxDemo.cpp -o wxDemo `wx-config --cxxflags --libs`</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div>',8)),d("p",null,[e[1]||(e[1]=a("参考：")),s(n,{href:"https://packages.ubuntu.com/focal/libwxgtk3.0-gtk3-dev",target:"_blank",rel:"noreferrer"},{default:c(()=>e[0]||(e[0]=[a("https://packages.ubuntu.com/focal/libwxgtk3.0-gtk3-dev")])),_:1})]),s(o),s(i)])}const f=l(g,[["render",b]]);export{_ as __pageData,f as default};
