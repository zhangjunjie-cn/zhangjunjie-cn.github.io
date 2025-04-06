import{_ as F}from"./chunks/ArticleGPT.Bb1dTucW.js";import{_ as m}from"./chunks/ArticleMetadata.rz1F50Zp.js";import{_ as B,P as a,z as b,A as e,B as o,G as i,ap as p,O as d,b as h,Q as l,S as C,aG as f}from"./chunks/framework.DfjUQpHG.js";import"./chunks/index.Deh-lfQt.js";import"./chunks/theme.BQCNzKTx.js";import"./chunks/dayjs.min.pkIaC9gv.js";const $=JSON.parse('{"title":"防火墙路由之防火墙策略（三）","description":"","frontmatter":{"date":"2025/03/26 22:31","isTop":false,"title":"防火墙路由之防火墙策略（三）","author":"张俊杰","articleGPT":"这是一篇关于","categories":["博客"],"tags":["防火墙路由"]},"headers":[],"relativePath":"categories/annals/2025/03/26/防火墙路由之防火墙策略（三）.md","filePath":"categories/annals/2025/03/26/防火墙路由之防火墙策略（三）.md","lastUpdated":1743046853000}'),y={name:"categories/annals/2025/03/26/防火墙路由之防火墙策略（三）.md"};function q(t,s,D,_,v,N){const k=m,c=a("ClientOnly"),g=F,A=a("Mermaid"),u=a("NolebaseGitContributors"),E=a("NolebaseGitChangelog");return e(),b("div",null,[s[1]||(s[1]=o("h1",{id:"防火墙路由之防火墙策略-三",tabindex:"-1"},[h("防火墙路由之防火墙策略（三） "),o("a",{class:"header-anchor",href:"#防火墙路由之防火墙策略-三","aria-label":'Permalink to "防火墙路由之防火墙策略（三）"'},"​")],-1)),i(c,null,{default:l(()=>{var n,r;return[(((n=t.$frontmatter)==null?void 0:n.aside)??!0)&&(((r=t.$frontmatter)==null?void 0:r.showArticleMetadata)??!0)?(e(),d(k,{key:0,article:t.$frontmatter},null,8,["article"])):C("",!0)]}),_:1}),i(g),s[2]||(s[2]=p(`<figure><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/20250326233236901.png" alt="静态路由" tabindex="0"><figcaption>静态路由</figcaption></figure><p>静态路由是最原始的，如果你用策略路由的话，会覆盖他的优先级。然后，静态路由的配置，一般只需要一个同外网的出口就行了。策略路由，也可以叫做自定义静态路由，他的优先级可以比静态路由还高，一般用于网络出口，选择哪一个WAN的出口方向，但是要注意的是，防火墙策略的优先级很高，他是作用于局域网内不同LAN之间和NAT的，所以他可以配置一个PORT有不同的出口方向，并且可以均衡的分布流量，但是，如何你配置了一条策略路由，他的出口流向就被锁定了，就会只允许这一个出口的方向。比如，我的办公网在防火墙策略里面配置了多个互通网段，比如访问监控段，WIFI段，考勤段等等，但如果你配置了一条策略路由出口WAN，那么办公网的防火墙策略就会失效，只会允许让他出口指定的WAN，所以，办公网的策略路由出口WAN可以不用配置，0.0.0.0/0 [10/0] via 222.178.157.65, port2, [1/0] [10/0] via 183.230.155.1, port1, [2/0]，静态路由就已经配置了公网出口，不用专门配置一条通WAN的策略路由，也可以访问外网。</p><figure><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/20250326233616707.png" alt="策略路由" tabindex="0"><figcaption>策略路由</figcaption></figure><figure><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/20250326233827501.png" alt="防火墙策略" tabindex="0"><figcaption>防火墙策略</figcaption></figure><h3 id="📝-我的网络配置踩坑笔记-当策略路由-杀死-了内网访问" tabindex="-1"><strong>📝 我的网络配置踩坑笔记：当策略路由&quot;杀死&quot;了内网访问</strong> <a class="header-anchor" href="#📝-我的网络配置踩坑笔记-当策略路由-杀死-了内网访问" aria-label="Permalink to &quot;**📝 我的网络配置踩坑笔记：当策略路由&quot;杀死&quot;了内网访问**&quot;">​</a></h3><h4 id="🚦-故事背景" tabindex="-1"><strong>🚦 故事背景</strong> <a class="header-anchor" href="#🚦-故事背景" aria-label="Permalink to &quot;**🚦 故事背景**&quot;">​</a></h4><p>最近在公司防火墙上做了以下配置：</p><ol><li><strong>防火墙策略</strong>：允许办公网（<code>办公网1</code>）与监控段/WiFi段/考勤段互通</li><li><strong>静态路由</strong>：配置了双WAN出口（电信<code>port2</code>主用，移动<code>port1</code>备用）</li><li><strong>策略路由</strong>：想让办公网所有外网流量走电信WAN，于是加了这条：<div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes one-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#F69D50;">edit</span><span style="--shiki-light:#986801;--shiki-dark:#6CB6FF;"> 11</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#6CB6FF;">    set</span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;"> input-device</span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;"> &quot;办公网1&quot;</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#6CB6FF;">    set</span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;"> srcaddr</span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;"> &quot;all&quot;</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#6CB6FF;">    set</span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;"> dstaddr</span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;"> &quot;all&quot;</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#768390;--shiki-dark-font-style:inherit;">           # 全流量匹配</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#6CB6FF;">    set</span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;"> output-device</span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;"> &quot;port2&quot;</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#768390;--shiki-dark-font-style:inherit;">   # 强制走电信</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li></ol><h4 id="💥-问题现象" tabindex="-1"><strong>💥 问题现象</strong> <a class="header-anchor" href="#💥-问题现象" aria-label="Permalink to &quot;**💥 问题现象**&quot;">​</a></h4><p>配置完成后：</p><ul><li>办公网访问外网正常（走电信）</li><li><strong>但办公网突然无法访问监控摄像头！</strong><br> （明明防火墙策略<code>edit 21</code>允许办公网→监控段）</li></ul><h4 id="🔍-排查过程" tabindex="-1">🔍 <strong>排查过程</strong> <a class="header-anchor" href="#🔍-排查过程" aria-label="Permalink to &quot;🔍 **排查过程**&quot;">​</a></h4><ol><li>检查防火墙策略 → 规则存在且命中计数增加</li><li>执行流量跟踪：<div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes one-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#F69D50;">diagnose</span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;"> debug</span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;"> flow</span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;"> trace</span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;"> start</span><span style="--shiki-light:#986801;--shiki-dark:#6CB6FF;"> 100</span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;"> filter</span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;"> saddr</span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;"> 办公网IP</span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;"> daddr</span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;"> 监控段IP</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><strong>发现真相</strong>： <ul><li>流量匹配了策略路由的<code>dstaddr all</code></li><li>被强制推向<code>port2</code>（电信WAN）</li><li>监控段无法通过WAN口回程 → 通信中断</li></ul></li></ol><h3 id="🔧-策略路由冲突的mermaid流程图" tabindex="-1"><strong>🔧 策略路由冲突的Mermaid流程图</strong> <a class="header-anchor" href="#🔧-策略路由冲突的mermaid流程图" aria-label="Permalink to &quot;**🔧 策略路由冲突的Mermaid流程图**&quot;">​</a></h3>`,14)),(e(),d(f,null,{default:l(()=>[i(A,{id:"mermaid-103",class:"mermaid",graph:"graph%20TD%0A%20%20%20%20A%5B%E5%8A%9E%E5%85%AC%E7%BD%91PC%5D%20--%3E%7C%E8%AE%BF%E9%97%AE%E7%9B%91%E6%8E%A7%E6%91%84%E5%83%8F%E5%A4%B4%7C%20B%7B%E9%98%B2%E7%81%AB%E5%A2%99%E7%AD%96%E7%95%A5%7D%0A%20%20%20%20B%20--%3E%7C%E8%A7%84%E5%88%9921%3A%20%E5%85%81%E8%AE%B8%E8%AE%BF%E9%97%AE%7C%20C%7B%E7%AD%96%E7%95%A5%E8%B7%AF%E7%94%B1%7D%0A%20%20%20%20C%20--%3E%7C%E8%A7%84%E5%88%9911%3A%20dstaddr%3Dall%20%E5%BC%BA%E5%88%B6%E8%B5%B0port2%7C%20D%5B%E6%B5%81%E9%87%8F%E8%A2%AB%E9%94%99%E8%AF%AF%E5%AF%BC%E5%90%91%E7%94%B5%E4%BF%A1WAN%5D%0A%20%20%20%20D%20--%3E%20E%5B%E7%9B%91%E6%8E%A7%E6%AE%B5%E6%97%A0%E6%B3%95%E5%93%8D%E5%BA%94%5D%20--%3E%20F%5B%E9%80%9A%E4%BF%A1%E5%A4%B1%E8%B4%A5%5D%0A%20%20%20%20%0A%20%20%20%20C%20--%3E%7C%E6%9C%AA%E5%8C%B9%E9%85%8D%E7%AD%96%E7%95%A5%E8%B7%AF%E7%94%B1%7C%20G%5B%E9%9D%99%E6%80%81%E8%B7%AF%E7%94%B1%5D%0A%20%20%20%20G%20--%3E%7C%E9%BB%98%E8%AE%A4%E8%B7%AF%E7%94%B10.0.0.0%2F0%7C%20H%5B%E6%AD%A3%E5%B8%B8%E8%B5%B0port2%E4%B8%BB%E7%94%A8%5D%0A%20%20%20%20G%20--%3E%7C%E7%9B%91%E6%8E%A7%E6%AE%B5%E8%B7%AF%E7%94%B110.253.132.0%2F23%7C%20I%5B%E8%B5%B0VPN%E9%9A%A7%E9%81%93%5D%0A%20%20%20%20%0A%20%20%20%20style%20A%20fill%3A%23cff%2Cstroke%3A%23333%0A%20%20%20%20style%20B%20fill%3A%23f9f%2Cstroke%3A%23333%0A%20%20%20%20style%20C%20fill%3A%23f96%2Cstroke%3A%23333%0A%20%20%20%20style%20D%20color%3Ared%2Cstroke%3A%23f00%0A%20%20%20%20style%20F%20color%3Ared%0A%20%20%20%20style%20G%20fill%3A%239f9%2Cstroke%3A%23090%0A%20%20%20%20style%20H%2CI%20fill%3A%23cfc%2Cstroke%3A%23090%0A%20%20%20%20%0A%20%20%20%20linkStyle%202%2C3%20stroke%3A%23090%2Cstroke-width%3A2px%0A%20%20%20%20linkStyle%204%20stroke%3A%23f00%2Cstroke-width%3A2px%0A"})]),fallback:l(()=>s[0]||(s[0]=[h(" Loading... ")])),_:1})),s[3]||(s[3]=p(`<hr><h4 id="🎨-图表说明" tabindex="-1"><strong>🎨 图表说明</strong> <a class="header-anchor" href="#🎨-图表说明" aria-label="Permalink to &quot;**🎨 图表说明**&quot;">​</a></h4><ol><li><strong>红色故障流</strong>：展示因<code>dstaddr=all</code>导致的内网访问中断</li><li><strong>绿色正确流</strong>：对比修正后的理想状态</li><li><strong>关键节点标注</strong>： <ul><li>防火墙策略（紫色）：权限检查点</li><li>策略路由（橙色）：路径强制点</li><li>冲突点（红色边框）：错误配置位置</li></ul></li></ol><hr><h4 id="🧠-问题本质" tabindex="-1">🧠 <strong>问题本质</strong> <a class="header-anchor" href="#🧠-问题本质" aria-label="Permalink to &quot;🧠 **问题本质**&quot;">​</a></h4><p>策略路由像&quot;霸道总裁&quot;，<strong>只要匹配就强制执行</strong>，完全不管：</p><ul><li>防火墙是否已放行</li><li>目标地址是否是内网</li><li>是否会影响其他业务</li></ul><h4 id="✅-解决方案" tabindex="-1">✅ <strong>解决方案</strong> <a class="header-anchor" href="#✅-解决方案" aria-label="Permalink to &quot;✅ **解决方案**&quot;">​</a></h4><p>给策略路由加上&quot;排除条款&quot;：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes one-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#F69D50;">edit</span><span style="--shiki-light:#986801;--shiki-dark:#6CB6FF;"> 11</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#6CB6FF;">    set</span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;"> dstaddr</span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;"> &quot;!10.253.132.0/23 !172.18.20.0/23 !192.168.0.0/16&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>（所有内网段前加<code>!</code>表示排除）</p><h4 id="💡-经验总结" tabindex="-1">💡 <strong>经验总结</strong> <a class="header-anchor" href="#💡-经验总结" aria-label="Permalink to &quot;💡 **经验总结**&quot;">​</a></h4><ol><li><p><strong>策略路由是&quot;外科手术刀&quot;</strong>：</p><ul><li>精准控制特定流量（如：仅外网走电信）</li><li>绝不滥用<code>dstaddr all</code>这种&quot;核武器&quot;</li></ul></li><li><p><strong>防火墙策略才是&quot;大管家&quot;</strong>：</p><ul><li>内网互访规则应该交给防火墙策略管理</li><li>策略路由只辅助做路径优化</li></ul></li><li><p><strong>配置口诀</strong>：</p><blockquote><p>&quot;防火策略开权限，策略路由调路线<br> 内网地址要排除，全量匹配最危险&quot;</p></blockquote></li></ol><p>（附当时的问题截图和解决后的流量跟踪对比图）</p><hr><p>这样改写是否更符合您博客笔记的风格？如需调整细节可随时告诉我~</p>`,16)),i(u),i(E)])}const j=B(y,[["render",q]]);export{$ as __pageData,j as default};
