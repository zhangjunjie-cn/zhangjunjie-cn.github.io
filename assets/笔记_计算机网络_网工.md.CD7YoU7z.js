import{_ as A,h as g,l as r,x as d,u as l,B as u,V as m,m as o,f as s,p as h,q as I}from"./chunks/framework.ksdMcADN.js";const M=JSON.parse('{"title":"网工入门","description":"","frontmatter":{"createtime":"2024/5/14","title":"网工入门","outline":[2,3],"isTop":true,"categories":["笔记"],"tags":["网工"]},"headers":[],"relativePath":"笔记/计算机网络/网工.md","filePath":"笔记/计算机网络/网工.md","lastUpdated":1732378603000}'),b={name:"笔记/计算机网络/网工.md"};function _(a,t,f,C,k,N){const n=o("ArticleMetadata1"),p=o("ClientOnly"),c=o("NolebaseGitContributors"),P=o("NolebaseGitChangelog");return s(),g("div",null,[t[0]||(t[0]=r("h1",{id:"网工入门",tabindex:"-1"},[d("网工入门 "),r("a",{class:"header-anchor",href:"#网工入门","aria-label":'Permalink to "网工入门"'},"​")],-1)),l(p,null,{default:u(()=>{var e,i;return[(((e=a.$frontmatter)==null?void 0:e.aside)??!0)&&(((i=a.$frontmatter)==null?void 0:i.showArticleMetadata)??!0)?(s(),h(n,{key:0,article:a.$frontmatter},null,8,["article"])):I("",!0)]}),_:1}),t[1]||(t[1]=m('<hr><h3 id="_1-为什么防火墙需要两条宽带" tabindex="-1">1. 为什么防火墙需要两条宽带 <a class="header-anchor" href="#_1-为什么防火墙需要两条宽带" aria-label="Permalink to &quot;1. 为什么防火墙需要两条宽带&quot;">​</a></h3><div class="note custom-block github-alert"><p class="custom-block-title">防火墙需要两条宽带主要是为了提高网络的带宽和稳定性。具体来说，有以下几个原因：</p><p></p><ol><li><strong>提高带宽</strong>：通过将两条宽带合并使用，可以增加整体的网络带宽，满足更高的数据传输需求。</li><li><strong>增强稳定性</strong>：如果一条宽带出现故障或中断，另一条宽带可以继续提供服务，保证网络的连续性和可靠性。</li><li><strong>负载均衡</strong>：防火墙可以配置为“双WAN口负载均衡”，使得两条宽带的流量可以根据策略分配，合理利用每条宽带的资源，避免某一条宽带过载而影响整体性能。</li><li><strong>主备模式</strong>：在“双WAN口主备”模式下，一条宽带作为主要连接，另一条作为备用连接，当主连接出现问题时，备用连接自动接管，确保网络不中断。</li><li><strong>优化性能</strong>：对于不同类型的流量，如内部网络管理和外部网络访问，可以通过不同的宽带连接进行分流，优化网络性能和管理效率。</li><li><strong>策略路由</strong>：根据不同的业务需求，可以将特定的流量引导到特定的宽带上，实现更加精细化的流量管理。</li><li><strong>安全性考虑</strong>：在一些安全要求较高的环境中，通过两条宽带可以实现物理隔离，比如一条用于内部网络，一条用于DMZ区域或其他非信任区域，从而增强网络安全性。</li></ol><p>综上所述，两条宽带的配置为防火墙提供了更高的灵活性和可靠性，是许多企业和组织为了保证网络服务质量和安全性所采取的一种常见做法。</p></div><h3 id="_2-路由器的arp表里面-无论是有线还是无线-都是在arp里面注册吗" tabindex="-1">2. 路由器的ARP表里面，无论是有线还是无线，都是在ARP里面注册吗？ <a class="header-anchor" href="#_2-路由器的arp表里面-无论是有线还是无线-都是在arp里面注册吗" aria-label="Permalink to &quot;2. 路由器的ARP表里面，无论是有线还是无线，都是在ARP里面注册吗？&quot;">​</a></h3><div class="important custom-block github-alert"><p class="custom-block-title">对用户达成目标至关重要的信息。</p><p></p><ol><li><p>无论是有线连接还是无线连接，设备都会在ARP表中注册其<strong>IP地址和MAC地址的对应关系</strong>。</p></li><li><p>ARP（Address Resolution Protocol）地址解析协议，它的作用是将网络层的IP地址解析为链路层的MAC地址。这个过程对于路由器来说同样适用，无论连接是有线还是无线。当设备需要发送数据给同一局域网内的另一个设备时，它&gt; 会检查ARP表以找出目标IP地址对应的MAC地址。如果找不到，它会广播一个ARP请求以获取这一信息。</p></li><li><p>具体到路由器，它会在其<strong>ARP缓存表中记录与之通信的设备的IP和MAC地址映射关系</strong>，不论是通过有线连接还是无线连接。这样，当路由器收到发往局域网内某个IP地址的数据包时，就可以利用ARP表中的信息将数据包正确地转发到&gt; 具有相应MAC地址的设备上。</p></li><li><p>需要注意的是，ARP请求和响应通常只在同一广播域内有效，不会跨越不同的网络段，因为路由器默认会隔离广播流量，防止ARP广播包在不同网段间传播造成不必要的流量和潜在的安全风险。</p></li><li><p>综上所述，路由器的ARP表是用来存储和管理局域网内设备IP地址与MAC地址映射关系的，这一机制适用于所有连接到路由器的设备，无论它们是通过有线还是无线方式连接的。</p></li></ol></div><h3 id="_3-ap和家用路由器的区别" tabindex="-1">3. ap和家用路由器的区别 <a class="header-anchor" href="#_3-ap和家用路由器的区别" aria-label="Permalink to &quot;3. ap和家用路由器的区别&quot;">​</a></h3><div class="caution custom-block github-alert"><p class="custom-block-title">CAUTION</p><p>AP（无线接入点）和家用路由器在功能、应用场景以及性能方面上是有区别的。</p><ol><li><strong>功能</strong>：家用路由器通常集成了AP的功能，它可以将有线网络转换为无线网络，供家庭内的设备如笔记本电脑、智能手机等连接使用。而AP主要负责将有线网络转换为无线网络，它通常不具备路由功能，也就是说，AP一般不负责&gt; 分配IP地址和管理网络流量。</li><li><strong>应用场景</strong>：AP通常应用于中大型的无线网络建设，如商场、超市、酒店、企业办公等场所，它们通常与AC（无线控制器）配合使用，以组建较大的无线网络覆盖。而家用路由器则适用于小型网络建设，如家庭或小型办公室，它&gt; 可以独立工作，不需要额外的网络管理设备。</li><li><strong>性能</strong>：由于应用场景的不同，AP和家用路由器在性能上也有所区别。AP通常设计用于支持更多用户的连接，提供更稳定的信号覆盖，而家用路由器的性能则足以满足家庭用户的基本需求。</li></ol><p>综上所述，AP和家用路由器在功能和应用场景等方面上存在明显差异。在选择网络设备时，应根据具体的网络需求和环境来决定使用哪种类型的设备。</p></div><h3 id="_4-吸顶ap的默认ip地址是192-168-1-25-但是公司的网络是172-20-80-0-22-吸顶ap的网络线是从防火墙到光纤跳线再到光纤收发器出来的网络线-请问我应该怎么使手机连接到吸顶ap的wifi的ip地址为172-20-80-0-22-这个ip地址的范围呢" tabindex="-1">4. 吸顶AP的默认IP地址是192.168.1.25，但是公司的网络是172.20.80.0/22，吸顶AP的网络线是从防火墙到光纤跳线再到光纤收发器出来的网络线，请问我应该怎么使手机连接到吸顶AP的WIFI的IP地址为172.20.80.0/22 这个IP地址的范围呢？ <a class="header-anchor" href="#_4-吸顶ap的默认ip地址是192-168-1-25-但是公司的网络是172-20-80-0-22-吸顶ap的网络线是从防火墙到光纤跳线再到光纤收发器出来的网络线-请问我应该怎么使手机连接到吸顶ap的wifi的ip地址为172-20-80-0-22-这个ip地址的范围呢" aria-label="Permalink to &quot;4. 吸顶AP的默认IP地址是192.168.1.25，但是公司的网络是172.20.80.0/22，吸顶AP的网络线是从防火墙到光纤跳线再到光纤收发器出来的网络线，请问我应该怎么使手机连接到吸顶AP的WIFI的IP地址为172.20.80.0/22 这个IP地址的范围呢？&quot;">​</a></h3><div class="note custom-block github-alert"><p class="custom-block-title">要使手机连接到吸顶AP的WIFI并获取172.20.80.0/22这个IP地址范围，您可以按照以下步骤操作：</p><p></p><ol><li><strong>访问AP管理界面</strong>：您需要通过电脑或手机浏览器访问吸顶AP的管理界面。通常这需要输入AP的默认IP地址，如192.168.1.254。</li><li><strong>配置网络设置</strong>：在管理界面中，您需要找到网络设置选项，将AP的网络设置更改为静态IP，并设置为公司网络的IP地址、子网掩码、网关和DNS服务器。这些信息可以从公司的网络管理员那里获得。</li><li><strong>设置无线网络SSID和密码</strong>：在无线设置中，您可以自定义设置无线网络的名称（SSID）和密码，确保它们符合公司的安全标准。</li><li><strong>绑定MAC地址</strong>：如果公司的网络策略要求，您可能需要在AP上绑定手机的MAC地址，以确保只有授权的设备可以连接到网络。</li><li><strong>保存设置并重启AP</strong>：完成上述设置后，保存更改并重启吸顶AP，以使新设置生效。</li><li><strong>连接WIFI网络</strong>：最后，在手机上打开WIFI功能，搜索并连接到刚才设置的无线网络SSID，输入密码后即可连接到网络。</li></ol></div><p>请注意，以上步骤可能需要根据具体的AP型号和公司网络环境进行调整。如果在设置过程中遇到困难，建议咨询专业的网络管理员或设备制造商的技术支持。</p>',10)),l(c),l(P)])}const v=A(b,[["render",_]]);export{M as __pageData,v as default};
