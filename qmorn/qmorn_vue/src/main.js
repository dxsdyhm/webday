import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import api from './request/api'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$api = api;

Vue.use(ElementUI);
Vue.use(VueRouter)

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
