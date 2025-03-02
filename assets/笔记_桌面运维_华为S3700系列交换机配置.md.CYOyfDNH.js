import{_ as S}from"./chunks/ArticleMetadata.Dat26yyY.js";import{_ as u,U as t,y as h,A as r,L as p,W as i,ae as m,b as _,E as g,D as f,G as P}from"./chunks/framework.CncsO2go.js";import"./chunks/theme.pqFGKIL6.js";const E=JSON.parse('{"title":"华为S3700系列交换机配置","description":"","frontmatter":{"collapsed":false,"createtime":"2025/01/19 15:00","title":"华为S3700系列交换机配置","outline":[2,3],"categories":["笔记"],"tags":["交换机"]},"headers":[],"relativePath":"笔记/桌面运维/华为S3700系列交换机配置.md","filePath":"笔记/桌面运维/华为S3700系列交换机配置.md","lastUpdated":1738495712000}'),C={name:"笔记/桌面运维/华为S3700系列交换机配置.md"};function b(a,e,A,T,x,N){const s=S,n=t("ClientOnly"),c=t("NolebaseGitContributors"),d=t("NolebaseGitChangelog");return r(),h("div",null,[e[0]||(e[0]=p("h1",{id:"华为s3700-s2700系列交换机配置",tabindex:"-1"},[_("华为S3700，S2700系列交换机配置 "),p("a",{class:"header-anchor",href:"#华为s3700-s2700系列交换机配置","aria-label":'Permalink to "华为S3700，S2700系列交换机配置"'},"​")],-1)),i(n,null,{default:g(()=>{var o,l;return[(((o=a.$frontmatter)==null?void 0:o.aside)??!0)&&(((l=a.$frontmatter)==null?void 0:l.showArticleMetadata)??!0)?(r(),f(s,{key:0,article:a.$frontmatter},null,8,["article"])):P("",!0)]}),_:1}),e[1]||(e[1]=m('<h2 id="使用特性" tabindex="-1">使用特性 <a class="header-anchor" href="#使用特性" aria-label="Permalink to &quot;使用特性&quot;">​</a></h2><ol><li>设备支持镜像功能，该功能主要用于网络检测和故障管理，可能涉及使用个人用户某些通信内容。</li><li>设备支持报文捕获功能（capture-packet），该功能主要用于检测通信传输中的故障和错误。</li><li>设备支持NetStream功能，该功能主要对网络中的业务流量情况进行统计与分析。</li><li>设备支持sFlow功能，该功能主要用于对网络流量进行统计分析。</li><li>设备支持NAC功能，该功能主要用于用户认证和控制用户的网络访问权限，可能涉及使用个人用户某些通信内容。</li><li>设备支持通过FTP、TFTP、SFTP V1&amp;V2及FTPS传输文件。</li><li>设备支持通过Telnet协议和STelnet V1&amp;V2协议登录。</li><li>设备支持HTTP协议和HTTPS协议登录Web网管。</li><li>设备支通过SNMPv1&amp;v2c&amp;v3协议管理设备。</li></ol><h2 id="s2700交换机产品描述" tabindex="-1">S2700交换机产品描述 <a class="header-anchor" href="#s2700交换机产品描述" aria-label="Permalink to &quot;S2700交换机产品描述&quot;">​</a></h2><ul><li><p>S2700提供10/100BASE-T以太网电接口和100/1000BASE-X以太网光接口，支持Access、Trunk和Hybrid等多种接口类型。</p></li><li><p>对于千兆光纤连接，S2700提供可插拔的SFP（Small Form-Factor Pluggable）类型光模块。光纤长度可以根据用户对传输距离的需求灵活选配。</p></li><li><p>S2700可以组成树状、星型和环状以太网。对于环状以太网，S2700提供STP（Spanning Tree Protocol），消除环路并提供快速保护倒换。</p></li></ul><p><strong>S2700保障设备和数据传输的安全，有效的防止恶意用户对网络的攻击。</strong></p><ul><li><p>支持基于MAC地址的过滤。</p></li><li><p>提供丰富的ACL策略。</p></li><li><p>提供“VLAN＋MAC”的查表机制。</p></li><li><p>支持流量抑制。 S2700提供安全的用户登录操作保护。</p></li><li><p>对登录用户提供口令保护，口令可加密功能。</p></li><li><p>通过配置用户级别和命令级别实现对命令的分级保护。</p></li><li><p>通过命令锁定当前配置终端，防止设备被非法使用。</p></li><li><p>对影响系统性能的重要命令，提供确认和提示。 S2700提供ALS（Automatic Laser Shutdown）功能，在光纤连接断开时停止发送激光，有效避免激光对用户的伤害。</p></li></ul><p>S2700不仅自身提供基于接口的流量统计功能，支持IP网络中Ping、TraceRoute等故障检测和定位技术。eSight还提供图表化形式对设备重要监控信息进行展示。</p><h3 id="硬件模块" tabindex="-1">硬件模块 <a class="header-anchor" href="#硬件模块" aria-label="Permalink to &quot;硬件模块&quot;">​</a></h3><figure><img src="https://support.huawei.com/hedex/api/pages/EDOC1000017231/DZC0221K/11/resources/dc/images/fig_dc_s_product_00012901.png" alt="S2700的硬件模块包括SCU、电源、风扇" tabindex="0"><figcaption>S2700的硬件模块包括SCU、电源、风扇</figcaption></figure><h3 id="交换主控板" tabindex="-1">交换主控板 <a class="header-anchor" href="#交换主控板" aria-label="Permalink to &quot;交换主控板&quot;">​</a></h3><p>SCU是S2700的交换主控板，它固定安装在S2700上。S2700有1块SCU。</p><p>SCU提供报文交换和设备管理功能，集成了主控模块、交换模块和接口模块，是多个功能模块的集合体。</p><p><strong>主控模块</strong> 主控模块主要完成如下功能：</p><ul><li>处理各种协议。</li><li>作为用户操作的代理，根据用户的操作指令来管理系统、监视性能，并向用户反馈设备运行情况。</li><li>对SCU上的交换模块、接口模块进行监控和维护。 <strong>交换模块</strong> 交换模块（也称为交换网）负责SCU上接口模块间报文的交换、组播复制、QoS调度、访问控制等功能。</li></ul><p>交换模块采用高性能的ASIC芯片，支持全线速转发，并交换模块提供快速、多优先级的数据交换。</p><p><strong>接口模块</strong> 接口模块提供多个以太网接口，负责接入以太网业务。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>风扇为系统提供准自然散热功能和强制散热功能。</p><p>准自然散热功能是指当周边环境温度超过设定的风扇启动值后，风扇启动，否则风扇不启动。</p><p>S2700-52P-EI-AC、S2710-52P-SI-AC支持准自然散热功能。</p><p>S2700-26TP-PWR-EI、S2710-52P-PWR-SI和S2700-52P-PWR-EI支持可插拔风扇，支持现场更换和在线维护。</p></div><p><strong>可靠性</strong></p><p>S2700支持MSTP技术，既可以消除网络中的广播风暴，又为数据的转发提供冗余备份链路。</p><p>S2700提供Root保护功能。当接口接收到更高优先级的BPDU时，通过长时间维持指定接口的角色来保护根设备的地位，从而避免网络拓扑结构发生错误变动。</p><p>S2700提供环路保护功能。当根接口收不到来自上游的BPDU时，根接口会进入阻塞状态，不转发报文。同时，网络内不再选择新的根接口，从而避免在网络中形成环路。</p><h3 id="s2700提供poe、voice-vlan、nac等功能-凭借s2700体积小巧的特点-可以轻松的提供多样化的桌面接入功能。" tabindex="-1">S2700提供PoE、Voice VLAN、NAC等功能，凭借S2700体积小巧的特点，可以轻松的提供多样化的桌面接入功能。 <a class="header-anchor" href="#s2700提供poe、voice-vlan、nac等功能-凭借s2700体积小巧的特点-可以轻松的提供多样化的桌面接入功能。" aria-label="Permalink to &quot;S2700提供PoE、Voice VLAN、NAC等功能，凭借S2700体积小巧的特点，可以轻松的提供多样化的桌面接入功能。&quot;">​</a></h3><figure><img src="https://support.huawei.com/hedex/api/pages/EDOC1000017231/DZC0221K/11/resources/dc/images/fig_dc_s_product_00015001.png" alt="桌面终端接入" tabindex="0"><figcaption>桌面终端接入</figcaption></figure><h3 id="多种配置方式" tabindex="-1">多种配置方式 <a class="header-anchor" href="#多种配置方式" aria-label="Permalink to &quot;多种配置方式&quot;">​</a></h3><h4 id="多种配置途径" tabindex="-1">多种配置途径 <a class="header-anchor" href="#多种配置途径" aria-label="Permalink to &quot;多种配置途径&quot;">​</a></h4><p>S2700支持多种配置和管理方式：</p><ul><li><p>命令行配置 用户从控制台终端登录到S2700的Console接口，在CLI界面中配置各特性和参数。</p></li><li><p>网管配置 用户通过网管站，基于SNMP协议对S2700进行管理和配置。</p></li><li><p>AutoConfig配置 在设备以空配置启动时，用户可以通过AutoConfig配置自动获取配置文件并执行。</p></li></ul><h4 id="多种登录方式" tabindex="-1">多种登录方式 <a class="header-anchor" href="#多种登录方式" aria-label="Permalink to &quot;多种登录方式&quot;">​</a></h4><p>S2700提供Console配置管理接口，控制台终端可以通过串口登录到Console接口，从而实现本地和远程配置。 另外，用户还可以从其它设备通过Telnet方式登录到S2700的业务接口，然后进行配置和管理。 登录过程中，根据安全性需要可以采用本地认证和AAA认证多种身份验证措施。</p><h2 id="初次上电" tabindex="-1">初次上电 <a class="header-anchor" href="#初次上电" aria-label="Permalink to &quot;初次上电&quot;">​</a></h2><figure><img src="https://support.huawei.com/hedex/api/pages/EDOC1000017231/DZC0221K/11/resources/dc/images/fig_dc_xs_inst_003601.png" alt="调试线" tabindex="0"><figcaption>调试线</figcaption></figure><p><a href="https://support.huawei.com/hedex/api/pages/EDOC1000017231/DZC0221K/11/resources/dc/dc_s_cd_cfg_cmd.html" target="_blank" rel="noreferrer">配置指南（命令行）↗️</a></p>',32)),i(c),i(d)])}const D=u(C,[["render",b]]);export{E as __pageData,D as default};
