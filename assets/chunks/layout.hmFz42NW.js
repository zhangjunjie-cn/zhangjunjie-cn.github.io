import{G as y}from"./graph.Dimp_OJU.js";import{q as P,m as w,d as f,s as x,c as ke,t as q,e as b,w as L,x as oe,y as g,z as $,A as xe,B as W,f as R,v as E,r as S,C as Ee,D as _,E as C,F as T,G as Ne,H as Y,I as j,J as Oe,K as Le,L as Ie}from"./theme.BQKsZujy.js";class Pe{constructor(){var n={};n._next=n._prev=n,this._sentinel=n}dequeue(){var n=this._sentinel,r=n._prev;if(r!==n)return J(r),r}enqueue(n){var r=this._sentinel;n._prev&&n._next&&J(n),n._next=r._next,r._next._prev=n,r._next=n,n._prev=r}toString(){for(var n=[],r=this._sentinel,t=r._prev;t!==r;)n.push(JSON.stringify(t,Re)),t=t._prev;return"["+n.join(", ")+"]"}}function J(e){e._prev._next=e._next,e._next._prev=e._prev,delete e._next,delete e._prev}function Re(e,n){if(e!=="_next"&&e!=="_prev")return n}var _e=ke(1);function Ce(e,n){if(e.nodeCount()<=1)return[];var r=Se(e,n||_e),t=Te(r.graph,r.buckets,r.zeroIdx);return P(w(t,function(a){return e.outEdges(a.v,a.w)}))}function Te(e,n,r){for(var t=[],a=n[n.length-1],o=n[0],i;e.nodeCount();){for(;i=o.dequeue();)F(e,n,r,i);for(;i=a.dequeue();)F(e,n,r,i);if(e.nodeCount()){for(var d=n.length-2;d>0;--d)if(i=n[d].dequeue(),i){t=t.concat(F(e,n,r,i,!0));break}}}return t}function F(e,n,r,t,a){var o=a?[]:void 0;return f(e.inEdges(t.v),function(i){var d=e.edge(i),u=e.node(i.v);a&&o.push({v:i.v,w:i.w}),u.out-=d,G(n,r,u)}),f(e.outEdges(t.v),function(i){var d=e.edge(i),u=i.w,s=e.node(u);s.in-=d,G(n,r,s)}),e.removeNode(t.v),o}function Se(e,n){var r=new y,t=0,a=0;f(e.nodes(),function(d){r.setNode(d,{v:d,in:0,out:0})}),f(e.edges(),function(d){var u=r.edge(d.v,d.w)||0,s=n(d),c=u+s;r.setEdge(d.v,d.w,c),a=Math.max(a,r.node(d.v).out+=s),t=Math.max(t,r.node(d.w).in+=s)});var o=x(a+t+3).map(function(){return new Pe}),i=t+1;return f(r.nodes(),function(d){G(o,i,r.node(d))}),{graph:r,buckets:o,zeroIdx:i}}function G(e,n,r){r.out?r.in?e[r.out-r.in+n].enqueue(r):e[e.length-1].enqueue(r):e[0].enqueue(r)}function je(e){var n=e.graph().acyclicer==="greedy"?Ce(e,r(e)):Me(e);f(n,function(t){var a=e.edge(t);e.removeEdge(t),a.forwardName=t.name,a.reversed=!0,e.setEdge(t.w,t.v,a,q("rev"))});function r(t){return function(a){return t.edge(a).weight}}}function Me(e){var n=[],r={},t={};function a(o){Object.prototype.hasOwnProperty.call(t,o)||(t[o]=!0,r[o]=!0,f(e.outEdges(o),function(i){Object.prototype.hasOwnProperty.call(r,i.w)?n.push(i):a(i.w)}),delete r[o])}return f(e.nodes(),a),n}function Fe(e){f(e.edges(),function(n){var r=e.edge(n);if(r.reversed){e.removeEdge(n);var t=r.forwardName;delete r.reversed,delete r.forwardName,e.setEdge(n.w,n.v,r,t)}})}function N(e,n,r,t){var a;do a=q(t);while(e.hasNode(a));return r.dummy=n,e.setNode(a,r),a}function Ve(e){var n=new y().setGraph(e.graph());return f(e.nodes(),function(r){n.setNode(r,e.node(r))}),f(e.edges(),function(r){var t=n.edge(r.v,r.w)||{weight:0,minlen:1},a=e.edge(r);n.setEdge(r.v,r.w,{weight:t.weight+a.weight,minlen:Math.max(t.minlen,a.minlen)})}),n}function de(e){var n=new y({multigraph:e.isMultigraph()}).setGraph(e.graph());return f(e.nodes(),function(r){e.children(r).length||n.setNode(r,e.node(r))}),f(e.edges(),function(r){n.setEdge(r,e.edge(r))}),n}function K(e,n){var r=e.x,t=e.y,a=n.x-r,o=n.y-t,i=e.width/2,d=e.height/2;if(!a&&!o)throw new Error("Not possible to find intersection inside of the rectangle");var u,s;return Math.abs(o)*i>Math.abs(a)*d?(o<0&&(d=-d),u=d*a/o,s=d):(a<0&&(i=-i),u=i,s=i*o/a),{x:r+u,y:t+s}}function M(e){var n=w(x(ue(e)+1),function(){return[]});return f(e.nodes(),function(r){var t=e.node(r),a=t.rank;b(a)||(n[a][t.order]=r)}),n}function Be(e){var n=L(w(e.nodes(),function(r){return e.node(r).rank}));f(e.nodes(),function(r){var t=e.node(r);oe(t,"rank")&&(t.rank-=n)})}function Ae(e){var n=L(w(e.nodes(),function(o){return e.node(o).rank})),r=[];f(e.nodes(),function(o){var i=e.node(o).rank-n;r[i]||(r[i]=[]),r[i].push(o)});var t=0,a=e.graph().nodeRankFactor;f(r,function(o,i){b(o)&&i%a!==0?--t:t&&f(o,function(d){e.node(d).rank+=t})})}function Q(e,n,r,t){var a={width:0,height:0};return arguments.length>=4&&(a.rank=r,a.order=t),N(e,"border",a,n)}function ue(e){return g(w(e.nodes(),function(n){var r=e.node(n).rank;if(!b(r))return r}))}function De(e,n){var r={lhs:[],rhs:[]};return f(e,function(t){n(t)?r.lhs.push(t):r.rhs.push(t)}),r}function Ye(e,n){return n()}function Ge(e){function n(r){var t=e.children(r),a=e.node(r);if(t.length&&f(t,n),Object.prototype.hasOwnProperty.call(a,"minRank")){a.borderLeft=[],a.borderRight=[];for(var o=a.minRank,i=a.maxRank+1;o<i;++o)Z(e,"borderLeft","_bl",r,a,o),Z(e,"borderRight","_br",r,a,o)}}f(e.children(),n)}function Z(e,n,r,t,a,o){var i={width:0,height:0,rank:o,borderType:n},d=a[n][o-1],u=N(e,"border",i,r);a[n][o]=u,e.setParent(u,t),d&&e.setEdge(d,u,{weight:1})}function qe(e){var n=e.graph().rankdir.toLowerCase();(n==="lr"||n==="rl")&&se(e)}function $e(e){var n=e.graph().rankdir.toLowerCase();(n==="bt"||n==="rl")&&We(e),(n==="lr"||n==="rl")&&(ze(e),se(e))}function se(e){f(e.nodes(),function(n){ee(e.node(n))}),f(e.edges(),function(n){ee(e.edge(n))})}function ee(e){var n=e.width;e.width=e.height,e.height=n}function We(e){f(e.nodes(),function(n){V(e.node(n))}),f(e.edges(),function(n){var r=e.edge(n);f(r.points,V),Object.prototype.hasOwnProperty.call(r,"y")&&V(r)})}function V(e){e.y=-e.y}function ze(e){f(e.nodes(),function(n){B(e.node(n))}),f(e.edges(),function(n){var r=e.edge(n);f(r.points,B),Object.prototype.hasOwnProperty.call(r,"x")&&B(r)})}function B(e){var n=e.x;e.x=e.y,e.y=n}function Xe(e){e.graph().dummyChains=[],f(e.edges(),function(n){He(e,n)})}function He(e,n){var r=n.v,t=e.node(r).rank,a=n.w,o=e.node(a).rank,i=n.name,d=e.edge(n),u=d.labelRank;if(o!==t+1){e.removeEdge(n);var s=void 0,c,l;for(l=0,++t;t<o;++l,++t)d.points=[],s={width:0,height:0,edgeLabel:d,edgeObj:n,rank:t},c=N(e,"edge",s,"_d"),t===u&&(s.width=d.width,s.height=d.height,s.dummy="edge-label",s.labelpos=d.labelpos),e.setEdge(r,c,{weight:d.weight},i),l===0&&e.graph().dummyChains.push(c),r=c;e.setEdge(r,a,{weight:d.weight},i)}}function Ue(e){f(e.graph().dummyChains,function(n){var r=e.node(n),t=r.edgeLabel,a;for(e.setEdge(r.edgeObj,t);r.dummy;)a=e.successors(n)[0],e.removeNode(n),t.points.push({x:r.x,y:r.y}),r.dummy==="edge-label"&&(t.x=r.x,t.y=r.y,t.width=r.width,t.height=r.height),n=a,r=e.node(n)})}function z(e){var n={};function r(t){var a=e.node(t);if(Object.prototype.hasOwnProperty.call(n,t))return a.rank;n[t]=!0;var o=L(w(e.outEdges(t),function(i){return r(i.w)-e.edge(i).minlen}));return(o===Number.POSITIVE_INFINITY||o===void 0||o===null)&&(o=0),a.rank=o}f(e.sources(),r)}function I(e,n){return e.node(n.w).rank-e.node(n.v).rank-e.edge(n).minlen}function fe(e){var n=new y({directed:!1}),r=e.nodes()[0],t=e.nodeCount();n.setNode(r,{});for(var a,o;Je(n,e)<t;)a=Ke(n,e),o=n.hasNode(a.v)?I(e,a):-I(e,a),Qe(n,e,o);return n}function Je(e,n){function r(t){f(n.nodeEdges(t),function(a){var o=a.v,i=t===o?a.w:o;!e.hasNode(i)&&!I(n,a)&&(e.setNode(i,{}),e.setEdge(t,i,{}),r(i))})}return f(e.nodes(),r),e.nodeCount()}function Ke(e,n){return $(n.edges(),function(r){if(e.hasNode(r.v)!==e.hasNode(r.w))return I(n,r)})}function Qe(e,n,r){f(e.nodes(),function(t){n.node(t).rank+=r})}function Ze(){}Ze.prototype=new Error;function ce(e,n,r){xe(n)||(n=[n]);var t=(e.isDirected()?e.successors:e.neighbors).bind(e),a=[],o={};return f(n,function(i){if(!e.hasNode(i))throw new Error("Graph does not have node: "+i);le(e,i,r==="post",o,t,a)}),a}function le(e,n,r,t,a,o){Object.prototype.hasOwnProperty.call(t,n)||(t[n]=!0,r||o.push(n),f(a(n),function(i){le(e,i,r,t,a,o)}),r&&o.push(n))}function en(e,n){return ce(e,n,"post")}function nn(e,n){return ce(e,n,"pre")}k.initLowLimValues=H;k.initCutValues=X;k.calcCutValue=he;k.leaveEdge=pe;k.enterEdge=we;k.exchangeEdges=me;function k(e){e=Ve(e),z(e);var n=fe(e);H(n),X(n,e);for(var r,t;r=pe(n);)t=we(n,e,r),me(n,e,r,t)}function X(e,n){var r=en(e,e.nodes());r=r.slice(0,r.length-1),f(r,function(t){rn(e,n,t)})}function rn(e,n,r){var t=e.node(r),a=t.parent;e.edge(r,a).cutvalue=he(e,n,r)}function he(e,n,r){var t=e.node(r),a=t.parent,o=!0,i=n.edge(r,a),d=0;return i||(o=!1,i=n.edge(a,r)),d=i.weight,f(n.nodeEdges(r),function(u){var s=u.v===r,c=s?u.w:u.v;if(c!==a){var l=s===o,h=n.edge(u).weight;if(d+=l?h:-h,an(e,r,c)){var v=e.edge(r,c).cutvalue;d+=l?-v:v}}}),d}function H(e,n){arguments.length<2&&(n=e.nodes()[0]),ve(e,{},1,n)}function ve(e,n,r,t,a){var o=r,i=e.node(t);return n[t]=!0,f(e.neighbors(t),function(d){Object.prototype.hasOwnProperty.call(n,d)||(r=ve(e,n,r,d,t))}),i.low=o,i.lim=r++,a?i.parent=a:delete i.parent,r}function pe(e){return W(e.edges(),function(n){return e.edge(n).cutvalue<0})}function we(e,n,r){var t=r.v,a=r.w;n.hasEdge(t,a)||(t=r.w,a=r.v);var o=e.node(t),i=e.node(a),d=o,u=!1;o.lim>i.lim&&(d=i,u=!0);var s=R(n.edges(),function(c){return u===ne(e,e.node(c.v),d)&&u!==ne(e,e.node(c.w),d)});return $(s,function(c){return I(n,c)})}function me(e,n,r,t){var a=r.v,o=r.w;e.removeEdge(a,o),e.setEdge(t.v,t.w,{}),H(e),X(e,n),tn(e,n)}function tn(e,n){var r=W(e.nodes(),function(a){return!n.node(a).parent}),t=nn(e,r);t=t.slice(1),f(t,function(a){var o=e.node(a).parent,i=n.edge(a,o),d=!1;i||(i=n.edge(o,a),d=!0),n.node(a).rank=n.node(o).rank+(d?i.minlen:-i.minlen)})}function an(e,n,r){return e.hasEdge(n,r)}function ne(e,n,r){return r.low<=n.lim&&n.lim<=r.lim}function on(e){switch(e.graph().ranker){case"network-simplex":re(e);break;case"tight-tree":un(e);break;case"longest-path":dn(e);break;default:re(e)}}var dn=z;function un(e){z(e),fe(e)}function re(e){k(e)}function sn(e){var n=N(e,"root",{},"_root"),r=fn(e),t=g(E(r))-1,a=2*t+1;e.graph().nestingRoot=n,f(e.edges(),function(i){e.edge(i).minlen*=a});var o=cn(e)+1;f(e.children(),function(i){be(e,n,a,o,t,r,i)}),e.graph().nodeRankFactor=a}function be(e,n,r,t,a,o,i){var d=e.children(i);if(!d.length){i!==n&&e.setEdge(n,i,{weight:0,minlen:r});return}var u=Q(e,"_bt"),s=Q(e,"_bb"),c=e.node(i);e.setParent(u,i),c.borderTop=u,e.setParent(s,i),c.borderBottom=s,f(d,function(l){be(e,n,r,t,a,o,l);var h=e.node(l),v=h.borderTop?h.borderTop:l,p=h.borderBottom?h.borderBottom:l,m=h.borderTop?t:2*t,O=v!==p?1:a-o[i]+1;e.setEdge(u,v,{weight:m,minlen:O,nestingEdge:!0}),e.setEdge(p,s,{weight:m,minlen:O,nestingEdge:!0})}),e.parent(i)||e.setEdge(n,u,{weight:0,minlen:a+o[i]})}function fn(e){var n={};function r(t,a){var o=e.children(t);o&&o.length&&f(o,function(i){r(i,a+1)}),n[t]=a}return f(e.children(),function(t){r(t,1)}),n}function cn(e){return S(e.edges(),function(n,r){return n+e.edge(r).weight},0)}function ln(e){var n=e.graph();e.removeNode(n.nestingRoot),delete n.nestingRoot,f(e.edges(),function(r){var t=e.edge(r);t.nestingEdge&&e.removeEdge(r)})}function hn(e,n,r){var t={},a;f(r,function(o){for(var i=e.parent(o),d,u;i;){if(d=e.parent(i),d?(u=t[d],t[d]=i):(u=a,a=i),u&&u!==i){n.setEdge(u,i);return}i=d}})}function vn(e,n,r){var t=pn(e),a=new y({compound:!0}).setGraph({root:t}).setDefaultNodeLabel(function(o){return e.node(o)});return f(e.nodes(),function(o){var i=e.node(o),d=e.parent(o);(i.rank===n||i.minRank<=n&&n<=i.maxRank)&&(a.setNode(o),a.setParent(o,d||t),f(e[r](o),function(u){var s=u.v===o?u.w:u.v,c=a.edge(s,o),l=b(c)?0:c.weight;a.setEdge(s,o,{weight:e.edge(u).weight+l})}),Object.prototype.hasOwnProperty.call(i,"minRank")&&a.setNode(o,{borderLeft:i.borderLeft[n],borderRight:i.borderRight[n]}))}),a}function pn(e){for(var n;e.hasNode(n=q("_root")););return n}function wn(e,n){for(var r=0,t=1;t<n.length;++t)r+=mn(e,n[t-1],n[t]);return r}function mn(e,n,r){for(var t=Ee(r,w(r,function(s,c){return c})),a=P(w(n,function(s){return _(w(e.outEdges(s),function(c){return{pos:t[c.w],weight:e.edge(c).weight}}),"pos")})),o=1;o<r.length;)o<<=1;var i=2*o-1;o-=1;var d=w(new Array(i),function(){return 0}),u=0;return f(a.forEach(function(s){var c=s.pos+o;d[c]+=s.weight;for(var l=0;c>0;)c%2&&(l+=d[c+1]),c=c-1>>1,d[c]+=s.weight;u+=s.weight*l})),u}function bn(e){var n={},r=R(e.nodes(),function(d){return!e.children(d).length}),t=g(w(r,function(d){return e.node(d).rank})),a=w(x(t+1),function(){return[]});function o(d){if(!oe(n,d)){n[d]=!0;var u=e.node(d);a[u.rank].push(d),f(e.successors(d),o)}}var i=_(r,function(d){return e.node(d).rank});return f(i,o),a}function yn(e,n){return w(n,function(r){var t=e.inEdges(r);if(t.length){var a=S(t,function(o,i){var d=e.edge(i),u=e.node(i.v);return{sum:o.sum+d.weight*u.order,weight:o.weight+d.weight}},{sum:0,weight:0});return{v:r,barycenter:a.sum/a.weight,weight:a.weight}}else return{v:r}})}function gn(e,n){var r={};f(e,function(a,o){var i=r[a.v]={indegree:0,in:[],out:[],vs:[a.v],i:o};b(a.barycenter)||(i.barycenter=a.barycenter,i.weight=a.weight)}),f(n.edges(),function(a){var o=r[a.v],i=r[a.w];!b(o)&&!b(i)&&(i.indegree++,o.out.push(r[a.w]))});var t=R(r,function(a){return!a.indegree});return kn(t)}function kn(e){var n=[];function r(o){return function(i){i.merged||(b(i.barycenter)||b(o.barycenter)||i.barycenter>=o.barycenter)&&xn(o,i)}}function t(o){return function(i){i.in.push(o),--i.indegree===0&&e.push(i)}}for(;e.length;){var a=e.pop();n.push(a),f(a.in.reverse(),r(a)),f(a.out,t(a))}return w(R(n,function(o){return!o.merged}),function(o){return C(o,["vs","i","barycenter","weight"])})}function xn(e,n){var r=0,t=0;e.weight&&(r+=e.barycenter*e.weight,t+=e.weight),n.weight&&(r+=n.barycenter*n.weight,t+=n.weight),e.vs=n.vs.concat(e.vs),e.barycenter=r/t,e.weight=t,e.i=Math.min(n.i,e.i),n.merged=!0}function En(e,n){var r=De(e,function(c){return Object.prototype.hasOwnProperty.call(c,"barycenter")}),t=r.lhs,a=_(r.rhs,function(c){return-c.i}),o=[],i=0,d=0,u=0;t.sort(Nn(!!n)),u=te(o,a,u),f(t,function(c){u+=c.vs.length,o.push(c.vs),i+=c.barycenter*c.weight,d+=c.weight,u=te(o,a,u)});var s={vs:P(o)};return d&&(s.barycenter=i/d,s.weight=d),s}function te(e,n,r){for(var t;n.length&&(t=T(n)).i<=r;)n.pop(),e.push(t.vs),r++;return r}function Nn(e){return function(n,r){return n.barycenter<r.barycenter?-1:n.barycenter>r.barycenter?1:e?r.i-n.i:n.i-r.i}}function ye(e,n,r,t){var a=e.children(n),o=e.node(n),i=o?o.borderLeft:void 0,d=o?o.borderRight:void 0,u={};i&&(a=R(a,function(p){return p!==i&&p!==d}));var s=yn(e,a);f(s,function(p){if(e.children(p.v).length){var m=ye(e,p.v,r,t);u[p.v]=m,Object.prototype.hasOwnProperty.call(m,"barycenter")&&Ln(p,m)}});var c=gn(s,r);On(c,u);var l=En(c,t);if(i&&(l.vs=P([i,l.vs,d]),e.predecessors(i).length)){var h=e.node(e.predecessors(i)[0]),v=e.node(e.predecessors(d)[0]);Object.prototype.hasOwnProperty.call(l,"barycenter")||(l.barycenter=0,l.weight=0),l.barycenter=(l.barycenter*l.weight+h.order+v.order)/(l.weight+2),l.weight+=2}return l}function On(e,n){f(e,function(r){r.vs=P(r.vs.map(function(t){return n[t]?n[t].vs:t}))})}function Ln(e,n){b(e.barycenter)?(e.barycenter=n.barycenter,e.weight=n.weight):(e.barycenter=(e.barycenter*e.weight+n.barycenter*n.weight)/(e.weight+n.weight),e.weight+=n.weight)}function In(e){var n=ue(e),r=ae(e,x(1,n+1),"inEdges"),t=ae(e,x(n-1,-1,-1),"outEdges"),a=bn(e);ie(e,a);for(var o=Number.POSITIVE_INFINITY,i,d=0,u=0;u<4;++d,++u){Pn(d%2?r:t,d%4>=2),a=M(e);var s=wn(e,a);s<o&&(u=0,i=Ne(a),o=s)}ie(e,i)}function ae(e,n,r){return w(n,function(t){return vn(e,t,r)})}function Pn(e,n){var r=new y;f(e,function(t){var a=t.graph().root,o=ye(t,a,r,n);f(o.vs,function(i,d){t.node(i).order=d}),hn(t,r,o.vs)})}function ie(e,n){f(n,function(r){f(r,function(t,a){e.node(t).order=a})})}function Rn(e){var n=Cn(e);f(e.graph().dummyChains,function(r){for(var t=e.node(r),a=t.edgeObj,o=_n(e,n,a.v,a.w),i=o.path,d=o.lca,u=0,s=i[u],c=!0;r!==a.w;){if(t=e.node(r),c){for(;(s=i[u])!==d&&e.node(s).maxRank<t.rank;)u++;s===d&&(c=!1)}if(!c){for(;u<i.length-1&&e.node(s=i[u+1]).minRank<=t.rank;)u++;s=i[u]}e.setParent(r,s),r=e.successors(r)[0]}})}function _n(e,n,r,t){var a=[],o=[],i=Math.min(n[r].low,n[t].low),d=Math.max(n[r].lim,n[t].lim),u,s;u=r;do u=e.parent(u),a.push(u);while(u&&(n[u].low>i||d>n[u].lim));for(s=u,u=t;(u=e.parent(u))!==s;)o.push(u);return{path:a.concat(o.reverse()),lca:s}}function Cn(e){var n={},r=0;function t(a){var o=r;f(e.children(a),t),n[a]={low:o,lim:r++}}return f(e.children(),t),n}function Tn(e,n){var r={};function t(a,o){var i=0,d=0,u=a.length,s=T(o);return f(o,function(c,l){var h=jn(e,c),v=h?e.node(h).order:u;(h||c===s)&&(f(o.slice(d,l+1),function(p){f(e.predecessors(p),function(m){var O=e.node(m),U=O.order;(U<i||v<U)&&!(O.dummy&&e.node(p).dummy)&&ge(r,m,p)})}),d=l+1,i=v)}),o}return S(n,t),r}function Sn(e,n){var r={};function t(o,i,d,u,s){var c;f(x(i,d),function(l){c=o[l],e.node(c).dummy&&f(e.predecessors(c),function(h){var v=e.node(h);v.dummy&&(v.order<u||v.order>s)&&ge(r,h,c)})})}function a(o,i){var d=-1,u,s=0;return f(i,function(c,l){if(e.node(c).dummy==="border"){var h=e.predecessors(c);h.length&&(u=e.node(h[0]).order,t(i,s,l,d,u),s=l,d=u)}t(i,s,i.length,u,o.length)}),i}return S(n,a),r}function jn(e,n){if(e.node(n).dummy)return W(e.predecessors(n),function(r){return e.node(r).dummy})}function ge(e,n,r){if(n>r){var t=n;n=r,r=t}var a=e[n];a||(e[n]=a={}),a[r]=!0}function Mn(e,n,r){if(n>r){var t=n;n=r,r=t}return!!e[n]&&Object.prototype.hasOwnProperty.call(e[n],r)}function Fn(e,n,r,t){var a={},o={},i={};return f(n,function(d){f(d,function(u,s){a[u]=u,o[u]=u,i[u]=s})}),f(n,function(d){var u=-1;f(d,function(s){var c=t(s);if(c.length){c=_(c,function(m){return i[m]});for(var l=(c.length-1)/2,h=Math.floor(l),v=Math.ceil(l);h<=v;++h){var p=c[h];o[s]===s&&u<i[p]&&!Mn(r,s,p)&&(o[p]=s,o[s]=a[s]=a[p],u=i[p])}}})}),{root:a,align:o}}function Vn(e,n,r,t,a){var o={},i=Bn(e,n,r,a),d=a?"borderLeft":"borderRight";function u(l,h){for(var v=i.nodes(),p=v.pop(),m={};p;)m[p]?l(p):(m[p]=!0,v.push(p),v=v.concat(h(p))),p=v.pop()}function s(l){o[l]=i.inEdges(l).reduce(function(h,v){return Math.max(h,o[v.v]+i.edge(v))},0)}function c(l){var h=i.outEdges(l).reduce(function(p,m){return Math.min(p,o[m.w]-i.edge(m))},Number.POSITIVE_INFINITY),v=e.node(l);h!==Number.POSITIVE_INFINITY&&v.borderType!==d&&(o[l]=Math.max(o[l],h))}return u(s,i.predecessors.bind(i)),u(c,i.successors.bind(i)),f(t,function(l){o[l]=o[r[l]]}),o}function Bn(e,n,r,t){var a=new y,o=e.graph(),i=qn(o.nodesep,o.edgesep,t);return f(n,function(d){var u;f(d,function(s){var c=r[s];if(a.setNode(c),u){var l=r[u],h=a.edge(l,c);a.setEdge(l,c,Math.max(i(e,s,u),h||0))}u=s})}),a}function An(e,n){return $(E(n),function(r){var t=Number.NEGATIVE_INFINITY,a=Number.POSITIVE_INFINITY;return Oe(r,function(o,i){var d=$n(e,i)/2;t=Math.max(o+d,t),a=Math.min(o-d,a)}),t-a})}function Dn(e,n){var r=E(n),t=L(r),a=g(r);f(["u","d"],function(o){f(["l","r"],function(i){var d=o+i,u=e[d],s;if(u!==n){var c=E(u);s=i==="l"?t-L(c):a-g(c),s&&(e[d]=j(u,function(l){return l+s}))}})})}function Yn(e,n){return j(e.ul,function(r,t){if(n)return e[n.toLowerCase()][t];var a=_(w(e,t));return(a[1]+a[2])/2})}function Gn(e){var n=M(e),r=Y(Tn(e,n),Sn(e,n)),t={},a;f(["u","d"],function(i){a=i==="u"?n:E(n).reverse(),f(["l","r"],function(d){d==="r"&&(a=w(a,function(l){return E(l).reverse()}));var u=(i==="u"?e.predecessors:e.successors).bind(e),s=Fn(e,a,r,u),c=Vn(e,a,s.root,s.align,d==="r");d==="r"&&(c=j(c,function(l){return-l})),t[i+d]=c})});var o=An(e,t);return Dn(t,o),Yn(t,e.graph().align)}function qn(e,n,r){return function(t,a,o){var i=t.node(a),d=t.node(o),u=0,s;if(u+=i.width/2,Object.prototype.hasOwnProperty.call(i,"labelpos"))switch(i.labelpos.toLowerCase()){case"l":s=-i.width/2;break;case"r":s=i.width/2;break}if(s&&(u+=r?s:-s),s=0,u+=(i.dummy?n:e)/2,u+=(d.dummy?n:e)/2,u+=d.width/2,Object.prototype.hasOwnProperty.call(d,"labelpos"))switch(d.labelpos.toLowerCase()){case"l":s=d.width/2;break;case"r":s=-d.width/2;break}return s&&(u+=r?s:-s),s=0,u}}function $n(e,n){return e.node(n).width}function Wn(e){e=de(e),zn(e),Le(Gn(e),function(n,r){e.node(r).x=n})}function zn(e){var n=M(e),r=e.graph().ranksep,t=0;f(n,function(a){var o=g(w(a,function(i){return e.node(i).height}));f(a,function(i){e.node(i).y=t+o/2}),t+=o+r})}function br(e,n){var r=Ye;r("layout",()=>{var t=r("  buildLayoutGraph",()=>tr(e));r("  runLayout",()=>Xn(t,r)),r("  updateInputGraph",()=>Hn(e,t))})}function Xn(e,n){n("    makeSpaceForEdgeLabels",()=>ar(e)),n("    removeSelfEdges",()=>hr(e)),n("    acyclic",()=>je(e)),n("    nestingGraph.run",()=>sn(e)),n("    rank",()=>on(de(e))),n("    injectEdgeLabelProxies",()=>ir(e)),n("    removeEmptyRanks",()=>Ae(e)),n("    nestingGraph.cleanup",()=>ln(e)),n("    normalizeRanks",()=>Be(e)),n("    assignRankMinMax",()=>or(e)),n("    removeEdgeLabelProxies",()=>dr(e)),n("    normalize.run",()=>Xe(e)),n("    parentDummyChains",()=>Rn(e)),n("    addBorderSegments",()=>Ge(e)),n("    order",()=>In(e)),n("    insertSelfEdges",()=>vr(e)),n("    adjustCoordinateSystem",()=>qe(e)),n("    position",()=>Wn(e)),n("    positionSelfEdges",()=>pr(e)),n("    removeBorderNodes",()=>lr(e)),n("    normalize.undo",()=>Ue(e)),n("    fixupEdgeLabelCoords",()=>fr(e)),n("    undoCoordinateSystem",()=>$e(e)),n("    translateGraph",()=>ur(e)),n("    assignNodeIntersects",()=>sr(e)),n("    reversePoints",()=>cr(e)),n("    acyclic.undo",()=>Fe(e))}function Hn(e,n){f(e.nodes(),function(r){var t=e.node(r),a=n.node(r);t&&(t.x=a.x,t.y=a.y,n.children(r).length&&(t.width=a.width,t.height=a.height))}),f(e.edges(),function(r){var t=e.edge(r),a=n.edge(r);t.points=a.points,Object.prototype.hasOwnProperty.call(a,"x")&&(t.x=a.x,t.y=a.y)}),e.graph().width=n.graph().width,e.graph().height=n.graph().height}var Un=["nodesep","edgesep","ranksep","marginx","marginy"],Jn={ranksep:50,edgesep:20,nodesep:50,rankdir:"tb"},Kn=["acyclicer","ranker","rankdir","align"],Qn=["width","height"],Zn={width:0,height:0},er=["minlen","weight","width","height","labeloffset"],nr={minlen:1,weight:1,width:0,height:0,labeloffset:10,labelpos:"r"},rr=["labelpos"];function tr(e){var n=new y({multigraph:!0,compound:!0}),r=D(e.graph());return n.setGraph(Y({},Jn,A(r,Un),C(r,Kn))),f(e.nodes(),function(t){var a=D(e.node(t));n.setNode(t,Ie(A(a,Qn),Zn)),n.setParent(t,e.parent(t))}),f(e.edges(),function(t){var a=D(e.edge(t));n.setEdge(t,Y({},nr,A(a,er),C(a,rr)))}),n}function ar(e){var n=e.graph();n.ranksep/=2,f(e.edges(),function(r){var t=e.edge(r);t.minlen*=2,t.labelpos.toLowerCase()!=="c"&&(n.rankdir==="TB"||n.rankdir==="BT"?t.width+=t.labeloffset:t.height+=t.labeloffset)})}function ir(e){f(e.edges(),function(n){var r=e.edge(n);if(r.width&&r.height){var t=e.node(n.v),a=e.node(n.w),o={rank:(a.rank-t.rank)/2+t.rank,e:n};N(e,"edge-proxy",o,"_ep")}})}function or(e){var n=0;f(e.nodes(),function(r){var t=e.node(r);t.borderTop&&(t.minRank=e.node(t.borderTop).rank,t.maxRank=e.node(t.borderBottom).rank,n=g(n,t.maxRank))}),e.graph().maxRank=n}function dr(e){f(e.nodes(),function(n){var r=e.node(n);r.dummy==="edge-proxy"&&(e.edge(r.e).labelRank=r.rank,e.removeNode(n))})}function ur(e){var n=Number.POSITIVE_INFINITY,r=0,t=Number.POSITIVE_INFINITY,a=0,o=e.graph(),i=o.marginx||0,d=o.marginy||0;function u(s){var c=s.x,l=s.y,h=s.width,v=s.height;n=Math.min(n,c-h/2),r=Math.max(r,c+h/2),t=Math.min(t,l-v/2),a=Math.max(a,l+v/2)}f(e.nodes(),function(s){u(e.node(s))}),f(e.edges(),function(s){var c=e.edge(s);Object.prototype.hasOwnProperty.call(c,"x")&&u(c)}),n-=i,t-=d,f(e.nodes(),function(s){var c=e.node(s);c.x-=n,c.y-=t}),f(e.edges(),function(s){var c=e.edge(s);f(c.points,function(l){l.x-=n,l.y-=t}),Object.prototype.hasOwnProperty.call(c,"x")&&(c.x-=n),Object.prototype.hasOwnProperty.call(c,"y")&&(c.y-=t)}),o.width=r-n+i,o.height=a-t+d}function sr(e){f(e.edges(),function(n){var r=e.edge(n),t=e.node(n.v),a=e.node(n.w),o,i;r.points?(o=r.points[0],i=r.points[r.points.length-1]):(r.points=[],o=a,i=t),r.points.unshift(K(t,o)),r.points.push(K(a,i))})}function fr(e){f(e.edges(),function(n){var r=e.edge(n);if(Object.prototype.hasOwnProperty.call(r,"x"))switch((r.labelpos==="l"||r.labelpos==="r")&&(r.width-=r.labeloffset),r.labelpos){case"l":r.x-=r.width/2+r.labeloffset;break;case"r":r.x+=r.width/2+r.labeloffset;break}})}function cr(e){f(e.edges(),function(n){var r=e.edge(n);r.reversed&&r.points.reverse()})}function lr(e){f(e.nodes(),function(n){if(e.children(n).length){var r=e.node(n),t=e.node(r.borderTop),a=e.node(r.borderBottom),o=e.node(T(r.borderLeft)),i=e.node(T(r.borderRight));r.width=Math.abs(i.x-o.x),r.height=Math.abs(a.y-t.y),r.x=o.x+r.width/2,r.y=t.y+r.height/2}}),f(e.nodes(),function(n){e.node(n).dummy==="border"&&e.removeNode(n)})}function hr(e){f(e.edges(),function(n){if(n.v===n.w){var r=e.node(n.v);r.selfEdges||(r.selfEdges=[]),r.selfEdges.push({e:n,label:e.edge(n)}),e.removeEdge(n)}})}function vr(e){var n=M(e);f(n,function(r){var t=0;f(r,function(a,o){var i=e.node(a);i.order=o+t,f(i.selfEdges,function(d){N(e,"selfedge",{width:d.label.width,height:d.label.height,rank:i.rank,order:o+ ++t,e:d.e,label:d.label},"_se")}),delete i.selfEdges})})}function pr(e){f(e.nodes(),function(n){var r=e.node(n);if(r.dummy==="selfedge"){var t=e.node(r.e.v),a=t.x+t.width/2,o=t.y,i=r.x-a,d=t.height/2;e.setEdge(r.e,r.label),e.removeNode(n),r.label.points=[{x:a+2*i/3,y:o-d},{x:a+5*i/6,y:o-d},{x:a+i,y:o},{x:a+5*i/6,y:o+d},{x:a+2*i/3,y:o+d}],r.label.x=r.x,r.label.y=r.y}})}function A(e,n){return j(C(e,n),Number)}function D(e){var n={};return f(e,function(r,t){n[t.toLowerCase()]=r}),n}export{br as l};
