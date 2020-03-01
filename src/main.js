import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import ElementUI  from 'element-ui'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/normlize.css'
import store from './store/index'

Vue.use(ElementUI);
Vue.use(VueAxios,axios)
Vue.config.productionTip = false


router.beforeEach((to,from,next)=>{
  console.log(store.state,"store.state")
  next()
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
