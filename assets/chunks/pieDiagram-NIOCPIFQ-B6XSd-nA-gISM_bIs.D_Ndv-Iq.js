import{i as _}from"./chunk-353BL4L5-C1ZAb07r-D1nP-mZR.BdKCmIdD.js";import{aa as j,a9 as J,ab as Q,ac as Y,as as Z,ar as q,F as p,T as O,b as H,aE as K,aW as U,aY as X,ae as tt,ax as et,aF as at,aZ as S,a_ as nt,a$ as z}from"./theme.BDdcHPKV.js";import{I as rt}from"./treemap-75Q7IDZK-CjtfQE8u-CpNGz5UP.B2GRrUR4.js";import{d as L}from"./arc-CegaQWj_-DUexKeov.4m7oTigG.js";import{g as it}from"./ordinal-DfAQgscy-BEJTu10r.vTmdWN-q.js";import"./framework.BRFN6XwY.js";import"./baseUniq-BxlSXXQG-CXmu503g.sljtA6LS.js";import"./basePickBy-CC-D1y2F-DY-X7LfZ.BgNvaYiG.js";import"./clone-78XdctpQ-DHi-Mpdh.ClfP_Rqm.js";import"./init-DjUOC4st-C8Nwz6AJ.BTi8F14B.js";function ot(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function lt(t){return t}function st(){var t=lt,a=ot,l=null,m=S(0),g=S(z),w=S(0);function i(e){var n,s=(e=nt(e)).length,u,$,h=0,c=new Array(s),r=new Array(s),x=+m.apply(this,arguments),b=Math.min(z,Math.max(-z,g.apply(this,arguments)-x)),f,v=Math.min(Math.abs(b)/s,w.apply(this,arguments)),C=v*(b<0?-1:1),d;for(n=0;n<s;++n)(d=r[c[n]=n]=+t(e[n],n,e))>0&&(h+=d);for(a!=null?c.sort(function(y,T){return a(r[y],r[T])}):l!=null&&c.sort(function(y,T){return l(e[y],e[T])}),n=0,$=h?(b-s*C)/h:0;n<s;++n,x=f)u=c[n],d=r[u],f=x+(d>0?d*$:0)+C,r[u]={data:e[u],index:n,value:d,startAngle:x,endAngle:f,padAngle:v};return r}return i.value=function(e){return arguments.length?(t=typeof e=="function"?e:S(+e),i):t},i.sortValues=function(e){return arguments.length?(a=e,l=null,i):a},i.sort=function(e){return arguments.length?(l=e,a=null,i):l},i.startAngle=function(e){return arguments.length?(m=typeof e=="function"?e:S(+e),i):m},i.endAngle=function(e){return arguments.length?(g=typeof e=="function"?e:S(+e),i):g},i.padAngle=function(e){return arguments.length?(w=typeof e=="function"?e:S(+e),i):w},i}var ct=at.pie,F={sections:new Map,showData:!1},M=F.sections,R=F.showData,pt=structuredClone(ct),ut=p(()=>structuredClone(pt),"getConfig"),dt=p(()=>{M=new Map,R=F.showData,et()},"clear"),gt=p(({label:t,value:a})=>{M.has(t)||(M.set(t,a),O.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),ft=p(()=>M,"getSections"),mt=p(t=>{R=t},"setShowData"),ht=p(()=>R,"getShowData"),N={getConfig:ut,clear:dt,setDiagramTitle:q,getDiagramTitle:Z,setAccTitle:Y,getAccTitle:Q,setAccDescription:J,getAccDescription:j,addSection:gt,getSections:ft,setShowData:mt,getShowData:ht},xt=p((t,a)=>{_(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),yt={parse:p(async t=>{const a=await rt("pie",t);O.debug(a),xt(a,N)},"parse")},St=p(t=>`
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
`,"getStyles"),wt=St,$t=p(t=>{const a=[...t.entries()].map(l=>({label:l[0],value:l[1]})).sort((l,m)=>m.value-l.value);return st().value(l=>l.value)(a)},"createPieArcs"),bt=p((t,a,l,m)=>{O.debug(`rendering pie chart
`+t);const g=m.db,w=H(),i=K(g.getConfig(),w.pie),e=40,n=18,s=4,u=450,$=u,h=U(a),c=h.append("g");c.attr("transform","translate("+$/2+","+u/2+")");const{themeVariables:r}=w;let[x]=X(r.pieOuterStrokeWidth);x??(x=2);const b=i.textPosition,f=Math.min($,u)/2-e,v=L().innerRadius(0).outerRadius(f),C=L().innerRadius(f*b).outerRadius(f*b);c.append("circle").attr("cx",0).attr("cy",0).attr("r",f+x/2).attr("class","pieOuterCircle");const d=g.getSections(),y=$t(d),T=[r.pie1,r.pie2,r.pie3,r.pie4,r.pie5,r.pie6,r.pie7,r.pie8,r.pie9,r.pie10,r.pie11,r.pie12],A=it(T);c.selectAll("mySlices").data(y).enter().append("path").attr("d",v).attr("fill",o=>A(o.data.label)).attr("class","pieCircle");let B=0;d.forEach(o=>{B+=o}),c.selectAll("mySlices").data(y).enter().append("text").text(o=>(o.data.value/B*100).toFixed(0)+"%").attr("transform",o=>"translate("+C.centroid(o)+")").style("text-anchor","middle").attr("class","slice"),c.append("text").text(g.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const W=c.selectAll(".legend").data(A.domain()).enter().append("g").attr("class","legend").attr("transform",(o,D)=>{const k=n+s,V=k*A.domain().length/2,E=12*n,G=D*k-V;return"translate("+E+","+G+")"});W.append("rect").attr("width",n).attr("height",n).style("fill",A).style("stroke",A),W.data(y).append("text").attr("x",n+s).attr("y",n-s).text(o=>{const{label:D,value:k}=o.data;return g.getShowData()?`${D} [${k}]`:D});const P=Math.max(...W.selectAll("text").nodes().map(o=>(o==null?void 0:o.getBoundingClientRect().width)??0)),I=$+e+n+s+P;h.attr("viewBox",`0 0 ${I} ${u}`),tt(h,u,I,i.useMaxWidth)},"draw"),Tt={draw:bt},Rt={parser:yt,db:N,renderer:Tt,styles:wt};export{Rt as diagram};
