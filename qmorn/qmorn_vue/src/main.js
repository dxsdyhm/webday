import Vue from 'vue'

import router from './router/router'
//element
//import ElementUI from 'element-ui';
import Message from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//Vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import store from './store'
import api from './request/api'
import QmornToolBar from './components/QmornToolBar.vue'
import WebView from './components/WebView.vue'
import App from './App.vue'

import filters from './filter/filter.js';

Vue.config.productionTip = false
Vue.prototype.$api = api;

//Vue.use(ElementUI);
Vue.use(Message)
Vue.component('qmorntoolbar',QmornToolBar)
Vue.component('webview',WebView)

Vue.use(Vuetify,{
	theme:{
		primary:'#F48FB1',
	}
})
Object.keys(filters).forEach(key => {  
  Vue.filter(key, filters[key])  
}) 

new Vue({
  render: h => h(App),
	router,
	store,
}).$mount('#app')
