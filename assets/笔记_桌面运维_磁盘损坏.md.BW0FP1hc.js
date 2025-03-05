import{_ as d,z as g,L as h,c as C,W as n,E as y,aw as c,S as i,y as k,D as B,G as E}from"./chunks/framework.CM4BUq8o.js";const I=JSON.parse('{"title":"磁盘故障损坏处理方案","description":"","frontmatter":{"createtime":"2024/11/26","title":"磁盘故障损坏处理方案","outline":[2,3],"categories":["桌面运维"],"tags":["磁盘"]},"headers":[],"relativePath":"笔记/桌面运维/磁盘损坏.md","filePath":"笔记/桌面运维/磁盘损坏.md","lastUpdated":1732636517000}'),b={name:"笔记/桌面运维/磁盘损坏.md"};function m(a,s,u,o,v,f){const e=i("ArticleMetadata1"),t=i("ClientOnly"),F=i("NolebaseGitContributors"),r=i("NolebaseGitChangelog");return k(),g("div",null,[s[0]||(s[0]=h("h1",{id:"磁盘故障损坏处理方案",tabindex:"-1"},[C("磁盘故障损坏处理方案 "),h("a",{class:"header-anchor",href:"#磁盘故障损坏处理方案","aria-label":'Permalink to "磁盘故障损坏处理方案"'},"​")],-1)),n(t,null,{default:y(()=>{var l,p;return[(((l=a.$frontmatter)==null?void 0:l.aside)??!0)&&(((p=a.$frontmatter)==null?void 0:p.showArticleMetadata)??!0)?(k(),B(e,{key:0,article:a.$frontmatter},null,8,["article"])):E("",!0)]}),_:1}),s[1]||(s[1]=c(`<blockquote><p>遇到磁盘，或者U盘出现文件或目录损坏无法读取。</p></blockquote><figure><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202411261946319.png" alt="磁盘故障" tabindex="0"><figcaption>磁盘故障</figcaption></figure><p>使用命令提示符进行修复</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-n7sXr" id="tab-vzkRzVV" checked><label for="tab-vzkRzVV">cmd命令</label></div><div class="blocks"><div class="language-sh vp-adaptive-theme active line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">CHKDSK</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> F:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /f</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></div></div><div class="language-sh vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">C:\\Users\\lyz123</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">CHKDSK</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> F:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /f</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">文件系统的类型是</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> NTFS。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">卷标是</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> EasyU。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">阶段</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 1:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 检查基本文件系统结构...</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  已处理</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 8448</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 个文件记录。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">文件验证完成。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> 阶段持续时间</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (文件记录验证): 645.03 毫秒。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  已处理</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 个大型文件记录。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> 阶段持续时间</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (孤立文件记录恢复): 0.89 毫秒。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  已处理</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 个错误的文件记录。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> 阶段持续时间</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (文件记录检查错误): 0.40 毫秒。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">阶段</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 2:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 检查文件名链接...</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">正在更正文件</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 9</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 索引</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $SII </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">的错误。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">CHKDSK</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 在文件</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 9</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 的索引</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $SII </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">的卷位图中发现标记为已分配的可用空间。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">正在对文件</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 9</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 中的索引</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $SII </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">进行排序。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  已处理</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 97</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 个重新解析记录。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  已处理</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 9774</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 个索引项。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">索引验证完成。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> 阶段持续时间</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (索引验证): 11.03 秒。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">CHKDSK</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 正在扫描未编制索引的文件以便重新连接到其原始目录。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  已扫描到</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 个未索引文件。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">正在将孤立文件</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> S-1-5-21-3454362785-418737435-4004927892-500</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (1C30)恢复到目录文件 27。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  已将</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 个未编制索引的文件恢复到原始目录。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> 阶段持续时间</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (孤立文件重新连接): 48.44 毫秒。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  已将</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 个未编制索引的文件恢复到回收箱。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> 阶段持续时间</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (孤立文件恢复到回收箱): 33.76 毫秒。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  已处理</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 97</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 个重新解析记录。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> 阶段持续时间</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (重分析点和对象 </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ID</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 验证</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">): 2.03 毫秒。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">阶段</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 3:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 检查安全描述符...</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">正在将带有</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Id</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 169</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 的一个索引数据项插入文件</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 9</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 的索引</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $SII</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">正在将带有</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Id</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 16A</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 的一个索引数据项插入文件</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 9</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 的索引</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $SII</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">正在将带有</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Id</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 169</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 的一个索引数据项插入文件</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 9</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 的索引</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $SDH</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">正在将带有</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Id</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 16A</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 的一个索引数据项插入文件</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 9</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 的索引</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $SDH</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">正修复安全文件的记录段。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">正在从文件</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 9</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 的索引</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $SII </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">中清除</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 16</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 个未经使用的索引项。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">正在从文件</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 9</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 的索引</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $SDH </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">中清除</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 16</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 个未经使用的索引项。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">正在清除</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 16</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 个未经使用的安全描述符。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">安全描述符验证完成。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> 阶段持续时间</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (安全描述符验证): 181.54 毫秒。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  已处理</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 664</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 个数据文件。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> 阶段持续时间</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (数据属性验证): 1.04 毫秒。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">CHKDSK</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 正在验证</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Usn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 日志...</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Usn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 日志验证完成。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">正在更正主文件表(MFT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) BITMAP 属性的错误。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">正在更正卷位图的错误。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Windows</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 已更正文件系统。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">无需采取进一步操作。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">总共有</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  969561087</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> KB</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 磁盘空间。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">6538</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 个文件中有</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  118980320</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> KB。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">665</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 个索引</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">       1808</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> KB。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">坏扇区</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> KB。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">系统正在使用</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     104007</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> KB。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">日志文件占用了</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      65536</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> KB。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">磁盘上</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  850474952</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> KB</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 可用。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">每个分配单元中有</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">       4096</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 字节。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">磁盘上共有</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  242390271</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 个分配单元。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">磁盘上有</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  212618738</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 个可用的分配单元。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">总持续时间:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 11.99</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 秒</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (11991 </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">毫秒</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br></div></div>`,5)),n(F),n(r)])}const K=d(b,[["render",m]]);export{I as __pageData,K as default};
