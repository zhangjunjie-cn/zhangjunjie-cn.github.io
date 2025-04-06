import{_ as p}from"./chunks/ArticleMetadata.rz1F50Zp.js";import{_ as b,P as o,z as _,A as l,B as t,G as a,ap as P,b as i,Q as n,O as f,S as q}from"./chunks/framework.DfjUQpHG.js";import"./chunks/index.Deh-lfQt.js";import"./chunks/theme.BQCNzKTx.js";import"./chunks/dayjs.min.pkIaC9gv.js";const V=JSON.parse('{"title":"01默认路由","description":"","frontmatter":{"date":"2024/11/29 21:00","title":"01默认路由","author":"张俊杰","categories":["博客"],"tags":["静态路由"]},"headers":[],"relativePath":"categories/annals/2024/12/01/默认路由.md","filePath":"categories/annals/2024/12/01/默认路由.md","lastUpdated":1741619773000}'),k={name:"categories/annals/2024/12/01/默认路由.md"};function x(c,e,I,v,C,N){const s=p,h=o("ClientOnly"),u=o("VPNolebaseInlineLinkPreview"),m=o("NolebaseGitContributors"),g=o("NolebaseGitChangelog");return l(),_("div",null,[e[1]||(e[1]=t("h1",{id:"默认路由",tabindex:"-1"},[i("默认路由 "),t("a",{class:"header-anchor",href:"#默认路由","aria-label":'Permalink to "默认路由"'},"​")],-1)),a(h,null,{default:n(()=>{var d,r;return[(((d=c.$frontmatter)==null?void 0:d.aside)??!0)&&(((r=c.$frontmatter)==null?void 0:r.showArticleMetadata)??!0)?(l(),f(s,{key:0,article:c.$frontmatter},null,8,["article"])):q("",!0)]}),_:1}),e[2]||(e[2]=P('<figure><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202412011921268.png" alt="作者家庭网络配置" tabindex="0"><figcaption>作者家庭网络配置</figcaption></figure><div class="info custom-block"><p class="custom-block-title">如果你的电脑的 IP 地址是 <code>192.168.2.18</code>，而连接的路由器配置了默认路由（目标地址 <code>0.0.0.0</code>，子网地址 <code>0.0.0.0</code>，下一跳地址 <code>192.168.1.1</code>），并且路由器的网关是 <code>192.168.1.1</code>，那么具体的流量处理会取决于以下几个方面：</p><h3 id="_1-是否属于同一个子网" tabindex="-1">1. <strong>是否属于同一个子网</strong> <a class="header-anchor" href="#_1-是否属于同一个子网" aria-label="Permalink to &quot;1. **是否属于同一个子网**&quot;">​</a></h3><ul><li>你的电脑 IP 地址是 <code>192.168.2.18</code>，而路由器的网关是 <code>192.168.1.1</code>。这意味着它们不在同一个子网内（假设子网掩码是 <code>255.255.255.0</code>）。</li><li>在这种情况下，路由器会将 <code>192.168.2.18</code> 的流量视为目的地址在另一个子网，因此流量需要经过路由转发。</li></ul><h3 id="_2-默认路由的作用" tabindex="-1">2. <strong>默认路由的作用</strong> <a class="header-anchor" href="#_2-默认路由的作用" aria-label="Permalink to &quot;2. **默认路由的作用**&quot;">​</a></h3><ul><li>默认路由是用来转发所有没有明确匹配的目标地址的流量。在这种情况下，默认路由会将你的电脑 <code>192.168.2.18</code> 的流量转发到 <code>192.168.1.1</code>。</li><li>然后，<code>192.168.1.1</code> 将会根据它的路由表判断如何处理流量。</li></ul><h3 id="_3-流量的处理过程" tabindex="-1">3. <strong>流量的处理过程</strong> <a class="header-anchor" href="#_3-流量的处理过程" aria-label="Permalink to &quot;3. **流量的处理过程**&quot;">​</a></h3><ul><li>假设路由器的网关 <code>192.168.1.1</code> 是与 <code>192.168.1.0</code> 子网相连接的，并且有到其他网络的路由（包括 <code>192.168.2.0/24</code>）的话，流量就会被正确转发。</li><li>如果目标地址是 <code>192.168.1.0</code>（例如，<code>192.168.1.5</code> 或任何 <code>192.168.1.x</code> 地址），而 <code>192.168.2.18</code> 要访问的地址属于 <code>192.168.1.0/24</code> 网络，路由器会根据它的路由表将流量正确地转发到 <code>192.168.1.0</code> 段。</li></ul><h3 id="_4-流量路径总结" tabindex="-1">4. <strong>流量路径总结</strong> <a class="header-anchor" href="#_4-流量路径总结" aria-label="Permalink to &quot;4. **流量路径总结**&quot;">​</a></h3><ul><li>你的电脑 <code>192.168.2.18</code> 发送到目标地址为 <code>192.168.1.0</code> 段的流量时，路由器会： <ul><li>将流量发送到网关 <code>192.168.1.1</code>。</li><li><code>192.168.1.1</code> 会判断是否有到 <code>192.168.1.0</code> 段的路由。如果有（例如，它在同一个子网或通过其它路由连接），流量就会成功到达 <code>192.168.1.0</code> 段。</li><li>如果 <code>192.168.1.1</code> 没有到达 <code>192.168.1.0</code> 段的路由，它会丢弃或通过其他方式处理该流量。</li></ul></li></ul><h3 id="总结" tabindex="-1">总结： <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结：&quot;">​</a></h3><ul><li>如果你的电脑在 <code>192.168.2.0/24</code> 子网内，而路由器配置了默认路由，且网关是 <code>192.168.1.1</code>，你的电脑与 <code>192.168.1.0</code> 段的通信是可以通过路由器 <code>192.168.1.1</code> 实现的。路由器会将流量转发到正确的目标，只要路由器本身能够访问到 <code>192.168.1.0</code> 子网。</li></ul></div><div class="info custom-block"><p class="custom-block-title">默认路由（<code>0.0.0.0/0</code>）是自动配置的，通常是因为设备或路由器连接到外部网络（如互联网）时，需要一条指向外部的默认路径。这种配置在网络中是非常常见的，尤其是连接到互联网的设备上。下面是为什么路由器会自动配置默认路由的一些原因：</p><h3 id="_1-默认路由的作用" tabindex="-1">1. <strong>默认路由的作用</strong> <a class="header-anchor" href="#_1-默认路由的作用" aria-label="Permalink to &quot;1. **默认路由的作用**&quot;">​</a></h3><p>默认路由的作用是作为“最后的手段”，它处理所有没有明确匹配目标的流量。换句话说，当路由器收到一个目标地址在其路由表中没有匹配的流量时，它会将该流量转发到默认路由指定的下一跳地址（通常是网关）。例如：</p><ul><li><p>默认路由 <code>0.0.0.0/0</code>，下一跳 <code>192.168.1.1</code>，指示路由器将所有不匹配其他路由表项的流量转发到 <code>192.168.1.1</code>。</p></li><li><p>默认路由是用来处理那些不符合其他路由条目的流量。它通常被设置为指向一个网关或上游路由器的 IP 地址，用来处理去往互联网或其他未知网络的流量。网关（Gateway）通常指的是流量发送到目标网络时，数据包需要通过的下一跳设备的IP地址。</p></li></ul><h3 id="_2-动态路由协议" tabindex="-1">2. <strong>动态路由协议</strong> <a class="header-anchor" href="#_2-动态路由协议" aria-label="Permalink to &quot;2. **动态路由协议**&quot;">​</a></h3><p>默认路由有时是通过动态路由协议（如 <code>RIP</code>、<code>OSPF</code> 或 <code>BGP</code>）自动学习到的。如果路由器配置了动态路由协议，它会自动向邻居路由器宣布其默认路由（或者接收邻居路由器的默认路由）。这样，路由器就可以自动更新其路由表，包括默认路由。</p><ul><li>例如，很多连接到互联网的路由器会通过 <code>BGP</code> 协议学习到默认路由，指向互联网服务提供商（ISP）的网关。</li><li>如果你连接到局域网，路由器通常会配置一个默认路由指向上游设备（如上游网关、路由器或ISP的设备）。</li></ul><h3 id="_3-配置简便性" tabindex="-1">3. <strong>配置简便性</strong> <a class="header-anchor" href="#_3-配置简便性" aria-label="Permalink to &quot;3. **配置简便性**&quot;">​</a></h3><p>默认路由的自动配置使得管理员在设置网络时可以不必每次都手动配置所有的路由规则。特别是在连接到外部网络（如互联网）时，默认路由可以简化配置。很多设备、家庭路由器和防火墙在初始化时都会自动配置一个默认路由。</p><h3 id="_4-操作系统和路由器默认行为" tabindex="-1">4. <strong>操作系统和路由器默认行为</strong> <a class="header-anchor" href="#_4-操作系统和路由器默认行为" aria-label="Permalink to &quot;4. **操作系统和路由器默认行为**&quot;">​</a></h3><p>许多操作系统和路由器默认都会配置默认路由，以确保设备可以访问外部网络。比如：</p><ul><li><strong>家庭路由器</strong>通常会自动配置一个默认路由，指向ISP的网关，确保家庭网络可以访问互联网。</li><li><strong>企业级路由器</strong>可能会自动配置默认路由，以确保网络中的设备可以访问外部网络或不同的子网。</li></ul><h3 id="_5-连接到网关或互联网" tabindex="-1">5. <strong>连接到网关或互联网</strong> <a class="header-anchor" href="#_5-连接到网关或互联网" aria-label="Permalink to &quot;5. **连接到网关或互联网**&quot;">​</a></h3><p>当路由器连接到一个上游网关（如你的 ISP 提供的路由器、光猫或其他设备）时，它通常会将该网关设置为默认路由。这样，所有来自内部网络、未明确路由的流量都会被发送到这个网关，进而访问外部网络。</p><ul><li>例如，家庭网络中，当你连接到互联网时，路由器通常会自动配置默认路由，将流量发送到ISP的路由器或光猫（例如 <code>192.168.1.1</code>）。</li></ul><h3 id="_6-dhcp-提供的默认路由" tabindex="-1">6. <strong>DHCP 提供的默认路由</strong> <a class="header-anchor" href="#_6-dhcp-提供的默认路由" aria-label="Permalink to &quot;6. **DHCP 提供的默认路由**&quot;">​</a></h3><p>如果你的设备或路由器从上游设备（如ISP、另一个路由器或DHCP服务器）获取IP地址配置，它通常会从DHCP服务器获取到包括默认路由在内的网络配置参数。DHCP服务器会自动向路由器提供一个默认路由地址（通常是网关地址），并将其配置到路由表中。</p><h3 id="总结-1" tabindex="-1">总结： <a class="header-anchor" href="#总结-1" aria-label="Permalink to &quot;总结：&quot;">​</a></h3><p>默认路由通常是自动配置的，主要是为了确保设备能够与不在本地子网内的目标通信。通过动态路由协议、DHCP或其他自动化配置方式，路由器可以简化网络配置，确保流量能够顺利通过网关、上游设备或互联网。</p></div><div class="info custom-block"><p class="custom-block-title">如果你的另一台 modem 的 IP 地址是 192.168.1.1，并且你 不配置静态路由和默认路由，那么从 192.168.1.0/24 网段的设备是 无法访问 192.168.2.0/24 网段 的，原因如下：</p><ol><li>路由器配置解释 你提到的路由器（192.168.2.1）配置了：</li></ol><p>目标地址：0.0.0.0 子网地址：0.0.0.0 下一跳地址：192.168.1.1 出接口：WAN 这表明该路由器的流量会通过 192.168.1.1 这个网关（即 modem）向外部网络（例如互联网）转发数据。</p><ol start="2"><li>没有配置静态路由或默认路由的情况 从 192.168.1.0/24 网段访问 192.168.2.0/24，需要在 modem （即 192.168.1.1）或其他路由设备中配置路由规则。默认情况下，192.168.1.1 只能知道如何处理属于 192.168.1.0/24 网段的流量，但它并不知道如何转发到 192.168.2.0/24 网段。</li></ol><p>如果没有 静态路由 或 默认路由 配置，那么从 192.168.1.0/24 网段的设备发出的数据包，目的地址是 192.168.2.0/24，会被 modem（192.168.1.1）丢弃，因为 modem 不知道如何转发到 192.168.2.0/24 网段。</p><ol start="3"><li>路由器到 modem 的转发问题 你说的 192.168.2.1 的路由器上已经配置了默认路由，指向 192.168.1.1，但是 modem（192.168.1.1）不知道如何将流量返回到 192.168.2.0/24，因为它没有被配置与 192.168.2.0/24 网段通信。</li></ol><p>这就意味着，modem 必须配置一条静态路由，将 192.168.2.0/24 网段的流量指向 192.168.2.1，否则它就无法知道如何回传数据包到 192.168.2.0/24。</p><ol start="4"><li>总结 如果你没有在 modem 上配置静态路由或默认路由，modem 就不知道如何将流量转发到 192.168.2.0/24 网段。因此，192.168.1.0/24 网段的设备将无法访问 192.168.2.0/24 网段，除非你在 modem 上配置相应的路由规则，告诉它如何转发到 192.168.2.0/24。</li></ol></div><figure><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202412012204263.png" alt="路由跟踪" tabindex="0"><figcaption>路由跟踪</figcaption></figure><div class="info custom-block"><p class="custom-block-title">路由跟踪</p><p>根据你提供的 <code>tracert</code> 结果，路由跟踪的第一跳显示的是 <code>192.168.2.1</code>（<code>router.ctc</code>），而没有出现 <code>192.168.1.1</code>，这可能是因为网络配置中的路由规则或网关设置导致的。我们可以从以下几个方面来分析为什么没有看到 <code>192.168.1.1</code> 作为中间跳点：</p><h3 id="_1-本地网络直接可达" tabindex="-1">1. <strong>本地网络直接可达</strong> <a class="header-anchor" href="#_1-本地网络直接可达" aria-label="Permalink to &quot;1. **本地网络直接可达**&quot;">​</a></h3><ul><li><p>如果你的计算机和 <code>192.168.1.4</code> 在同一物理网络或者相同的子网内，那么在 <code>tracert</code> 跟踪到目标时，它直接通过 <strong>本地路由</strong> （如网段路由）到达目标主机，而不需要经过网关。也就是说，<code>192.168.1.4</code> 对于你的计算机来说，可能是直接可达的，不需要通过 <strong>192.168.1.1</strong> 网关。</p></li><li><p>具体来说，假设你的计算机的 IP 是 <code>192.168.2.4</code>，并且你在 <strong><code>192.168.2.0/24</code></strong> 子网中。如果你尝试访问 <strong><code>192.168.1.4</code></strong>，而该目标设备处于 <strong><code>192.168.1.0/24</code></strong> 网段，它和你的计算机属于不同的网段，但如果在你的路由器上配置了适当的路由，<code>192.168.2.1</code> 就会作为网关将流量转发到 <code>192.168.1.0/24</code> 网段。<strong>但是，<code>tracert</code> 结果并没有显示 <code>192.168.1.1</code>，说明 <code>192.168.1.4</code> 是直接到达的，不需要通过 <code>192.168.1.1</code> 网关。</strong></p></li></ul><h3 id="_2-网络路由直接从-192-168-2-1-路由器转发" tabindex="-1">2. <strong>网络路由直接从 <code>192.168.2.1</code> 路由器转发</strong> <a class="header-anchor" href="#_2-网络路由直接从-192-168-2-1-路由器转发" aria-label="Permalink to &quot;2. **网络路由直接从 `192.168.2.1` 路由器转发**&quot;">​</a></h3><ul><li>如果你的 <code>192.168.2.1</code> 路由器已经配置了与 <code>192.168.1.0/24</code> 网络的路由，那么 <code>tracert</code> 会直接看到从 <code>192.168.2.1</code> 到 <code>192.168.1.4</code> 的跳跃，而不需要经过 <code>192.168.1.1</code>。</li><li>例如，<code>192.168.1.1</code> 可能作为一个默认的网关用于处理对外的流量，而 <strong>本地网段</strong>（如 <code>192.168.1.0/24</code>）的流量直接通过 <code>192.168.2.1</code> 进行路由。</li></ul><h3 id="_3-tracert-命令的工作原理" tabindex="-1">3. <strong><code>tracert</code> 命令的工作原理</strong> <a class="header-anchor" href="#_3-tracert-命令的工作原理" aria-label="Permalink to &quot;3. **`tracert` 命令的工作原理**&quot;">​</a></h3><ul><li><code>tracert</code>（Traceroute）命令会显示数据包经过的每个跃点，但它不会显示数据包经过的所有路由器。它的显示通常取决于数据包路由过程中的 IP 跳转以及目标主机的响应路径。</li><li>如果 <code>192.168.2.1</code> 路由器直接处理了 <code>192.168.1.4</code> 的流量，那么它就直接通过自己的路由表将流量送达目的地，不需要经过 <code>192.168.1.1</code>。因此，<code>tracert</code> 跟踪时显示的就是从 <code>192.168.2.1</code> 到 <code>192.168.1.4</code> 的路径。</li></ul><h3 id="_4-可能的配置问题" tabindex="-1">4. <strong>可能的配置问题</strong> <a class="header-anchor" href="#_4-可能的配置问题" aria-label="Permalink to &quot;4. **可能的配置问题**&quot;">​</a></h3><ul><li>如果 <strong><code>192.168.1.1</code></strong> 是你设置的默认网关，并且你预期它应该出现在 <code>tracert</code> 中，那么可能是你的设备或路由器配置有问题。比如： <ul><li><code>192.168.1.1</code> 没有正确配置为流量的网关。</li><li><strong>路由表</strong> 中存在某些更优先的路由，导致数据包绕过了 <code>192.168.1.1</code>。</li></ul></li></ul><h3 id="总结-2" tabindex="-1">总结 <a class="header-anchor" href="#总结-2" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>从你提供的 <code>tracert</code> 输出来看，<code>192.168.2.1</code> 路由器直接转发了到 <code>192.168.1.4</code> 的流量，这也可能是由于你的本地网络配置、路由表或 <strong>路由器的策略</strong> 配置所导致的。正常情况下，<code>192.168.1.1</code> 应该是 <code>192.168.1.4</code> 的网关，但由于路由器设置或子网设计，流量直接通过了 <code>192.168.2.1</code> 路由器。</p></div><h2 id="推荐安装的软件" tabindex="-1">推荐安装的软件 <a class="header-anchor" href="#推荐安装的软件" aria-label="Permalink to &quot;推荐安装的软件&quot;">​</a></h2>',7)),t("p",null,[a(u,{href:"https://www.advanced-ip-scanner.com/cn/",target:"_blank",rel:"noreferrer"},{default:n(()=>e[0]||(e[0]=[i("Advanced IP Scanner")])),_:1})]),a(m),a(g)])}const $=b(k,[["render",x]]);export{V as __pageData,$ as default};
