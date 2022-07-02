import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
//引入vant的lazyload
import { Lazyload } from 'vant'
Vue.use(Lazyload);
//引入lodash
import _ from 'lodash'
//引入hover.css
import 'hover.css'
//引入animate.css
import animate from "animate.css"
import './assets/css/iconfont.css'
//引入element-ui
import { MessageBox, Calendar, Popover, Empty, Loading, TableColumn, Table, Pagination, Input, Button, Message, Menu, MenuItem, MenuItemGroup } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.component(Button.name, Button)
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Calendar);
Vue.component(Popover.name, Popover)
Vue.component(Empty.name, Empty)
Vue.component(MessageBox.name, MessageBox)
Vue.use(Loading);
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
Vue.prototype._ = _

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
