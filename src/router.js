import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './pages/inedx.vue'
import Cart from './pages/cart.vue'
import UserCenter from './pages/center.vue'
import Security from './pages/center/security'
import Identify from './pages/center/identify'
import Wallet from './pages/center/wallet'
import Follow from './pages/center/follow'
import History from './pages/center/history'
import LiveInfo from './pages/center/live-info'
import LiveSettings from './pages/center/live-settings'
import Overview from './pages/center/overview'
import GiftList from './pages/center/gift-list'
import DanMu from './pages/center/dan-mu'
import Punishment from './pages/center/punishment'

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
                component: Security
            },
            {
                path: 'security',
                component: Security
            },
            {
                path: 'identify',
                component: Identify
            },
            {
                path: 'wallet',
                component: Wallet
            },
            {
                path: 'follow',
                component: Follow
            },
            {
                path: 'history',
                component: History
            },
            {
                path: 'live-info',
                component: LiveInfo
            },
            {
                path: 'live-settings',
                component: LiveSettings
            },
            {
                path: 'overview',
                component: Overview
            },
            {
                path: 'live-settings',
                component: LiveSettings
            },
            {
                path: 'gift-list',
                component: GiftList
            },
            {
                path: 'dan-mu',
                component: DanMu
            },
            {
                path: 'punishment',
                component: Punishment
            }
        ]
    },
]

const router = new VueRouter({
    routes
})

export default router