import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './routes'

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})


router.beforeEach((to, from, next) => {
    if (from.meta.keepAlive) { //判断是否为需要缓存的路由
        const scrollTop = document.documentElement.scrollTop; //获取该路由页面的scrollTop
        from.meta.scrollTop = scrollTop || 0;
        next();
    }
    if (to.path.includes('/center') && from.path != '/manage' && !from.path.includes('/center')) {
        next(from.path);
    }
    else {
        next();
    }
});


export default router