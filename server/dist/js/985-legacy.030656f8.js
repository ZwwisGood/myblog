(self["webpackChunkmyblog"]=self["webpackChunkmyblog"]||[]).push([[985],{1985:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return v}});var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"messageboard"},[r("div",{staticClass:"main animate__animated animate__fadeIn"},[t._m(0),r("div",{staticClass:"list"},[r("ul",t._l(t.messages,(function(e){return r("li",{key:e.id,staticClass:"message"},[r("img",{staticClass:"avatar",attrs:{src:e.avatar,alt:""}}),r("span",{staticClass:"name"},[t._v(t._s(e.name))]),r("div",{staticClass:"content"},[t._v(t._s(e.content))]),r("div",{staticClass:"time"},[t._v(t._s(e.time))])])})),0)]),r("el-pagination",{staticClass:"pagination",attrs:{background:"",layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.handleCurrentChange}}),r("div",{staticClass:"writeMessage"},[r("div",{staticClass:"t"},[t._v("请在下方写下你的留言吧!")]),r("div",{staticClass:"avatar",style:t.disabled1,on:{click:t.selectAvatar}},[r("span",[t._v("选择头像：")]),r("img",{class:{active:1==t.active},attrs:{src:"/images/avatar9.jpeg","data-id":"1",alt:""}}),r("img",{class:{active:2==t.active},attrs:{src:"/images/avatar1.jpeg","data-id":"2",alt:""}}),r("img",{class:{active:3==t.active},attrs:{src:"/images/avatar2.jpeg","data-id":"3",alt:""}}),r("img",{class:{active:4==t.active},attrs:{src:"/images/avatar3.jpeg","data-id":"4",alt:""}}),r("img",{class:{active:5==t.active},attrs:{src:"/images/avatar4.jpeg","data-id":"5",alt:""}}),r("img",{class:{active:6==t.active},attrs:{src:"/images/avatar5.jpeg","data-id":"6",alt:""}}),r("img",{class:{active:7==t.active},attrs:{src:"/images/avatar6.jpeg","data-id":"7",alt:""}}),r("img",{class:{active:8==t.active},attrs:{src:"/images/avatar7.jpeg","data-id":"8",alt:""}}),r("img",{class:{active:9==t.active},attrs:{src:"/images/avatar8.jpeg","data-id":"9",alt:""}})]),r("div",{staticClass:"who"},[r("span",[t._v("留言人：")]),r("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.name,expression:"name",modifiers:{trim:!0}}],attrs:{type:"text",disabled:t.disabled},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),t._m(1)]),r("span",[t._v("内   容：")]),r("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:t.content,expression:"content",modifiers:{trim:!0}}],attrs:{name:"msgContent"},domProps:{value:t.content},on:{input:function(e){e.target.composing||(t.content=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),r("div",{staticClass:"submit"},[r("div",{staticClass:"button",on:{click:t.addMessage}},[t._v("发表")])])])],1)])},n=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"top"},[r("h1",[t._v("留言板")]),r("p",[t._v("欢迎留下你的留言")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("span",[t._v("  （请注意：头像和留言人在留言后"),r("span",{staticClass:"red"},[t._v("不可修改")]),t._v("）")])}],i=r(7906),o=r(4885),s=(r(8309),r(4916),r(3123),{data:function(){return{messages:[],page:1,total:0,pageSize:5,name:localStorage.getItem("name")||"",content:"",avatar:localStorage.getItem("avatar")||"/images/avatar9.jpeg",active:localStorage.getItem("active")||1,disabled:!1,disabled1:"",first:!0}},methods:{getMessages:function(){var t=this;this.$api({url:"/api/getMessages",method:"get",params:{page:this.page,pageSize:this.pageSize}}).then((function(e){t.messages=e.data.results,t.total=e.data.total}))},handleCurrentChange:function(t){var e=this;return(0,o.Z)((0,i.Z)().mark((function r(){var a;return(0,i.Z)().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return e.page=t,r.prev=1,r.next=4,e.$api({url:"/api/getMessages",method:"get",params:{page:e.page,pageSize:e.pageSize}});case 4:a=r.sent,e.messages=a.data.results,e.total=a.data.total,r.next=13;break;case 9:r.prev=9,r.t0=r["catch"](1),console.log(r.t0),e.$msg("不好意思，出错了");case 13:window.scrollTo({top:0,behavior:"smooth"});case 14:case"end":return r.stop()}}),r,null,[[1,9]])})))()},addMessage:function(){var t=this;return(0,o.Z)((0,i.Z)().mark((function e(){var r,a;return(0,i.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(console.log(t.name),console.log(t.content),console.log(t.avatar),""!=t.name&&""!=t.content){e.next=6;break}return t.$msg.error("留言人和留言内容不能为空!"),e.abrupt("return");case 6:return e.prev=6,r=(new Date).toLocaleString(),e.next=10,t.$api({url:"/api/addMessage",method:"post",data:{name:t.name,content:t.content,time:r,avatar:t.avatar,first:t.first}});case 10:a=e.sent,0==a.code?(t.content="",t.getMessages(),t.$msg({message:"留言成功",type:"success"}),localStorage.setItem("name",t.name),localStorage.setItem("avatar",t.avatar),localStorage.setItem("active",t.active),t.first=!1,window.scrollTo({top:0,behavior:"smooth"})):(t.$msg({message:a.msg,type:"error"}),t.name="",t.content="",t.first=!0),e.next=18;break;case 14:e.prev=14,e.t0=e["catch"](6),console.log(e.t0),t.$msg.error("不好意思，出错了");case 18:localStorage.getItem("name")&&(t.disabled=!0,t.disabled1="pointer-events: none",t.first=!1);case 19:case"end":return e.stop()}}),e,null,[[6,14]])})))()},selectAvatar:function(t){var e=t.target.dataset.id;if(this.active=e,"IMG"==t.target.nodeName){var r="/images"+t.target.src.split("/images")[1];this.avatar=r}}},created:function(){this.getMessages(),localStorage.getItem("name")&&(this.disabled=!0,this.disabled1="pointer-events: none",this.first=!1)}}),c=s,l=r(1001),u=(0,l.Z)(c,a,n,!1,null,"9c74acec",null),v=u.exports},2443:function(t,e,r){var a=r(7235);a("asyncIterator")},4885:function(t,e,r){"use strict";r.d(e,{Z:function(){return n}});r(1539);function a(t,e,r,a,n,i,o){try{var s=t[i](o),c=s.value}catch(l){return void r(l)}s.done?e(c):Promise.resolve(c).then(a,n)}function n(t){return function(){var e=this,r=arguments;return new Promise((function(n,i){var o=t.apply(e,r);function s(t){a(o,n,i,s,c,"next",t)}function c(t){a(o,n,i,s,c,"throw",t)}s(void 0)}))}}},7906:function(t,e,r){"use strict";r.d(e,{Z:function(){return n}});r(2526),r(1817),r(1539),r(2165),r(8783),r(3948),r(2443),r(3680),r(3706),r(2703),r(1703),r(489),r(4747),r(8309),r(7042);var a=r(9726);function n(){
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
n=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(k){l=function(t,e,r){return t[e]=r}}function u(t,e,r,a){var n=e&&e.prototype instanceof h?e:h,i=Object.create(n.prototype),o=new C(a||[]);return i._invoke=function(t,e,r){var a="suspendedStart";return function(n,i){if("executing"===a)throw new Error("Generator is already running");if("completed"===a){if("throw"===n)throw i;return j()}for(r.method=n,r.arg=i;;){var o=r.delegate;if(o){var s=x(o,r);if(s){if(s===f)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===a)throw a="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);a="executing";var c=v(t,e,r);if("normal"===c.type){if(a=r.done?"completed":"suspendedYield",c.arg===f)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(a="completed",r.method="throw",r.arg=c.arg)}}}(t,r,o),i}function v(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(k){return{type:"throw",arg:k}}}t.wrap=u;var f={};function h(){}function d(){}function g(){}var p={};l(p,o,(function(){return this}));var m=Object.getPrototypeOf,y=m&&m(m(S([])));y&&y!==e&&r.call(y,o)&&(p=y);var w=g.prototype=h.prototype=Object.create(p);function b(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function _(t,e){function n(i,o,s,c){var l=v(t[i],t,o);if("throw"!==l.type){var u=l.arg,f=u.value;return f&&"object"==(0,a.Z)(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,s,c)}),(function(t){n("throw",t,s,c)})):e.resolve(f).then((function(t){u.value=t,s(u)}),(function(t){return n("throw",t,s,c)}))}c(l.arg)}var i;this._invoke=function(t,r){function a(){return new e((function(e,a){n(t,r,e,a)}))}return i=i?i.then(a,a):a()}}function x(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator["return"]&&(e.method="return",e.arg=void 0,x(t,e),"throw"===e.method))return f;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var a=v(r,t.iterator,e.arg);if("throw"===a.type)return e.method="throw",e.arg=a.arg,e.delegate=null,f;var n=a.arg;return n?n.done?(e[t.resultName]=n.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):n:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function C(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function S(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var a=-1,n=function e(){for(;++a<t.length;)if(r.call(t,a))return e.value=t[a],e.done=!1,e;return e.value=void 0,e.done=!0,e};return n.next=n}}return{next:j}}function j(){return{value:void 0,done:!0}}return d.prototype=g,l(w,"constructor",g),l(g,"constructor",d),d.displayName=l(g,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,l(t,c,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},b(_.prototype),l(_.prototype,s,(function(){return this})),t.AsyncIterator=_,t.async=function(e,r,a,n,i){void 0===i&&(i=Promise);var o=new _(u(e,r,a,n),i);return t.isGeneratorFunction(r)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},b(w),l(w,c,"Generator"),l(w,o,(function(){return this})),l(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var a=e.pop();if(a in t)return r.value=a,r.done=!1,r}return r.done=!0,r}},t.values=S,C.prototype={constructor:C,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function a(r,a){return o.type="throw",o.arg=t,e.next=r,a&&(e.method="next",e.arg=void 0),!!a}for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n],o=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var s=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(s&&c){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(t,e){for(var a=this.tryEntries.length-1;a>=0;--a){var n=this.tryEntries[a];if(n.tryLoc<=this.prev&&r.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=t,o.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),E(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var a=r.completion;if("throw"===a.type){var n=a.arg;E(r)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:S(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}}}]);