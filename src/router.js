import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './pages/inedx.vue'
import Cart from './pages/cart.vue'
import UserCenter from './pages/center.vue'

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        name:'index',
        component:Index
    },
    {
        path:'/cart',
        name:'cart',
        component:Cart
    },
    {
        path:'/center',
        name:'center',
        component:UserCenter
    },
]

const router = new VueRouter({
    routes
})

export default router