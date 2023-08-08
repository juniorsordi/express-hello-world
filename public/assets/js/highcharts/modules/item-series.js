/*
 Highcharts JS v11.0.1 (2023-05-08)

 Item series type for Highcharts

 (c) 2019 Torstein Honsi

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/item-series",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,c,e,b){a.hasOwnProperty(c)||(a[c]=b.apply(null,e),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:c,module:a[c]}})))}a=a?a._modules:
{};b(a,"Series/Item/ItemPoint.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){const {series:e,seriesTypes:{pie:c}}=a;({extend:a}=b);class v extends c.prototype.pointClass{constructor(){super(...arguments);this.series=this.options=void 0}}a(v.prototype,{haloPath:e.prototype.pointClass.prototype.haloPath});return v});b(a,"Series/Item/ItemSeries.js",[a["Core/Globals.js"],a["Series/Item/ItemPoint.js"],a["Core/Defaults.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],
function(a,b,e,A,v){({defaultOptions:e}=e);const {seriesTypes:{pie:c}}=A,{defined:E,extend:B,fireEvent:H,isNumber:r,merge:C,pick:I}=v;class l extends c{constructor(){super(...arguments);this.points=this.options=this.data=void 0}animate(a){a?this.group.attr({opacity:0}):this.group.animate({opacity:1},this.options.animation)}drawDataLabels(){this.center&&this.slots?a.seriesTypes.pie.prototype.drawDataLabels.call(this):this.points.forEach(function(a){a.destroyElements({dataLabel:1})})}drawPoints(){let a=
this,F=this.options,h=a.chart.renderer,b=F.marker,c=this.borderWidth%2?.5:1,n=0,e=this.getRows(),z=Math.ceil(this.total/e),w=this.chart.plotWidth/z,x=this.chart.plotHeight/e,y=this.itemSize||Math.min(w,x);this.points.forEach(function(g){let p,t;var k=g.marker||{};let q=k.symbol||b.symbol;k=I(k.radius,b.radius);let G=E(k)?2*k:y,u=G*F.itemPadding;let l,m;g.graphics=p=g.graphics||[];a.chart.styledMode||(t=a.pointAttribs(g,g.selected&&"select"));if(!g.isNull&&g.visible){g.graphic||(g.graphic=h.g("point").add(a.group));
for(let b=0;b<(g.y||0);b++){if(a.center&&a.slots){var d=a.slots.shift();var f=d.x-y/2;d=d.y-y/2}else"horizontal"===F.layout?(f=n%z*w,d=x*Math.floor(n/z)):(f=w*Math.floor(n/e),d=n%e*x);f+=u;d+=u;m=l=Math.round(G-2*u);a.options.crisp&&(f=Math.round(f)-c,d=Math.round(d)+c);f={x:f,y:d,width:l,height:m};"undefined"!==typeof k&&(f.r=k);t&&B(f,t);(d=p[b])?d.animate(f):d=h.symbol(q,void 0,void 0,void 0,void 0,{backgroundSize:"within"}).attr(f).add(g.graphic);d.isActive=!0;p[b]=d;n++}}p.forEach((a,g)=>{a&&
(a.isActive?a.isActive=!1:(a.destroy(),p.splice(g,1)))})})}getRows(){let a=this.options.rows,b,h;if(!a)if(h=this.chart.plotWidth/this.chart.plotHeight,a=Math.sqrt(this.total),1<h)for(a=Math.ceil(a);0<a;){b=this.total/a;if(b/a>h)break;a--}else for(a=Math.floor(a);a<this.total;){b=this.total/a;if(b/a<h)break;a++}return a}getSlots(){function a(a){0<D&&(a.row.colCount--,D--)}let b=this.center,h=b[2],c=b[3],e,n=this.slots,l,z,w,x,y,v,p,t,k=0,q,r=this.endAngleRad-this.startAngleRad,u=Number.MAX_VALUE,A,
m,d,f=this.options.rows,B=(h-c)/h,C=0===r%(2*Math.PI),E=this.total||0;for(;u>E+(m&&C?m.length:0);)for(A=u,u=n.length=0,m=d,d=[],k++,q=h/k/2,f?(c=(q-f)/q*h,0<=c?q=f:(c=0,B=1)):q=Math.floor(q*B),e=q;0<e;e--)w=(c+e/q*(h-c-k))/2,x=r*w,y=Math.ceil(x/k),d.push({rowRadius:w,rowLength:x,colCount:y}),u+=y+1;if(m){for(var D=A-this.total-(C?m.length:0);0<D;)m.map(function(a){return{angle:a.colCount/a.rowLength,row:a}}).sort(function(a,b){return b.angle-a.angle}).slice(0,Math.min(D,Math.ceil(m.length/2))).forEach(a);
m.forEach(function(a){const c=a.rowRadius;v=(a=a.colCount)?r/a:0;for(t=0;t<=a;t+=1)p=this.startAngleRad+t*v,l=b[0]+Math.cos(p)*c,z=b[1]+Math.sin(p)*c,n.push({x:l,y:z,angle:p})},this);n.sort(function(a,b){return a.angle-b.angle});this.itemSize=k;return n}}translate(b){0===this.total&&r(this.options.startAngle)&&r(this.options.endAngle)&&(this.center=this.getCenter());this.slots||(this.slots=[]);r(this.options.startAngle)&&r(this.options.endAngle)?(a.seriesTypes.pie.prototype.translate.apply(this,arguments),
this.slots=this.getSlots()):(this.generatePoints(),H(this,"afterTranslate"))}}l.defaultOptions=C(c.defaultOptions,{endAngle:void 0,innerSize:"40%",itemPadding:.1,layout:"vertical",marker:C(e.plotOptions.line.marker,{radius:null}),rows:void 0,crisp:!1,showInLegend:!0,startAngle:void 0});B(l.prototype,{markerAttribs:void 0});l.prototype.pointClass=b;A.registerSeriesType("item",l);"";return l});b(a,"masters/modules/item-series.src.js",[],function(){})});
//# sourceMappingURL=item-series.js.map