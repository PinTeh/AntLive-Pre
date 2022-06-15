import Vue from 'vue'
import VueRouter from 'vue-router'
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
import AdminCenter from './pages/admin'
import AdminDashboard from './pages/admin/dashboard'

Vue.use(VueRouter)

const routes = [    
    {
        path: '/',
        name: 'center',
        component: ()=>import("./pages/index-center")
    },
    {
        path: '/live/:id',
        name: 'live',
        component: ()=>import("./pages/live")
    },
    {
        path: '/cart',
        name: 'cart',
        component: ()=>import("./pages/cart")
    },
    {
        path: '/login',
        name: 'login',
        component: ()=>import("./pages/login")
    },
    {
        path: '/register',
        name: 'register',
        component: ()=>import("./pages/register")
    },
    {
        path: '/recharge',
        name:'recharge',
        component: ()=>import("./pages/recharge")
    },
    {
        path: '/403',
        name:'403',
        component: ()=>import("./pages/error/403")
    },
    {
        path: '/admin',
        name: 'admin',
        component: AdminCenter,
        meta: { requiresAdmin: true },
        children:[
            {
                path:'',
                component:AdminDashboard,
            },
            {
                path:'dashboard',
                component:AdminDashboard
            },
            {
                path:'user-manage',
                component:()=>import("./pages/admin/user-manage")
            },
            {
                path:'user-auth',
                component:()=>import("./pages/admin/auth-manage")
            },
            {
                path:'data-analysis',
                component:()=>import("./pages/admin/user-manage")
            },
            {
                path:'system-settings',
                component:()=>import("./pages/admin/system-settings")
            },
            {
                path:'live-room-manage',
                component:()=>import("./pages/admin/live-room-manage")
            },
            {
                path:'bill',
                component:()=>import("./pages/admin/bill-manage")
            },
            {
                path:'live-info-manage',
                component:()=>import("./pages/admin/live-info-manage")
            },
            {
                path:'present-manage',
                component:()=>import("./pages/admin/present-manage")
            },
            {
                path:'live-ban-manage',
                component:()=>import("./pages/admin/live-ban-manage")
            },
            {
                path:'message-push',
                component:()=>import("./pages/admin/message-push")
            },
            {
                path:'system-monitor-host',
                component:()=>import("./pages/admin/system-monitor-host")
            },
            {
                path:'system-manage-menu',
                component:()=>import("./pages/admin/system/menu")
            },
            {
                path:'system-manage-role',
                component:()=>import("./pages/admin/system/role")
            },
            {
                path:'live-detect',
                component:()=>import("./pages/admin/live-detect")
            },
            {
                path:'user-role-manage',
                component:()=>import("./pages/admin/system/user-role")
            },
            {
                path:'snapshot-templates',
                component:()=>import("./pages/admin/snapshot-templates")
            },
            {
                path:'ban-record',
                component:()=>import("./pages/admin/ban-record")
            }
        ]
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
                path: 'info',
                component: ()=>import("./pages/center/info")
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
    // mode: 'history',
    routes
})

export default router