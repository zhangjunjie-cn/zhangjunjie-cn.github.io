import{p as j}from"./chunk-4BMEZGHF.0SaXxzT2.js";import{M as y,am as U,D as Z,n as q,o as H,s as J,g as K,c as Q,b as X,_ as p,l as F,t as Y,d as tt,E as et,I as at,T as rt,j as nt}from"../app.QMiC8Lna.js";import{p as it}from"./radar-MK3ICKWK.CSg53jbI.js";import{t as z}from"./transform.C03nMML5.js";import{d as O}from"./arc.xsYrpOF1.js";import{o as st}from"./ordinal.BJp8kCrd.js";import"./framework.BpGEwK4L.js";import"./dayjs.min.DQ881aUd.js";import"./theme.DrOuqoe1.js";import"./cubic.aydcEthT.js";import"./init.Dmth1JHB.js";function ot(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function lt(t){return t}function ct(){var t=lt,a=ot,m=null,o=y(0),g=y(z),x=y(0);function i(e){var r,l=(e=U(e)).length,c,A,h=0,u=new Array(l),n=new Array(l),v=+o.apply(this,arguments),w=Math.min(z,Math.max(-z,g.apply(this,arguments)-v)),f,T=Math.min(Math.abs(w)/l,x.apply(this,arguments)),$=T*(w<0?-1:1),d;for(r=0;r<l;++r)(d=n[u[r]=r]=+t(e[r],r,e))>0&&(h+=d);for(a!=null?u.sort(function(S,D){return a(n[S],n[D])}):m!=null&&u.sort(function(S,D){return m(e[S],e[D])}),r=0,A=h?(w-l*$)/h:0;r<l;++r,v=f)c=u[r],d=n[c],f=v+(d>0?d*A:0)+$,n[c]={data:e[c],index:r,value:d,startAngle:v,endAngle:f,padAngle:T};return n}return i.value=function(e){return arguments.length?(t=typeof e=="function"?e:y(+e),i):t},i.sortValues=function(e){return arguments.length?(a=e,m=null,i):a},i.sort=function(e){return arguments.length?(m=e,a=null,i):m},i.startAngle=function(e){return arguments.length?(o=typeof e=="function"?e:y(+e),i):o},i.endAngle=function(e){return arguments.length?(g=typeof e=="function"?e:y(+e),i):g},i.padAngle=function(e){return arguments.length?(x=typeof e=="function"?e:y(+e),i):x},i}var P=Z.pie,G={sections:new Map,showData:!1,config:P},M=G.sections,W=G.showData,ut=structuredClone(P),pt=p(()=>structuredClone(ut),"getConfig"),gt=p(()=>{M=new Map,W=G.showData,Y()},"clear"),dt=p(({label:t,value:a})=>{M.has(t)||(M.set(t,a),F.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),ft=p(()=>M,"getSections"),mt=p(t=>{W=t},"setShowData"),ht=p(()=>W,"getShowData"),R={getConfig:pt,clear:gt,setDiagramTitle:q,getDiagramTitle:H,setAccTitle:J,getAccTitle:K,setAccDescription:Q,getAccDescription:X,addSection:dt,getSections:ft,setShowData:mt,getShowData:ht},vt=p((t,a)=>{j(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),St={parse:p(async t=>{const a=await it("pie",t);F.debug(a),vt(a,R)},"parse")},yt=p(t=>`
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
`,"getStyles"),xt=yt,At=p(t=>{const a=[...t.entries()].map(o=>({label:o[0],value:o[1]})).sort((o,g)=>g.value-o.value);return ct().value(o=>o.value)(a)},"createPieArcs"),wt=p((t,a,m,o)=>{F.debug(`rendering pie chart
`+t);const g=o.db,x=tt(),i=et(g.getConfig(),x.pie),e=40,r=18,l=4,c=450,A=c,h=at(a),u=h.append("g");u.attr("transform","translate("+A/2+","+c/2+")");const{themeVariables:n}=x;let[v]=rt(n.pieOuterStrokeWidth);v??(v=2);const w=i.textPosition,f=Math.min(A,c)/2-e,T=O().innerRadius(0).outerRadius(f),$=O().innerRadius(f*w).outerRadius(f*w);u.append("circle").attr("cx",0).attr("cy",0).attr("r",f+v/2).attr("class","pieOuterCircle");const d=g.getSections(),S=At(d),D=[n.pie1,n.pie2,n.pie3,n.pie4,n.pie5,n.pie6,n.pie7,n.pie8,n.pie9,n.pie10,n.pie11,n.pie12],C=st(D);u.selectAll("mySlices").data(S).enter().append("path").attr("d",T).attr("fill",s=>C(s.data.label)).attr("class","pieCircle");let I=0;d.forEach(s=>{I+=s}),u.selectAll("mySlices").data(S).enter().append("text").text(s=>(s.data.value/I*100).toFixed(0)+"%").attr("transform",s=>"translate("+$.centroid(s)+")").style("text-anchor","middle").attr("class","slice"),u.append("text").text(g.getDiagramTitle()).attr("x",0).attr("y",-(c-50)/2).attr("class","pieTitleText");const b=u.selectAll(".legend").data(C.domain()).enter().append("g").attr("class","legend").attr("transform",(s,E)=>{const k=r+l,_=k*C.domain().length/2,B=12*r,V=E*k-_;return"translate("+B+","+V+")"});b.append("rect").attr("width",r).attr("height",r).style("fill",C).style("stroke",C),b.data(S).append("text").attr("x",r+l).attr("y",r-l).text(s=>{const{label:E,value:k}=s.data;return g.getShowData()?`${E} [${k}]`:E});const L=Math.max(...b.selectAll("text").nodes().map(s=>(s==null?void 0:s.getBoundingClientRect().width)??0)),N=A+e+r+l+L;h.attr("viewBox",`0 0 ${N} ${c}`),nt(h,c,N,i.useMaxWidth)},"draw"),Dt={draw:wt},It={parser:St,db:R,renderer:Dt,styles:xt};export{It as diagram};
