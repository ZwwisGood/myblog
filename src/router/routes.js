export default [
    //重定向,在项目跑起来的时候，访问/，立马定向到首页
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('@/views/Home'),
    },
    {
        path: '/manage',
        component: () => import('@/views/Manage'),
    },
    {
        path: '/center',
        component: () => import('@/views/Center'),
        children: [
            {
                path: '/center/addBlog',
                component: () => import('@/views/Center/AddBlog'),
            },
            {
                path: '/center/deleteBlog',
                component: () => import('@/views/Center/DeleteBlog'),
            }
        ]
    },
    {
        path: '/detail',
        component: () => import('@/views/Detail'),
    }
]