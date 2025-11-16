import{i as P}from"./chunk-353BL4L5-BaBLD7R4-CCFpVaw8.CruvBM2z.js";import{S as n,a9 as B,aa as v,as as S,ar as W,ab as z,ac as F,aE as m,aW as E,ae as T,ax as D,aF as A,aG as I,u as x}from"./theme.BUm-IbPM.js";import{I as R}from"./treemap-75Q7IDZK-Du2UP5aq-Bh4ITUZl.BOKPfxsi.js";import"./framework.UOXOyoov.js";import"./baseUniq-D-4w9BQh-CXDlGfTI.KKkXwjQF.js";import"./basePickBy-DRTm9oBc-BeRiPSDA.CqA2mwn3.js";import"./clone-pm6OfDjU-WrCLsCa7.DmAx_R5R.js";var $={packet:[]},w=structuredClone($),L=I.packet,Y=n(()=>{const t=m({...L,...A().packet});return t.showBits&&(t.paddingY+=10),t},"getConfig"),G=n(()=>w.packet,"getPacket"),H=n(t=>{t.length>0&&w.packet.push(t)},"pushWord"),J=n(()=>{D(),w=structuredClone($)},"clear"),u={pushWord:H,getPacket:G,getConfig:Y,clear:J,setAccTitle:F,getAccTitle:z,setDiagramTitle:W,getDiagramTitle:S,getAccDescription:v,setAccDescription:B},M=1e4,N=n(t=>{P(t,u);let e=-1,o=[],i=1;const{bitsPerRow:s}=u.getConfig();for(let{start:a,end:r,bits:c,label:k}of t.blocks){if(a!==void 0&&r!==void 0&&r<a)throw new Error(`Packet block ${a} - ${r} is invalid. End must be greater than start.`);if(a??(a=e+1),a!==e+1)throw new Error(`Packet block ${a} - ${r??a} is not contiguous. It should start from ${e+1}.`);if(c===0)throw new Error(`Packet block ${a} is invalid. Cannot have a zero bit field.`);for(r??(r=a+(c??1)-1),c??(c=r-a+1),e=r,x.debug(`Packet block ${a} - ${e} with label ${k}`);o.length<=s+1&&u.getPacket().length<M;){const[d,b]=U({start:a,end:r,bits:c,label:k},i,s);if(o.push(d),d.end+1===i*s&&(u.pushWord(o),o=[],i++),!b)break;({start:a,end:r,bits:c,label:k}=b)}}u.pushWord(o)},"populate"),U=n((t,e,o)=>{if(t.start===void 0)throw new Error("start should have been set during first phase");if(t.end===void 0)throw new Error("end should have been set during first phase");if(t.start>t.end)throw new Error(`Block start ${t.start} is greater than block end ${t.end}.`);if(t.end+1<=e*o)return[t,void 0];const i=e*o-1,s=e*o;return[{start:t.start,end:i,label:t.label,bits:i-t.start},{start:s,end:t.end,label:t.label,bits:t.end-s}]},"getNextFittingBlock"),X={parse:n(async t=>{const e=await R("packet",t);x.debug(e),N(e)},"parse")},j=n((t,e,o,i)=>{const s=i.db,a=s.getConfig(),{rowHeight:r,paddingY:c,bitWidth:k,bitsPerRow:d}=a,b=s.getPacket(),l=s.getDiagramTitle(),h=r+c,p=h*(b.length+1)-(l?0:r),g=k*d+2,f=E(e);f.attr("viewbox",`0 0 ${g} ${p}`),T(f,p,g,a.useMaxWidth);for(const[y,C]of b.entries())q(f,C,y,a);f.append("text").text(l).attr("x",g/2).attr("y",p-h/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),q=n((t,e,o,{rowHeight:i,paddingX:s,paddingY:a,bitWidth:r,bitsPerRow:c,showBits:k})=>{const d=t.append("g"),b=o*(i+a)+a;for(const l of e){const h=l.start%c*r+1,p=(l.end-l.start+1)*r-s;if(d.append("rect").attr("x",h).attr("y",b).attr("width",p).attr("height",i).attr("class","packetBlock"),d.append("text").attr("x",h+p/2).attr("y",b+i/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(l.label),!k)continue;const g=l.end===l.start,f=b-2;d.append("text").attr("x",h+(g?p/2:0)).attr("y",f).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",g?"middle":"start").text(l.start),g||d.append("text").attr("x",h+p).attr("y",f).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(l.end)}},"drawWord"),K={draw:j},Q={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},V=n(({packet:t}={})=>{const e=m(Q,t);return`
	.packetByte {
		font-size: ${e.byteFontSize};
	}
	.packetByte.start {
		fill: ${e.startByteColor};
	}
	.packetByte.end {
		fill: ${e.endByteColor};
	}
	.packetLabel {
		fill: ${e.labelColor};
		font-size: ${e.labelFontSize};
	}
	.packetTitle {
		fill: ${e.titleColor};
		font-size: ${e.titleFontSize};
	}
	.packetBlock {
		stroke: ${e.blockStrokeColor};
		stroke-width: ${e.blockStrokeWidth};
		fill: ${e.blockFillColor};
	}
	`},"styles"),ot={parser:X,db:u,renderer:K,styles:V};export{ot as diagram};
