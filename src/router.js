import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './pages/inedx.vue'
import Cart from './pages/cart.vue'
import UserCenter from './pages/center.vue'
import Test1 from './components/Test1.vue'
import Test2 from './components/Test2.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart
    },
    {
        path: '/center',
        name: 'center',
        component: UserCenter,
        children: [
            {
                path: '',
                component: Test1
            },
            {
                path: 'live-center',
                component: Test1
            },
            {
                path: 'auth-center',
                component: Test2
            }
        ]
    },
]

const router = new VueRouter({
    routes
})

export default router