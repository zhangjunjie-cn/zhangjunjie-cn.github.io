import{_ as g,m as t,f as o,h as d,k as l,y as u,u as s,B as h,p as b,q as k,V as x}from"./chunks/framework.QwH3YlDt.js";const z=JSON.parse('{"title":"Excel文件大小优化","description":"","frontmatter":{"createtime":"2024/06/02","title":"Excel文件大小优化","outline":[2,3],"categories":["博客"],"tags":["WORK"]},"headers":[],"relativePath":"博客/2024/06/03Excel大小优化.md","filePath":"博客/2024/06/03Excel大小优化.md","lastUpdated":1731934995000}'),v={name:"博客/2024/06/03Excel大小优化.md"};function _(a,e,j,f,w,E){const r=t("ArticleMetadata1"),n=t("ClientOnly"),m=t("NolebaseGitContributors"),p=t("NolebaseGitChangelog");return o(),d("div",null,[e[0]||(e[0]=l("h1",{id:"excel文件大小优化",tabindex:"-1"},[u("Excel文件大小优化 "),l("a",{class:"header-anchor",href:"#excel文件大小优化","aria-label":'Permalink to "Excel文件大小优化"'},"​")],-1)),s(n,null,{default:h(()=>{var c,i;return[(((c=a.$frontmatter)==null?void 0:c.aside)??!0)&&(((i=a.$frontmatter)==null?void 0:i.showArticleMetadata)??!0)?(o(),b(r,{key:0,article:a.$frontmatter},null,8,["article"])):k("",!0)]}),_:1}),e[1]||(e[1]=x('<hr><p>打开Excel特别的慢，要等半天才能出结果，无论怎么清除表格无用的格式，不仅没有缩小反而更大了，这说明你文件里有很多的垃圾信息。</p><div class="note custom-block github-alert"><p class="custom-block-title">excel</p><p><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406032203609.png"></p></div><p>点击【查找】，选择【窗格】，如果里面有很多，就说明存在大量的垃圾信息。</p><div class="note custom-block github-alert"><p class="custom-block-title">wps</p><p><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406032208010.png"></p></div><div class="note custom-block github-alert"><p class="custom-block-title"> </p><p><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406032209912.png"></p></div><p>点击【文件】-【另存为】-【MicrosoftExcel文件（*.xlsx)】</p><div class="note custom-block github-alert"><p class="custom-block-title">wps另存为：</p><p><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406032224092.png"></p></div><p>在文件资管管理器，点击【查看】-【文件扩展名】，勾选，将文件扩展名改为.zip格式。</p><div class="note custom-block github-alert"><p class="custom-block-title">文件资源管理器</p><p><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406032227545.png"></p></div><div class="note custom-block github-alert"><p class="custom-block-title"> </p><p><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406032231970.png"></p></div><p>右键对文件进行解压缩，进入xl文件夹，在这里面如果你看到了<code>activeX</code>、<code>drawings</code>、<code>media</code>就将其删除。然后返回上一层目录，将所有文件进行压缩，并将压缩文件后缀名改为.xlsx。可以看到文件大小巨幅缩小。</p><div class="note custom-block github-alert"><p class="custom-block-title">文件资源管理器</p><p><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406032234352.png"></p></div><div class="note custom-block github-alert"><p class="custom-block-title"> </p><p><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406032236009.png"></p></div>',14)),s(m),s(p)])}const C=g(v,[["render",_]]);export{z as __pageData,C as default};
