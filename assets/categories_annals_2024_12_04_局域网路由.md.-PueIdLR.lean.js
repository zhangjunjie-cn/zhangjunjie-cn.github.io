import{_ as u}from"./chunks/ArticleMetadata.rz1F50Zp.js";import{_ as h,P as o,z as g,A as i,B as n,G as l,ap as _,b as m,Q as b,O as P,S as N}from"./chunks/framework.DfjUQpHG.js";import"./chunks/index.Deh-lfQt.js";import"./chunks/theme.BQCNzKTx.js";import"./chunks/dayjs.min.pkIaC9gv.js";const v=JSON.parse('{"title":"04局域网路由","description":"","frontmatter":{"date":"2024/11/29 21:00","title":"04局域网路由","author":"张俊杰","categories":["博客"],"tags":["日记"]},"headers":[],"relativePath":"categories/annals/2024/12/04/局域网路由.md","filePath":"categories/annals/2024/12/04/局域网路由.md","lastUpdated":1741619773000}'),f={name:"categories/annals/2024/12/04/局域网路由.md"};function C(e,t,A,k,q,x){const d=u,s=o("ClientOnly"),c=o("NolebaseGitContributors"),p=o("NolebaseGitChangelog");return i(),g("div",null,[t[0]||(t[0]=n("h1",{id:"_04局域网路由",tabindex:"-1"},[m("04局域网路由 "),n("a",{class:"header-anchor",href:"#_04局域网路由","aria-label":'Permalink to "04局域网路由"'},"​")],-1)),l(s,null,{default:b(()=>{var a,r;return[(((a=e.$frontmatter)==null?void 0:a.aside)??!0)&&(((r=e.$frontmatter)==null?void 0:r.showArticleMetadata)??!0)?(i(),P(d,{key:0,article:e.$frontmatter},null,8,["article"])):N("",!0)]}),_:1}),t[1]||(t[1]=_('<div class="tip custom-block"><p class="custom-block-title">TIP</p><p>今天来讨论分析一下，关于局域网路由和路由器的影响</p></div><p>:::into 在办公网络段172.20.80.0/22 里面配置一个路由器，路由器的LAN口的地址因该如何配置？</p><p>首先，需要确保该地址属于办公网的地址范围，并避免与其他设备（如网关、防火墙、DHCP 服务器等）的 IP 地址冲突。</p><hr><h3 id="_1-网络规划" tabindex="-1"><strong>1. 网络规划</strong> <a class="header-anchor" href="#_1-网络规划" aria-label="Permalink to &quot;**1. 网络规划**&quot;">​</a></h3><ul><li><p><strong>办公网段</strong>：</p><ul><li>地址范围：<code>172.20.80.0 - 172.20.83.255</code></li><li>子网掩码：<code>255.255.252.0</code></li><li>网关：通常由防火墙或主路由设备提供，假设为 <code>172.20.83.254</code>。</li></ul></li><li><p><strong>路由器 LAN 口的作用</strong>：</p><ul><li>提供办公网内的子网或连接内部设备。</li><li>必须设置为办公网段内的一个唯一地址，且不能和其他设备冲突。</li></ul></li></ul><hr><h3 id="_2-配置路由器-lan-口" tabindex="-1"><strong>2. 配置路由器 LAN 口</strong> <a class="header-anchor" href="#_2-配置路由器-lan-口" aria-label="Permalink to &quot;**2. 配置路由器 LAN 口**&quot;">​</a></h3><ul><li><p><strong>地址设置</strong>：</p><ul><li>LAN 口 IP 地址应在 <code>172.20.80.0/22</code> 范围内。</li><li>避免使用网段内的网关地址（如 <code>172.20.83.254</code>）或 DHCP 动态分配范围内的地址。</li><li>建议使用网段内未使用的静态地址，如：<code>172.20.83.1</code> 或 <code>172.20.82.1</code>。</li></ul></li><li><p><strong>子网掩码</strong>：</p><ul><li>设置为 <code>255.255.252.0</code>，与办公网一致。</li></ul></li><li><p><strong>默认网关</strong>：</p><ul><li>通常设置为办公网的主网关（如防火墙的 <code>172.20.83.254</code>），以确保该路由器能够访问外网或其他网段。</li></ul></li><li><p><strong>DHCP 配置（可选）</strong>：</p><ul><li>如果路由器需要为下游设备提供 IP 地址： <ul><li>启用 DHCP 服务。</li><li>配置分配范围，例如：<code>172.20.83.50 - 172.20.83.100</code>。</li><li>确保不与其他 DHCP 服务器冲突。</li></ul></li></ul></li></ul><hr><h3 id="_3-示例配置" tabindex="-1"><strong>3. 示例配置</strong> <a class="header-anchor" href="#_3-示例配置" aria-label="Permalink to &quot;**3. 示例配置**&quot;">​</a></h3><p>假设办公网网关为 <code>172.20.83.254</code>，静态 IP 地址规划如下：</p><table tabindex="0"><thead><tr><th><strong>设备</strong></th><th><strong>IP 地址</strong></th><th><strong>备注</strong></th></tr></thead><tbody><tr><td>防火墙/网关</td><td><code>172.20.83.254</code></td><td>办公网默认网关</td></tr><tr><td>路由器 LAN</td><td><code>172.20.83.1</code></td><td>静态配置</td></tr><tr><td>路由器 DHCP</td><td><code>172.20.83.50-100</code></td><td>可选，避免冲突</td></tr></tbody></table><hr><h3 id="_4-路由器的配置步骤" tabindex="-1"><strong>4. 路由器的配置步骤</strong> <a class="header-anchor" href="#_4-路由器的配置步骤" aria-label="Permalink to &quot;**4. 路由器的配置步骤**&quot;">​</a></h3><ol><li>登录路由器的管理界面。</li><li>进入 LAN 口设置： <ul><li>设置 IP 地址为：<code>172.20.83.1</code></li><li>子网掩码为：<code>255.255.252.0</code></li><li>默认网关为：<code>172.20.83.254</code></li></ul></li><li>如果需要，启用 DHCP 服务，分配地址范围如 <code>172.20.83.50 - 172.20.83.100</code>。</li><li>保存配置并重启路由器。</li></ol><hr><h3 id="_5-路由器的用途" tabindex="-1"><strong>5. 路由器的用途</strong> <a class="header-anchor" href="#_5-路由器的用途" aria-label="Permalink to &quot;**5. 路由器的用途**&quot;">​</a></h3><ul><li><strong>连接办公网的其他设备</strong>：路由器可以为特定设备提供隔离或不同的管理。</li><li><strong>提供子网划分</strong>：如果需要子网，可以为 LAN 和 WAN 口配置不同的网段，并启用静态路由或 NAT 转发。</li></ul><p>完成配置后，路由器的 LAN 口将能够与办公网正常通信，且不会影响现有的办公网络架构。</p><p>:::</p>',21)),l(c),l(p)])}const y=h(f,[["render",C]]);export{v as __pageData,y as default};
