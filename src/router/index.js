import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import IndexPage from '../views/IndexPage/IndexPage.vue'
import ArticleView from '../views/Article/ArticleView.vue'
import Editor from '../components/MarkDownEdit/Editor.vue'
import UserCenter from '@/views/User/UserCenter.vue'
import UserInfo from '@/views/User/UserInfo.vue'
import Published from '@/views/Result/Published.vue'
import {
    getToken
} from '@/utils/auth'
import store from '@/store'

Vue.use(VueRouter)


//vue中路由跳转时，同一个路由多次添加是不允许的，重写push
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
const routes = [{
        path: '/Login',

    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: '/index',

        children: [{
            path: '/index',
            meta: {
                title: "首页"
            },
            component: IndexPage
        }, {
            path: '/article',
            component: ArticleView
        }, {
            path: '/publish',
            component: Editor,
            meta: {
                requiresAuth: true
            }
        }, {
            path: '/user',
            component: UserCenter,
            meta: {
                requiresAuth: true,
                title: '用户中心'
            }
        }, {
            path: '/userInfo',
            component: UserInfo,
            meta: {
                requiresAuth: true
            }
        }, {
            path: '/published',
            component: Published
        }]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

router.beforeEach(async (to, from, next) => {
    let token = getToken();

    if (to.meta.title) {
        document.title = to.meta.title
    }

    console.log(to.path)

    if (token && !store.getters.name) {
        await store.dispatch("user/getInfo", token)
        console.log("获取用户信息")
    }
    if (to.path == "/publish" && store.getters.name) {
        await store.dispatch("header/initHeader", false)
    } else {
        await store.dispatch("header/initHeader", true)
    }


    if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
        //避免在首页时不跳转
        location = '/index'
        // next({
        //     path: '/index',
        //     query: {
        //         redirect: to.fullPath
        //     }
        // })
    } else {
        next()
    }
})
export default router