import{_ as e,l as o,I as i,j as n,K as p}from"../app.CdJErKdO.js";import{p as g}from"./radar-MK3ICKWK.BblX4l1i.js";import"./framework.DmzOcKGh.js";import"./dayjs.min.CLrInu3K.js";import"./theme.BQKsZujy.js";import"./transform.C03nMML5.js";import"./cubic.aydcEthT.js";var v={parse:e(async r=>{const a=await g("info",r);o.debug(a)},"parse")},d={version:p.version},m=e(()=>d.version,"getVersion"),c={getVersion:m},l=e((r,a,s)=>{o.debug(`rendering info diagram
`+r);const t=i(a);n(t,100,400,!0),t.append("g").append("text").attr("x",100).attr("y",40).attr("class","version").attr("font-size",32).style("text-anchor","middle").text(`v${s}`)},"draw"),f={draw:l},D={parser:v,db:c,renderer:f};export{D as diagram};
