(this.webpackJsonpsharkvenger=this.webpackJsonpsharkvenger||[]).push([[4],{501:function(e,t,a){"use strict";a.r(t),a.d(t,"HomePage",(function(){return E}));var n=a(486),r=a(0),c=a.n(r),i=a(483),o=a(148);function s(){var e=Object(i.useApp)(),t=e.view.width/e.renderer.resolution,a=1;return t<=375&&(a=.85),t<=320&&(a=.75),c.a.createElement(i.Container,{position:[14,16],scale:a},c.a.createElement(i.Sprite,{image:Object(o.d)("CAPS.png"),position:[2,0],scale:.6}),c.a.createElement(i.Sprite,{image:Object(o.d)("TBP.png"),position:[0,44],scale:.45}))}var l=a(142),u=a.n(l),p=a(68),d=a(225),m=a(485),b=a(489);function h(){var e=Object(i.useApp)(),t=e.screen,a=t.width,s=t.height,l={x:50,y:50},h={x:a-80-16,y:50},f={x:a/2-75,y:s/2-75-40},O=Object(r.useState)(),j=Object(n.a)(O,2),S=j[0],v=j[1],w=Object(r.useState)(),g=Object(n.a)(w,2),y=g[0],k=g[1],E=Object(r.useState)(!1),x=Object(n.a)(E,2),A=x[0],C=x[1],T=Object(r.useState)(),M=Object(n.a)(T,2),F=M[0],z=M[1],W=Object(r.useState)(),P=Object(n.a)(W,2),R=P[0],B=P[1],q=Object(r.useCallback)((function(e){e.clear(),e.lineStyle(7,2454697,.5),e.drawCircle(0,0,50),e.endFill()}),[]),D=Object(r.useCallback)(function(){var e=Object(d.a)(u.a.mark((function e(t){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!F){e.next=2;break}return e.abrupt("return");case 2:(a=b.a.timeline()).pause(),a.to(t.position,Object(p.a)(Object(p.a)({},f),{},{ease:"power2.inOut"}),0),a.to(t.scale,Object(p.a)(Object(p.a)({},Object(o.b)(1.5)),{},{ease:"power2.inOut"}),0),z(a);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[F]),G=Object(r.useCallback)(Object(d.a)(u.a.mark((function e(){var t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(F){e.next=2;break}return e.abrupt("return");case 2:t=F,a=A,C(!A),b.a.to(t.pause(),{duration:a?t.time():1,time:a?0:1});case 6:case"end":return e.stop()}}),e)}))),[A,F]),J=Object(r.useCallback)(Object(d.a)(u.a.mark((function e(){var t,a,n,r,c,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(y){e.next=2;break}return e.abrupt("return");case 2:t=Math.max(.6,Math.random()+.5),a={ease:"power2.inOut"},n=Object(p.a)({duration:1,repeat:-1,yoyo:!0},a),r=b.a.getTweensOf(y.scale);try{c=function(){var e=b.a.to(y.scale,Object(p.a)({x:1.5*t*.125,y:1.5*t*.125},n));e.eventCallback("onRepeat",(function(){var t;e.vars.repeatTime=(null!==(t=e.vars.repeatTime)&&void 0!==t?t:0)+1}))},r.filter((function(e){return!e.isActive()})).forEach((function(e){return e.pause()})),(i=r.filter((function(e){return e.isActive()}))).length>0?(i.slice(1).forEach((function(e){return e.pause()})),i[0].eventCallback("onRepeat",(function(){var e;i[0].vars.repeatTime=(null!==(e=i[0].vars.repeatTime)&&void 0!==e?e:0)+1,i[0].vars.repeatTime%2===0&&(i[0].pause(),c())}))):c()}catch(o){console.error(o)}case 7:case"end":return e.stop()}}),e)}))),[y]);return c.a.createElement(c.a.Fragment,null,c.a.createElement(i.Container,{ref:function(e){e&&!S&&(e.position.set(h.x,h.y),e.scale.set(.8,.8),v(e),D(e))},tap:G,click:G,interactive:!0},c.a.createElement(i.Graphics,{draw:q,anchor:[.5,.5],position:[l.x,l.y-5]}),c.a.createElement(i.Sprite,{ref:function(e){e&&(e.scale.set(.125,.125),k(e),Object(o.f)((function(e){B(e),J()})))},angle:15,image:Object(o.d)("heart.svg"),anchor:[.5,.55],position:l})),c.a.createElement(i.Text,{text:R?JSON.stringify({latitude:R.coords.latitude,longitude:R.coords.longitude,accuracy:"".concat(R.coords.accuracy," meters"),altitude:R.coords.altitude,altitudeAccuracy:R.coords.altitudeAccuracy},void 0,1):"",position:[16,120],style:new m.q({wordWrap:!0,wordWrapWidth:e.screen.width-32,fontSize:14,align:"left",letterSpacing:2})}))}var f,O,j=a(214);!function(e){e[e.MommyShark=0]="MommyShark",e[e.Suica=1]="Suica"}(O||(O={}));var S=(f={},Object(j.a)(f,O.MommyShark,"Mommy Shark"),Object(j.a)(f,O.Suica,"Pen Pen"),f),v={initialSetting:[{character:O.MommyShark},{character:O.Suica,position:"right"}],lines:[{character:O.MommyShark,text:"Somebody kidnapped my baby while I was doing home schooling. Would you help me find him?"},{character:O.Suica,text:"Of course!"}]};function w(e){var t=e.onClick,a=e.name,n=e.text,r=Object(i.useApp)().screen,o=r.width,s=r.height,l=Math.min(400,o-16),u=(o-l)/2;return c.a.createElement(i.Container,{position:[u,s-16-120-24],click:t,tap:t,interactive:!0},c.a.createElement(i.Graphics,{draw:function(e){e.clear(),e.lineStyle(2,16777215,.8),e.beginFill(2368810,.5),e.drawRoundedRect(0,0,l,120,8),e.endFill()},position:[0,24]}),c.a.createElement(i.Graphics,{draw:function(e){b.a.killTweensOf(e.position),e.clear(),e.lineStyle(2,16777215,.8),e.beginFill(16763394,1),e.moveTo(0,0),e.lineTo(18,8),e.lineTo(0,16),e.lineTo(0,0),e.endFill();var t=l-30;e.position.set(t,116),b.a.to(e.position,{x:t+2,y:116,repeat:-1,duration:.25,yoyo:!0})}}),a&&c.a.createElement(i.Text,{text:a,style:new m.q({fill:16777215,fontFamily:"'Roboto Mono', monospace",dropShadow:!0,dropShadowColor:819,dropShadowAngle:0,dropShadowBlur:4,dropShadowAlpha:.5,dropShadowDistance:4,fontSize:16,letterSpacing:1}),click:function(){return console.log(3232)}}),c.a.createElement(i.Text,{text:n,position:[8,32],style:new m.q({fill:16777215,fontSize:16,fontFamily:"'Lato', sans-serif",wordWrap:!0,wordWrapWidth:l-16,dropShadowColor:819,dropShadowAngle:0,dropShadowBlur:2,dropShadowAlpha:.5,dropShadowDistance:2,letterSpacing:.5})}))}function g(e){var t=Object(i.useApp)(),a=Math.min(.5,t.screen.width/1500);if(e&&e.scale){var n=e.scale.valueOf();"number"===typeof n?a*=n:a=Array.isArray(n)?[n[0]*a,n[1]*a]:{x:a*n.x,y:a*n.y}}return c.a.createElement(i.Sprite,Object.assign({image:Object(o.d)("shark.png"),anchor:.5},e,{scale:a}))}function y(e){var t=Object(i.useApp)(),a=Object(o.a)(Math.min(.5,t.screen.width/1500));return e&&e.scale&&(a=Object(o.e)(a,e.scale.valueOf())),c.a.createElement(i.Sprite,Object.assign({image:Object(o.d)("suica.png"),anchor:.5},e,{scale:a}))}function k(e){var t,a=e.script,o=Object(r.useState)(0),s=Object(n.a)(o,2),l=s[0],u=s[1],p=Object(r.useState)({}),d=Object(n.a)(p,2),m=(d[0],d[1],Object(i.useApp)().screen),b=m.width,h=m.height;return c.a.createElement(c.a.Fragment,null,c.a.createElement(y,{position:[b-90,h-130],scale:[2.5,2.5]}),c.a.createElement(g,{position:[48,h-130],angle:-45,scale:[-3,3]}),c.a.createElement(w,{name:S[null!==(t=a.lines[l].character)&&void 0!==t?t:-1],text:a.lines[l].text,onClick:function(){return u(1-l)}}))}function E(){var e=Object(r.useState)(!1),t=Object(n.a)(e,2),a=t[0],o=t[1],l=Object(r.useState)(),u=Object(n.a)(l,2),p=u[0],d=u[1],m=Object(r.useState)(0),b=Object(n.a)(m,2),f=b[0],O=b[1];return window.onresize=function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p;e&&(o(!1),e.resize(),o(!0))}()},c.a.createElement("div",{id:"canvas",style:{opacity:f}},c.a.createElement(i.Stage,{width:400,onMount:function(e){d(e),e.resizeTo=document.getElementById("canvas"),setTimeout((function(){O(1),e.resize(),o(!0)}))},options:{forceCanvas:!1,antialias:!0,backgroundColor:5419993,autoDensity:!0,autoStart:!0}},a&&c.a.createElement(c.a.Fragment,null,c.a.createElement(s,null),c.a.createElement(h,null),c.a.createElement(k,{script:v}))))}}}]);