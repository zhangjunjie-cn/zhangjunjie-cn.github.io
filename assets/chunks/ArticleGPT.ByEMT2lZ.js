import{a0 as h,a2 as T,h as n,o as k,e as g,_ as G,A as v,G as d,H as a,c as P,J as y,R as x,I as f}from"./framework.CqMsGXHl.js";const C={key:0,class:"article-gpt s-card"},A={class:"title"},w={class:"content s-card"},D={class:"text"},I={key:0,class:"point"},b={__name:"ArticleGPT",setup(B){const{frontmatter:r}=T(),s=n(!0),u=n(null),o=n(""),c=n(0),i=n(!1),l=(t=null)=>{try{const e=t||r.value.articleGPT;if(!e)return!1;if(c.value<e.length){o.value+=e.charAt(c.value++);const p=Math.random()*120+30;setTimeout(()=>{l(t)},p)}else s.value=!1}catch(e){s.value=!1,o.value="摘要生成失败",$message.error("摘要生成失败，请重试"),console.error("摘要生成失败：",e)}},m=()=>{u.value=setTimeout(()=>{l()},Math.random()*1300+2500)},_=()=>{if(s.value)return!1;const t="我是無名开发的摘要生成助理 FakeGPT，如你所见，这是一个假的 GPT，所有文本皆源于本地书写的内容。我在这里只负责显示，并仿照 GPT 的形式输出，如果你像我一样囊中羞涩，你也可以像我这样做，当然，你也可以使用 Tianli 开发的 TianliGPT 来更简单地实现真正的 AI 摘要。";c.value=0,s.value=!0,o.value="",i.value?(l(),i.value=!1):(i.value=!0,l(t))};return k(()=>{r.value.articleGPT&&m()}),g(()=>{clearTimeout(u.value)}),(t,e)=>G(r).articleGPT?(v(),d("div",C,[a("div",A,[a("span",{class:"name",onClick:e[0]||(e[0]=p=>t.router.go("/posts/2024/0218"))},e[1]||(e[1]=[a("i",{class:"iconfont icon-deepseek"},null,-1),P(" 文章摘要 "),a("i",{class:"iconfont icon-Rightyou"},null,-1)])),a("span",{class:y(["logo",{loading:s.value}]),onClick:_}," DeepSeek ",2)]),a("div",w,[a("span",D,x(o.value===""?"加载中...":o.value),1),s.value?(v(),d("span",I,"|")):f("",!0)]),e[2]||(e[2]=a("div",{class:"meta"},[a("span",{class:"tip"},"文章摘要由DeepSeek Ai生成，并经过人工审核，仅用于文章内容的解释与总结"),a("a",{href:"https://eqnxweimkr5.feishu.cn/share/base/form/shrcnCXCPmxCKKJYI3RKUfefJre",class:"report",target:"_blank"}," 投诉 ")],-1))])):f("",!0)}},K=h(b,[["__scopeId","data-v-e99a5eec"]]);export{K as _};
