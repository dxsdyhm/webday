import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import Book from './components/Book.vue'
import filters from './filters/filter.js';

import QmornToolBar from './components/MdTitle.vue'
import booklist from './components/BookSort.vue';

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(BootstrapVue)
Vue.component('Book',Book)
Vue.component('QmornToolBar',QmornToolBar)
Vue.component('BookList',booklist)

Object.keys(filters).forEach(key => {  
  Vue.filter(key, filters[key])  
}) 

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
