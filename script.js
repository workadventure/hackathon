/*! For license information please see script.js.LICENSE.txt */
(()=>{"use strict";var e={460:(e,t,o)=>{o.r(t),o.d(t,{Properties:()=>n,VariableDescriptor:()=>a,bootstrapExtra:()=>te,findLayerBoundaries:()=>g,findLayersBoundaries:()=>h,getAreaObject:()=>f,getLayersMap:()=>p,getVariables:()=>s,initDoors:()=>Q,initPropertiesTemplates:()=>G,initPropertiesTemplatesArea:()=>B,initVariableActionLayer:()=>X,launchTutorialv1:()=>Y,openConfig:()=>i});class n{constructor(e){this.properties=null!=e?e:[]}get(e){const t=this.properties.filter((t=>t.name===e)).map((e=>e.value));if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(0!==t.length)return t[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,t){const o=this.get(e);if(void 0!==o){if("json"!==t&&typeof o!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return o}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,t){const o=this.get(e);if(void 0===o)throw new Error('Property "'+e+'" is missing');if("json"!==t&&typeof o!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return o}getType(e){const t=this.properties.filter((t=>t.name===e)).map((e=>e.type));if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(0!==t.length)return t[0]}}const r="https://unpkg.com/@workadventure/scripting-api-extra@1.7.4/dist";class a{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new n(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return!e||WA.player.tags.includes(e)}get isWritable(){const e=this.properties.getString("writableBy");return!e||WA.player.tags.includes(e)}}function i(e){const t=e?"#"+e.join():"";WA.nav.openCoWebSite(r+"/configuration.html"+t,!0)}async function s(e,t){const o=await WA.room.getTiledMap(),n=new Map;return l(o.layers,n,e,t),n}function l(e,t,o,n){for(const r of e)if("objectgroup"===r.type){for(const e of r.objects)if("variable"===e.type||"variable"===e.class){if(o&&r.name!==o)continue;if(n&&!n.includes(e.name))continue;t.set(e.name,new a(e))}}else"group"===r.type&&l(r.layers,t,o,n)}let c;async function p(){return void 0===c&&(c=async function(){return function(e){const t=new Map;return u(e.layers,"",t),t}(await WA.room.getTiledMap())}()),c}function u(e,t,o){for(const n of e)"group"===n.type?u(n.layers,t+n.name+"/",o):(n.name=t+n.name,o.set(n.name,n))}async function f(){const e=await p(),t=[];for(const o of e.values())if("objectgroup"===o.type)for(const e of o.objects)"area"!==e.type&&"area"!==e.class||t.push(e);return t}function g(e){let t=1/0,o=1/0,n=0,r=0;const a=e.data;if("string"==typeof a)throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let i=0;i<e.height;i++)for(let s=0;s<e.width;s++)0!==a[s+i*e.width]&&(t=Math.min(t,s),r=Math.max(r,s),o=Math.min(o,i),n=Math.max(n,i));return{top:o,left:t,right:r+1,bottom:n+1}}function h(e){let t=1/0,o=1/0,n=0,r=0;for(const a of e){const e=g(a);e.left<t&&(t=e.left),e.top<o&&(o=e.top),e.right>r&&(r=e.right),e.bottom>n&&(n=e.bottom)}return{top:o,left:t,right:r,bottom:n}}var d=Object.prototype.toString,y=Array.isArray||function(e){return"[object Array]"===d.call(e)};function m(e){return"function"==typeof e}function v(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function b(e,t){return null!=e&&"object"==typeof e&&t in e}var w=RegExp.prototype.test,A=/\S/;var W={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"},S=/\s*/,C=/\s+/,x=/\s*=/,E=/\s*\}/,T=/#|\^|\/|>|\{|&|=|!/;function L(e){this.string=e,this.tail=e,this.pos=0}function P(e,t){this.view=e,this.cache={".":this.view},this.parent=t}function k(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}L.prototype.eos=function(){return""===this.tail},L.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var o=t[0];return this.tail=this.tail.substring(o.length),this.pos+=o.length,o},L.prototype.scanUntil=function(e){var t,o=this.tail.search(e);switch(o){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,o),this.tail=this.tail.substring(o)}return this.pos+=t.length,t},P.prototype.push=function(e){return new P(e,this)},P.prototype.lookup=function(e){var t,o,n,r=this.cache;if(r.hasOwnProperty(e))t=r[e];else{for(var a,i,s,l=this,c=!1;l;){if(e.indexOf(".")>0)for(a=l.view,i=e.split("."),s=0;null!=a&&s<i.length;)s===i.length-1&&(c=b(a,i[s])||(o=a,n=i[s],null!=o&&"object"!=typeof o&&o.hasOwnProperty&&o.hasOwnProperty(n))),a=a[i[s++]];else a=l.view[e],c=b(l.view,e);if(c){t=a;break}l=l.parent}r[e]=t}return m(t)&&(t=t.call(this.view)),t},k.prototype.clearCache=function(){void 0!==this.templateCache&&this.templateCache.clear()},k.prototype.parse=function(e,t){var o=this.templateCache,n=e+":"+(t||V.tags).join(":"),r=void 0!==o,a=r?o.get(n):void 0;return null==a&&(a=function(e,t){if(!e)return[];var o,n,r,a,i=!1,s=[],l=[],c=[],p=!1,u=!1,f="",g=0;function h(){if(p&&!u)for(;c.length;)delete l[c.pop()];else c=[];p=!1,u=!1}function d(e){if("string"==typeof e&&(e=e.split(C,2)),!y(e)||2!==e.length)throw new Error("Invalid tags: "+e);o=new RegExp(v(e[0])+"\\s*"),n=new RegExp("\\s*"+v(e[1])),r=new RegExp("\\s*"+v("}"+e[1]))}d(t||V.tags);for(var m,b,W,P,k,M,j=new L(e);!j.eos();){if(m=j.pos,W=j.scanUntil(o))for(var U=0,B=W.length;U<B;++U)a=P=W.charAt(U),function(e,t){return w.call(e,t)}(A,a)?(u=!0,i=!0,f+=" "):(c.push(l.length),f+=P),l.push(["text",P,m,m+1]),m+=1,"\n"===P&&(h(),f="",g=0,i=!1);if(!j.scan(o))break;if(p=!0,b=j.scan(T)||"name",j.scan(S),"="===b?(W=j.scanUntil(x),j.scan(x),j.scanUntil(n)):"{"===b?(W=j.scanUntil(r),j.scan(E),j.scanUntil(n),b="&"):W=j.scanUntil(n),!j.scan(n))throw new Error("Unclosed tag at "+j.pos);if(k=">"==b?[b,W,m,j.pos,f,g,i]:[b,W,m,j.pos],g++,l.push(k),"#"===b||"^"===b)s.push(k);else if("/"===b){if(!(M=s.pop()))throw new Error('Unopened section "'+W+'" at '+m);if(M[1]!==W)throw new Error('Unclosed section "'+M[1]+'" at '+m)}else"name"===b||"{"===b||"&"===b?u=!0:"="===b&&d(W)}if(h(),M=s.pop())throw new Error('Unclosed section "'+M[1]+'" at '+j.pos);return function(e){for(var t,o=[],n=o,r=[],a=0,i=e.length;a<i;++a)switch((t=e[a])[0]){case"#":case"^":n.push(t),r.push(t),n=t[4]=[];break;case"/":r.pop()[5]=t[2],n=r.length>0?r[r.length-1][4]:o;break;default:n.push(t)}return o}(function(e){for(var t,o,n=[],r=0,a=e.length;r<a;++r)(t=e[r])&&("text"===t[0]&&o&&"text"===o[0]?(o[1]+=t[1],o[3]=t[3]):(n.push(t),o=t));return n}(l))}(e,t),r&&o.set(n,a)),a},k.prototype.render=function(e,t,o,n){var r=this.getConfigTags(n),a=this.parse(e,r),i=t instanceof P?t:new P(t,void 0);return this.renderTokens(a,i,o,e,n)},k.prototype.renderTokens=function(e,t,o,n,r){for(var a,i,s,l="",c=0,p=e.length;c<p;++c)s=void 0,"#"===(i=(a=e[c])[0])?s=this.renderSection(a,t,o,n,r):"^"===i?s=this.renderInverted(a,t,o,n,r):">"===i?s=this.renderPartial(a,t,o,r):"&"===i?s=this.unescapedValue(a,t):"name"===i?s=this.escapedValue(a,t,r):"text"===i&&(s=this.rawValue(a)),void 0!==s&&(l+=s);return l},k.prototype.renderSection=function(e,t,o,n,r){var a=this,i="",s=t.lookup(e[1]);if(s){if(y(s))for(var l=0,c=s.length;l<c;++l)i+=this.renderTokens(e[4],t.push(s[l]),o,n,r);else if("object"==typeof s||"string"==typeof s||"number"==typeof s)i+=this.renderTokens(e[4],t.push(s),o,n,r);else if(m(s)){if("string"!=typeof n)throw new Error("Cannot use higher-order sections without the original template");null!=(s=s.call(t.view,n.slice(e[3],e[5]),(function(e){return a.render(e,t,o,r)})))&&(i+=s)}else i+=this.renderTokens(e[4],t,o,n,r);return i}},k.prototype.renderInverted=function(e,t,o,n,r){var a=t.lookup(e[1]);if(!a||y(a)&&0===a.length)return this.renderTokens(e[4],t,o,n,r)},k.prototype.indentPartial=function(e,t,o){for(var n=t.replace(/[^ \t]/g,""),r=e.split("\n"),a=0;a<r.length;a++)r[a].length&&(a>0||!o)&&(r[a]=n+r[a]);return r.join("\n")},k.prototype.renderPartial=function(e,t,o,n){if(o){var r=this.getConfigTags(n),a=m(o)?o(e[1]):o[e[1]];if(null!=a){var i=e[6],s=e[5],l=e[4],c=a;0==s&&l&&(c=this.indentPartial(a,l,i));var p=this.parse(c,r);return this.renderTokens(p,t,o,c,n)}}},k.prototype.unescapedValue=function(e,t){var o=t.lookup(e[1]);if(null!=o)return o},k.prototype.escapedValue=function(e,t,o){var n=this.getConfigEscape(o)||V.escape,r=t.lookup(e[1]);if(null!=r)return"number"==typeof r&&n===V.escape?String(r):n(r)},k.prototype.rawValue=function(e){return e[1]},k.prototype.getConfigTags=function(e){return y(e)?e:e&&"object"==typeof e?e.tags:void 0},k.prototype.getConfigEscape=function(e){return e&&"object"==typeof e&&!y(e)?e.escape:void 0};var V={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){M.templateCache=e},get templateCache(){return M.templateCache}},M=new k;V.clearCache=function(){return M.clearCache()},V.parse=function(e,t){return M.parse(e,t)},V.render=function(e,t,o,n){if("string"!=typeof e)throw new TypeError('Invalid template! Template should be a "string" but "'+(y(r=e)?"array":typeof r)+'" was given as the first argument for mustache#render(template, view, partials)');var r;return M.render(e,t,o,n)},V.escape=function(e){return String(e).replace(/[&<>"'`=\/]/g,(function(e){return W[e]}))},V.Scanner=L,V.Context=P,V.Writer=k;const j=V;class U{constructor(e,t){this.template=e,this.state=t,this.ast=j.parse(e)}getValue(){return void 0===this.value&&(this.value=j.render(this.template,this.state)),this.value}onChange(e){const t=[];for(const o of this.getUsedVariables().values())t.push(this.state.onVariableChange(o).subscribe((()=>{const t=j.render(this.template,this.state);t!==this.value&&(this.value=t,e(this.value))})));return{unsubscribe:()=>{for(const e of t)e.unsubscribe()}}}isPureString(){return 0===this.ast.length||1===this.ast.length&&"text"===this.ast[0][0]}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,t){for(const o of e){const e=o[0],n=o[1],r=o[4];["name","&","#","^"].includes(e)&&t.add(n),void 0!==r&&"string"!=typeof r&&this.recursiveGetUsedVariables(r,t)}}}async function B(){var e;const t=await f();for(const o of t){const t=null!==(e=o.properties)&&void 0!==e?e:[];for(const e of t){if("int"===e.type||"bool"===e.type||"object"===e.type||"string"!=typeof e.value)continue;const t=new U(e.value,WA.state);if(t.isPureString())continue;const n=t.getValue();await O(o.name,e.name,n),t.onChange((async t=>{await O(o.name,e.name,t)}))}}}async function G(){var e;const t=await p();for(const[o,n]of t.entries())if("objectgroup"!==n.type){const t=null!==(e=n.properties)&&void 0!==e?e:[];for(const e of t){if("int"===e.type||"bool"===e.type||"object"===e.type||"string"!=typeof e.value)continue;const t=new U(e.value,WA.state);if(t.isPureString())continue;const n=t.getValue();R(o,e.name,n),t.onChange((t=>{R(o,e.name,t)}))}}}async function O(e,t,o){console.log(e),(await WA.room.area.get(e)).setProperty(t,o)}function R(e,t,o){WA.room.setProperty(e,t,o),"visible"===t&&(o?WA.room.showLayer(e):WA.room.hideLayer(e))}const I="https://admin.workadventu.re/html";let N,D,_=0,H=0;function z(e){if(WA.state[e.name]){let t=e.properties.mustGetString("openLayer");for(const e of t.split("\n"))WA.room.showLayer(e);t=e.properties.mustGetString("closeLayer");for(const e of t.split("\n"))WA.room.hideLayer(e)}else{let t=e.properties.mustGetString("openLayer");for(const e of t.split("\n"))WA.room.hideLayer(e);t=e.properties.mustGetString("closeLayer");for(const e of t.split("\n"))WA.room.showLayer(e)}}function Z(e){return e.map((e=>N.get(e))).filter((e=>"tilelayer"===(null==e?void 0:e.type)))}function $(e){const t=h(Z(e)),o=32*((t.right-t.left)/2+t.left),n=32*((t.bottom-t.top)/2+t.top);return Math.sqrt(Math.pow(_-o,2)+Math.pow(H-n,2))}function q(e){WA.state.onVariableChange(e.name).subscribe((()=>{WA.state[e.name]?function(e){const t=e.properties.getString("openSound"),o=e.properties.getNumber("soundRadius");let n=1;if(o){const t=$(e.properties.mustGetString("openLayer").split("\n"));if(t>o)return;n=1-t/o}t&&WA.sound.loadSound(t).play({volume:n})}(e):function(e){const t=e.properties.getString("closeSound"),o=e.properties.getNumber("soundRadius");let n=1;if(o){const t=$(e.properties.mustGetString("closeLayer").split("\n"));if(t>o)return;n=1-t/o}t&&WA.sound.loadSound(t).play({volume:n})}(e),z(e)})),z(e)}function F(e,t,o,n){const r=e.name;let a,i,s=!1;const l=o.getString("tag");let c=!0;l&&!WA.player.tags.includes(l)&&(c=!1);const p=!!l;function u(){var e;a&&a.remove(),a=WA.ui.displayActionMessage({message:null!==(e=o.getString("closeTriggerMessage"))&&void 0!==e?e:"Press SPACE to close the door",callback:()=>{WA.state[t.name]=!1,f()}})}function f(){var e;a&&a.remove(),a=WA.ui.displayActionMessage({message:null!==(e=o.getString("openTriggerMessage"))&&void 0!==e?e:"Press SPACE to open the door",callback:()=>{WA.state[t.name]=!0,u()}})}function g(){i&&(WA.room.website.delete(i.name),i=void 0)}function d(){s=!0,o.getBoolean("autoOpen")&&c?WA.state[t.name]=!0:WA.state[t.name]||(!p||c)&&p||!o.getString("code")&&!o.getString("codeVariable")?c&&(WA.state[t.name]?u():f()):function(){let o;if("tilelayer"===e.type)o=h(Z(t.properties.mustGetString("closeLayer").split("\n")));else{if(void 0===e.x||void 0===e.y||void 0===e.width||void 0===e.height)throw new Error(`Doorstep zone "${e.name}" is missing x, y, width or height`);o={top:e.y,left:e.x,right:e.x+e.width,bottom:e.y+e.height}}i=WA.room.website.create({name:"doorKeypad"+r,url:n+"/keypad.html#"+encodeURIComponent(r),position:{x:32*o.right,y:32*o.top,width:96,height:128},allowApi:!0})}()}function y(){s=!1,o.getBoolean("autoClose")&&(WA.state[t.name]=!1),a&&a.remove(),g()}"tilelayer"===e.type?(WA.room.onEnterLayer(r).subscribe(d),WA.room.onLeaveLayer(r).subscribe(y)):(WA.room.area.onEnter(r).subscribe(d),WA.room.area.onLeave(r).subscribe(y)),WA.state.onVariableChange(t.name).subscribe((()=>{s&&(o.getBoolean("autoClose")||!0!==WA.state[t.name]||u(),i&&!0===WA.state[t.name]&&g(),o.getBoolean("autoOpen")||!1!==WA.state[t.name]||f())}))}function K(e){void 0===WA.state[e.name]&&(WA.state[e.name]=0),WA.state.onVariableChange(e.name).subscribe((()=>{WA.state[e.name]&&function(e){const t=e.properties.mustGetString("bellSound"),o=e.properties.getNumber("soundRadius");let n=1;if(o){const t=Math.sqrt(Math.pow(e.x-_,2)+Math.pow(e.y-H,2));if(t>o)return;n=1-t/o}WA.sound.loadSound(t).play({volume:n})}(e)}))}function J(e,t,o){let n;const r=t.getString("bellPopup");if("tilelayer"===o.type){const a=o.name;WA.room.onEnterLayer(a).subscribe((()=>{var o;r?n=WA.ui.openPopup(r,"",[{label:null!==(o=t.getString("bellButtonText"))&&void 0!==o?o:"Ring",callback:()=>{WA.state[e]=WA.state[e]+1}}]):WA.state[e]=WA.state[e]+1})),WA.room.onLeaveLayer(a).subscribe((()=>{n&&(n.close(),n=void 0)}))}else{const a=o.name;WA.room.area.onEnter(a).subscribe((()=>{var o;r?n=WA.ui.openPopup(r,"",[{label:null!==(o=t.getString("bellButtonText"))&&void 0!==o?o:"Ring",callback:()=>{WA.state[e]=WA.state[e]+1}}]):WA.state[e]=WA.state[e]+1})),WA.room.area.onLeave(a).subscribe((()=>{n&&(n.close(),n=void 0)}))}}async function Q(e){e=null!=e?e:I||r;const t=await s();N=await p();for(const e of t.values())e.properties.get("door")&&q(e),e.properties.get("bell")&&K(e);for(const o of N.values()){const r=new n(o.properties),a=r.getString("doorVariable");if(a&&"tilelayer"===o.type){const n=t.get(a);if(void 0===n)throw new Error('Cannot find variable "'+a+'" referred in the "doorVariable" property of layer "'+o.name+'"');F(o,n,r,e)}const i=r.getString("bellVariable");i&&"tilelayer"===o.type&&J(i,r,o)}for(const o of await f()){const r=new n(o.properties),a=r.getString("doorVariable");if(a){const n=t.get(a);if(void 0===n)throw new Error('Cannot find variable "'+a+'" referred in the "doorVariable" property of object "'+o.name+'"');F(o,n,r,e)}const i=r.getString("bellVariable");i&&J(i,r,o)}WA.player.onPlayerMove((e=>{_=e.x,H=e.y}))}function X(e,t){const o=e.getString("bindVariable");o&&function(e,t,o,n,r,a){a&&!WA.player.tags.includes(a)||(void 0!==o&&WA.room.onEnterLayer(t).subscribe((()=>{r||(WA.state[e]=o)})),void 0!==n&&WA.room.onLeaveLayer(t).subscribe((()=>{WA.state[e]=n})))}(o,t,e.get("enterValue"),e.get("leaveValue"),e.getString("triggerMessage"),e.getString("tag"))}function Y(){const e=`${r}/tutorialv1.html`;console.info("Start onboarding application!",e),console.info("Player tutorial done information: ",WA.player.state.tutorialDone),WA.player.state.tutorialDone||WA.ui.modal.openModal({tiltle:"Welcome onboard!",src:e,allow:"fullscreen; clipboard-read; clipboard-write",allowApi:!0,position:"right"})}function ee(e,t,o){let n;const r=o.getString("openConfigAdminTag");let a=!0;function s(){WA.nav.closeCoWebSite()}r&&!WA.player.tags.includes(r)&&(a=!1),WA.room.onEnterLayer(t).subscribe((()=>{const t=o.getString("openConfigTrigger");var r;a&&(t&&"onaction"===t?(n&&n.remove(),n=WA.ui.displayActionMessage({message:null!==(r=o.getString("openConfigTriggerMessage"))&&void 0!==r?r:"Press SPACE or touch here to configure",callback:()=>i(e)})):i(e))})),WA.room.onLeaveLayer(t).subscribe((()=>{n?(n.remove(),s()):s()}))}function te(){return WA.onInit().then((()=>{Q().catch((e=>console.error(e))),async function(){const e=await p();for(const t of e.values())X(new n(t.properties),t.name)}().catch((e=>console.error(e))),async function(e){const t=await WA.room.getTiledMap();e=null!=e?e:r,D=await p();const o=t.layers.find((e=>"configuration"===e.name));if(o){const t=new n(o.properties).getString("tag");t&&!WA.player.tags.includes(t)||WA.ui.registerMenuCommand("Configure the room",(()=>{WA.nav.openCoWebSite(e+"/configuration.html",!0)}));for(const e of D.values()){const t=new n(e.properties),o=t.getString("openConfig");o&&"tilelayer"===e.type&&ee(o.split(","),e.name,t)}}}().catch((e=>console.error(e))),G().catch((e=>console.error(e))),B().catch((e=>console.error(e)))})).catch((e=>console.error(e)))}}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,o),a.exports}o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{const e=o(460);let t,n;console.log("Script started successfully"),WA.onInit().then((()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),WA.player.tags.includes("admin")&&(WA.room.showLayer("exitNorthConfig"),WA.room.showLayer("exitSouthConfig"),WA.room.showLayer("exitWestConfig"),WA.room.showLayer("exitEastConfig")),(0,e.bootstrapExtra)().then((()=>{console.log("Scripting API Extra ready")})).catch((e=>console.error(e)))})).catch((e=>console.error(e)));const r=[{zone:"needHelp",message:"Do you need some guidance? We are happy to help you out.",cta:[{label:"Meet us",className:"primary",callback:()=>WA.nav.openTab("https://play.staging.workadventu.re/@/tcm/workadventure/wa-village")}]},{zone:"followUs",message:"Hey! Have you already started following us?",cta:[{label:"LinkedIn",className:"primary",callback:()=>WA.nav.openTab("https://www.linkedin.com/company/workadventu-re")},{label:"Twitter",className:"primary",callback:()=>WA.nav.openTab("https://twitter.com/workadventure_")}]}];function a(e,t){const o=r.find((t=>t.zone==e));void 0!==o&&(n=WA.openPopup(t,o.message,o.cta))}function i(){void 0!==typeof n&&(n.close(),n=void 0)}WA.onEnterZone("needHelp",(()=>{t="needHelp",a(t,t+"Popup")})),WA.onEnterZone("followUs",(()=>{t="followUs",a(t,t+"Popup")})),WA.onLeaveZone("needHelp",i),WA.onLeaveZone("followUs",i)})()})();
//# sourceMappingURL=script.js.map