import Vue from "vue"
import VueRouter from "vue-router"
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/home'
import Qa from '@/views/qa'
import Video from '@/views/video'
import My from '@/views/my'
import Search from '@/views/search'
import Article from '@/views/article'
import Userprofile from '@/views/user-profile'
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/layout',
        component: Layout,
        children: [
            {
                path: '/',
                redirect: '/home',
            },
            {
                path: '/home',
                name: 'home',
                component: Home,
            },
            {
                path: '/qa',
                name: 'qa',
                component: Qa,
            },
            {
                path: '/video',
                name: 'video',
                component: Video,
            },
            {
                path: '/my',
                name: 'my',
                component: My,
            },


        ]
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    {
        path: '/article/:articleId',
        name: 'article',
        component: Article,
        props: true,//开启 props 传参,说白了就是把路由参数映射到组件的props组件中
    },
    {
        path: '/user/profile',
        name: 'user-profile',
        component: Userprofile
    },
]

const router = new VueRouter({
    routes
})

export default router