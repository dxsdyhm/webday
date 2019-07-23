import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
