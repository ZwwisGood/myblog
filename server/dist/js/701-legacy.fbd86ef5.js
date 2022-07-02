"use strict";(self["webpackChunkmyblog"]=self["webpackChunkmyblog"]||[]).push([[701],{3701:function(t,e,n){n.r(e),n.d(e,{default:function(){return m}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"add animate__animated animate__fadeIn"},[n("div",[n("span",[t._v("标题：")]),n("el-input",{staticClass:"title",attrs:{placeholder:"请输入文章标题（必填）"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}}),t._v("    "),n("span",[t._v("文章类型：")]),n("el-input",{staticClass:"title",attrs:{placeholder:"请输入文章类型（必填）"},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}})],1),n("div",[n("span",[t._v("描述：")]),n("el-input",{staticClass:"description",attrs:{placeholder:"请输入文章描述（选填）"},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}})],1),n("mavon-editor",{ref:"md",staticClass:"markdown",attrs:{toolbars:t.toolbars},on:{imgAdd:t.imgAdd,save:t.save},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}}),n("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:t.addBlog}},[t._v("发表")]),n("el-button",{staticClass:"btn",attrs:{type:"info"},on:{click:t.save}},[t._v("暂存")]),n("el-button",{staticClass:"btn",attrs:{type:"danger"},on:{click:t.clear}},[t._v("清空并删除已暂存内容")])],1)},r=[],o=n(2747),s=n.n(o),i=n(7906),l=n(4885),c=(n(2526),n(1817),n(8862),{data:function(){return{type:"",htmlcontent:"",title:"",description:"",content:"",toolbars:{bold:!0,header:!0,underline:!0,quote:!0,link:!0,imagelink:!0,code:!0,subfield:!0,readmodel:!0,undo:!0,trash:!0,navigation:!0}}},methods:{addBlog:function(){var t=this;return(0,l.Z)((0,i.Z)().mark((function e(){var n;return(0,i.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(""!=t.title){e.next=3;break}return t.$msg.error("标题不能为空"),e.abrupt("return");case 3:if(""!=t.type){e.next=6;break}return t.$msg.error("类型不能为空"),e.abrupt("return");case 6:if(""!=t.content){e.next=9;break}return t.$msg.error("内容不能为空"),e.abrupt("return");case 9:return t.htmlcontent=t.converter.makeHtml(t.content),n=Math.floor(3*Math.random())+1,e.prev=11,e.next=14,t.$api({url:"/api/addblog",method:"post",data:{type:t.type,title:t.title,description:t.description,content:t.content,htmlcontent:t.htmlcontent,img:"/images/card".concat(n,".jpg")}});case 14:e.sent,t.$msg({message:"添加成功",type:"success"}),localStorage.removeItem("blog"),e.next=23;break;case 19:e.prev=19,e.t0=e["catch"](11),console.log(e.t0),t.$msg.error("添加失败");case 23:case"end":return e.stop()}}),e,null,[[11,19]])})))()},imgAdd:function(t,e){var n=this;return(0,l.Z)((0,i.Z)().mark((function a(){var r,o,s;return(0,i.Z)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return console.log("imgAdd"),console.log(e),r=new FormData,r.append("file",e),console.log(r.get("file")),a.prev=5,o=new FormData,o.append("file",e),a.next=10,n.$api({url:"/api/upload",method:"post",data:o,headers:{"Content-Type":"multipart/form-data"}});case 10:s=a.sent,n.$refs.md.$img2Url(t,s.url),a.next=17;break;case 14:a.prev=14,a.t0=a["catch"](5),console.log(a.t0);case 17:case"end":return a.stop()}}),a,null,[[5,14]])})))()},save:function(){if(""!=this.title)if(""!=this.type)if(""!=this.content){var t={title:this.title,type:this.type,description:this.description,content:this.content};localStorage.setItem("blog",JSON.stringify(t)),this.$msg({message:"暂存成功",type:"success"})}else this.$msg.error("内容不能为空");else this.$msg.error("类型不能为空");else this.$msg.error("标题不能为空")},clear:function(){var t=this;s().confirm("确定清空所有内容吗? 你已暂存的内容也会被清除","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then((function(){t.title="",t.type="",t.description="",t.content="",localStorage.removeItem("blog"),t.$msg({message:"已清空",type:"success"})})).catch((function(){}))}},created:function(){localStorage.getItem("blog")&&(this.title=JSON.parse(localStorage.getItem("blog")).title,this.type=JSON.parse(localStorage.getItem("blog")).type,this.description=JSON.parse(localStorage.getItem("blog")).description,this.content=JSON.parse(localStorage.getItem("blog")).content)}}),p=c,u=n(1001),d=(0,u.Z)(p,a,r,!1,null,"6ff589c4",null),m=d.exports}}]);