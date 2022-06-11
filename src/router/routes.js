export default [
    //重定向,在项目跑起来的时候，访问/，立马定向到首页
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('@/views/Home'),
        meta: {
            keepAlive: true,
            scrollTop: 0,
        }
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
            },
            {
                path: '/center/editBlog',
                component: () => import('@/views/Center/EditBlog'),
            }
        ]
    },
    {
        path: '/detail',
        component: () => import('@/views/Detail'),
    },
    {
        path: '/blog',
        component: () => import('@/views/Blog'),
        meta: {
            keepAlive: true,
            scrollTop: 0,
        }
    },
    {
        path: '/life',
        component: () => import('@/views/Life'),
        meta: {
            keepAlive: true,
            scrollTop: 0,
        }
    },
    {
        path: '/messageboard',
        component: () => import('@/views/MessageBoard'),
    }
]