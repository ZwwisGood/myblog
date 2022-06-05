export default [
    //重定向,在项目跑起来的时候，访问/，立马定向到首页
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('@/views/Home'),
    }
]