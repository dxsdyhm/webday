import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'

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
Vue.use(VueRouter)
Vue.use(Vuetify,{
	theme:{
		primary:'#F48FB1',
		// primary:'#FFA114',
	}
})
Object.keys(filters).forEach(key => {  
	console.log(key)
  Vue.filter(key, filters[key])  
}) 
const router = new VueRouter({
	routes,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})
new Vue({
  render: h => h(App),
	router,
	store,
}).$mount('#app')
