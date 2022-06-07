import Vue from 'vue'
import App from './App.vue'
import 'hover.css'
import router from '@/router'
//引入element-ui
import {Input, Button, Message, Menu, MenuItem, MenuItemGroup } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.component(Button.name, Button)
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.prototype.$msg = Message
Vue.config.productionTip = false
// markdown
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
Vue.use(mavonEditor);
// showdown
//把markdown格式数据转换成html类型的数据
import showdown from 'showdown';
Vue.prototype.converter = new showdown.Converter();
//引入二次封装的axios，并挂载到vue实例身上
import api from '@/api/requests.js'
Vue.prototype.$api = api







new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
