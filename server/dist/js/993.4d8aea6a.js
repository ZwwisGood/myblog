"use strict";(self["webpackChunkmyblog"]=self["webpackChunkmyblog"]||[]).push([[993],{9993:function(t,a,e){e.r(a),e.d(a,{default:function(){return o}});var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"messageboard"},[e("div",{staticClass:"main animate__animated animate__fadeIn"},[t._m(0),e("div",{staticClass:"list"},[e("ul",t._l(t.messages,(function(a){return e("li",{key:a.id,staticClass:"message"},[e("img",{staticClass:"avatar",attrs:{src:a.avatar,alt:""}}),e("span",{staticClass:"name"},[t._v(t._s(a.name))]),e("div",{staticClass:"content"},[t._v(t._s(a.content))]),e("div",{staticClass:"time"},[t._v(t._s(a.time))])])})),0)]),e("el-pagination",{staticClass:"pagination",attrs:{background:"",layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.handleCurrentChange}}),e("div",{staticClass:"writeMessage"},[e("div",{staticClass:"t"},[t._v("请在下方写下你的留言吧!")]),e("div",{staticClass:"avatar",style:t.disabled1,on:{click:t.selectAvatar}},[e("span",[t._v("选择头像：")]),e("img",{class:{active:1==t.active},attrs:{src:"/images/avatar9.jpeg","data-id":"1",alt:""}}),e("img",{class:{active:2==t.active},attrs:{src:"/images/avatar1.jpeg","data-id":"2",alt:""}}),e("img",{class:{active:3==t.active},attrs:{src:"/images/avatar2.jpeg","data-id":"3",alt:""}}),e("img",{class:{active:4==t.active},attrs:{src:"/images/avatar3.jpeg","data-id":"4",alt:""}}),e("img",{class:{active:5==t.active},attrs:{src:"/images/avatar4.jpeg","data-id":"5",alt:""}}),e("img",{class:{active:6==t.active},attrs:{src:"/images/avatar5.jpeg","data-id":"6",alt:""}}),e("img",{class:{active:7==t.active},attrs:{src:"/images/avatar6.jpeg","data-id":"7",alt:""}}),e("img",{class:{active:8==t.active},attrs:{src:"/images/avatar7.jpeg","data-id":"8",alt:""}}),e("img",{class:{active:9==t.active},attrs:{src:"/images/avatar8.jpeg","data-id":"9",alt:""}})]),e("div",{staticClass:"who"},[e("span",[t._v("留言人：")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.name,expression:"name",modifiers:{trim:!0}}],attrs:{type:"text",disabled:t.disabled},domProps:{value:t.name},on:{input:function(a){a.target.composing||(t.name=a.target.value.trim())},blur:function(a){return t.$forceUpdate()}}}),t._m(1)]),e("span",[t._v("内   容：")]),e("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:t.content,expression:"content",modifiers:{trim:!0}}],attrs:{name:"msgContent"},domProps:{value:t.content},on:{input:function(a){a.target.composing||(t.content=a.target.value.trim())},blur:function(a){return t.$forceUpdate()}}}),e("div",{staticClass:"submit"},[e("div",{staticClass:"button",on:{click:t.addMessage}},[t._v("发表")])])])],1)])},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"top"},[e("h1",[t._v("留言板")]),e("p",[t._v("欢迎留下你的留言")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("span",[t._v("  （请注意：头像和留言人在留言后"),e("span",{staticClass:"red"},[t._v("不可修改")]),t._v("）")])}],r={data(){return{messages:[],page:1,total:0,pageSize:5,name:localStorage.getItem("name")||"",content:"",avatar:localStorage.getItem("avatar")||"/images/avatar9.jpeg",active:localStorage.getItem("active")||1,disabled:!1,disabled1:"",first:!0}},methods:{getMessages(){this.$api({url:"/api/getMessages",method:"get",params:{page:this.page,pageSize:this.pageSize}}).then((t=>{this.messages=t.data.results,this.total=t.data.total}))},async handleCurrentChange(t){this.page=t;try{let t=await this.$api({url:"/api/getMessages",method:"get",params:{page:this.page,pageSize:this.pageSize}});this.messages=t.data.results,this.total=t.data.total}catch(a){console.log(a),this.$msg("不好意思，出错了")}window.scrollTo({top:0,behavior:"smooth"})},async addMessage(){if(console.log(this.name),console.log(this.content),console.log(this.avatar),""!=this.name&&""!=this.content){try{let t=(new Date).toLocaleString(),a=await this.$api({url:"/api/addMessage",method:"post",data:{name:this.name,content:this.content,time:t,avatar:this.avatar,first:this.first}});0==a.code?(this.content="",this.getMessages(),this.$msg({message:"留言成功",type:"success"}),localStorage.setItem("name",this.name),localStorage.setItem("avatar",this.avatar),localStorage.setItem("active",this.active),this.first=!1,window.scrollTo({top:0,behavior:"smooth"})):(this.$msg({message:a.msg,type:"error"}),this.name="",this.content="",this.first=!0)}catch(t){console.log(t),this.$msg.error("不好意思，出错了")}localStorage.getItem("name")&&(this.disabled=!0,this.disabled1="pointer-events: none",this.first=!1)}else this.$msg.error("留言人和留言内容不能为空!")},selectAvatar(t){let a=t.target.dataset.id;if(this.active=a,"IMG"==t.target.nodeName){let a="/images"+t.target.src.split("/images")[1];this.avatar=a}}},created(){this.getMessages(),localStorage.getItem("name")&&(this.disabled=!0,this.disabled1="pointer-events: none",this.first=!1)}},n=r,l=e(1001),c=(0,l.Z)(n,s,i,!1,null,"67a0825e",null),o=c.exports}}]);