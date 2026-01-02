import{i as E}from"./chunk-353BL4L5-t05ly1Yi-BzS4aXZH.DjONR7pC.js";import{S as p,aa as G,a9 as j,ab as q,ac as X,as as Y,ar as Z,u as O,m as _,aE as J,aW as K,aY as U,ae as tt,ax as et,aG as at,aZ as S,a_ as nt,a$ as z}from"./theme.BUkFuS7m.js";import{I as rt}from"./treemap-75Q7IDZK-CIjD8Ibx-m39lfQc4.CASeUEgX.js";import{d as N}from"./arc-aavUJmbb-BU898awq.COeMZ2Ia.js";import{g as it}from"./ordinal-DfAQgscy-BEJTu10r.vTmdWN-q.js";import"./framework.CH2nfyIq.js";import"./baseUniq-CZHCFN8s-CxpD0JS7.Dn5VzJpm.js";import"./basePickBy-XITLGQxL-4VpGP9n9.D9AXBJU5.js";import"./clone-CVDc7lii-BIt5BNUE.DsPiXqFu.js";import"./init-DjUOC4st-C8Nwz6AJ.BTi8F14B.js";function ot(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function lt(t){return t}function st(){var t=lt,a=ot,l=null,m=S(0),g=S(z),w=S(0);function i(e){var n,s=(e=nt(e)).length,u,$,h=0,c=new Array(s),r=new Array(s),x=+m.apply(this,arguments),v=Math.min(z,Math.max(-z,g.apply(this,arguments)-x)),f,T=Math.min(Math.abs(v)/s,w.apply(this,arguments)),C=T*(v<0?-1:1),d;for(n=0;n<s;++n)(d=r[c[n]=n]=+t(e[n],n,e))>0&&(h+=d);for(a!=null?c.sort(function(y,A){return a(r[y],r[A])}):l!=null&&c.sort(function(y,A){return l(e[y],e[A])}),n=0,$=h?(v-s*C)/h:0;n<s;++n,x=f)u=c[n],d=r[u],f=x+(d>0?d*$:0)+C,r[u]={data:e[u],index:n,value:d,startAngle:x,endAngle:f,padAngle:T};return r}return i.value=function(e){return arguments.length?(t=typeof e=="function"?e:S(+e),i):t},i.sortValues=function(e){return arguments.length?(a=e,l=null,i):a},i.sort=function(e){return arguments.length?(l=e,a=null,i):l},i.startAngle=function(e){return arguments.length?(m=typeof e=="function"?e:S(+e),i):m},i.endAngle=function(e){return arguments.length?(g=typeof e=="function"?e:S(+e),i):g},i.padAngle=function(e){return arguments.length?(w=typeof e=="function"?e:S(+e),i):w},i}var ct=at.pie,R={sections:new Map,showData:!1},M=R.sections,W=R.showData,pt=structuredClone(ct),ut=p(()=>structuredClone(pt),"getConfig"),dt=p(()=>{M=new Map,W=R.showData,et()},"clear"),gt=p(({label:t,value:a})=>{M.has(t)||(M.set(t,a),O.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),ft=p(()=>M,"getSections"),mt=p(t=>{W=t},"setShowData"),ht=p(()=>W,"getShowData"),P={getConfig:ut,clear:dt,setDiagramTitle:Z,getDiagramTitle:Y,setAccTitle:X,getAccTitle:q,setAccDescription:j,getAccDescription:G,addSection:gt,getSections:ft,setShowData:mt,getShowData:ht},xt=p((t,a)=>{E(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),yt={parse:p(async t=>{const a=await rt("pie",t);O.debug(a),xt(a,P)},"parse")},St=p(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),wt=St,$t=p(t=>{const a=[...t.entries()].map(l=>({label:l[0],value:l[1]})).sort((l,m)=>m.value-l.value);return st().value(l=>l.value)(a)},"createPieArcs"),vt=p((t,a,l,m)=>{O.debug(`rendering pie chart
`+t);const g=m.db,w=_(),i=J(g.getConfig(),w.pie),e=40,n=18,s=4,u=450,$=u,h=K(a),c=h.append("g");c.attr("transform","translate("+$/2+","+u/2+")");const{themeVariables:r}=w;let[x]=U(r.pieOuterStrokeWidth);x??(x=2);const v=i.textPosition,f=Math.min($,u)/2-e,T=N().innerRadius(0).outerRadius(f),C=N().innerRadius(f*v).outerRadius(f*v);c.append("circle").attr("cx",0).attr("cy",0).attr("r",f+x/2).attr("class","pieOuterCircle");const d=g.getSections(),y=$t(d),A=[r.pie1,r.pie2,r.pie3,r.pie4,r.pie5,r.pie6,r.pie7,r.pie8,r.pie9,r.pie10,r.pie11,r.pie12],D=it(A);c.selectAll("mySlices").data(y).enter().append("path").attr("d",T).attr("fill",o=>D(o.data.label)).attr("class","pieCircle");let F=0;d.forEach(o=>{F+=o}),c.selectAll("mySlices").data(y).enter().append("text").text(o=>(o.data.value/F*100).toFixed(0)+"%").attr("transform",o=>"translate("+C.centroid(o)+")").style("text-anchor","middle").attr("class","slice"),c.append("text").text(g.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const H=c.selectAll(".legend").data(D.domain()).enter().append("g").attr("class","legend").attr("transform",(o,b)=>{const k=n+s,L=k*D.domain().length/2,Q=12*n,V=b*k-L;return"translate("+Q+","+V+")"});H.append("rect").attr("width",n).attr("height",n).style("fill",D).style("stroke",D),H.data(y).append("text").attr("x",n+s).attr("y",n-s).text(o=>{const{label:b,value:k}=o.data;return g.getShowData()?`${b} [${k}]`:b});const B=Math.max(...H.selectAll("text").nodes().map(o=>(o==null?void 0:o.getBoundingClientRect().width)??0)),I=$+e+n+s+B;h.attr("viewBox",`0 0 ${I} ${u}`),tt(h,u,I,i.useMaxWidth)},"draw"),At={draw:vt},Wt={parser:yt,db:P,renderer:At,styles:wt};export{Wt as diagram};
