"use strict";(self["webpackChunkmyblog"]=self["webpackChunkmyblog"]||[]).push([[824],{824:function(t,s,e){e.r(s),e.d(s,{default:function(){return r}});var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"blog animate__animated animate__fadeIn"},[t._m(0),e("div",{staticClass:"cards"},t._l(t.blogs,(function(s){return e("div",{key:s.id,staticClass:"card",on:{click:function(e){return t.goDetail(s.id)}}},[e("img",{attrs:{src:s.img,alt:""}}),e("span",{staticClass:"type"},[t._v(t._s(s.type))]),e("h1",{staticClass:"title"},[t._v(t._s(s.title))]),e("div",{staticClass:"discribe"},[t._v(t._s(s.description))]),e("div",{staticClass:"time"},[t._v(t._s(s.time))])])})),0),e("div",{directives:[{name:"show",rawName:"v-show",value:t.goTopBtn,expression:"goTopBtn"}],staticClass:"goTop",on:{click:t.goTop}},[e("p",[t._v("回到顶部")])])])},o=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"top"},[e("img",{staticClass:"pic",attrs:{src:"/images/pic2.jpeg",alt:""}}),e("h1",{staticClass:"title"},[t._v("Life 生活")])])}],a={name:"Blog",data(){return{blogs:[],goTopBtn:!1}},methods:{goDetail(t){this.$router.push({path:"/detail",query:{id:t}})},goTop(){window.scrollTo({top:0,behavior:"smooth"})}},async activated(){let t=await this.$api({url:"/api/getLifeBlogs",method:"get"});this.blogs=t.data,window.addEventListener("scroll",(()=>{let t=document.documentElement.scrollTop||document.body.scrollTop;this.goTopBtn=t>600}));const s=this.$route.meta.scrollTop;window.scrollTo({top:s,behavior:"smooth"})},deactivated(){window.removeEventListener("scroll",(()=>{}))}},l=a,n=e(1001),c=(0,n.Z)(l,i,o,!1,null,"53f3336c",null),r=c.exports}}]);