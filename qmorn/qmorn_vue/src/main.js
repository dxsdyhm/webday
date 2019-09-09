import Vue from 'vue'

import router from './router/router'
//element
import {
	Message
} from 'element-ui';
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
import {
	iotinit,
	disconnect
} from './aliiot/iot.js';
import weixin from './weixin/weixin.js';
// import VueQriously from 'vue-qriously'
import('vue-qriously').then(VueQriously=>{
	Vue.use(VueQriously)
})
if (weixin.isWeixin()) {
	import('weixin-js-sdk').then(wx => {
		Vue.prototype.$wx = wx;
	})
}
Vue.config.productionTip = false
Vue.prototype.$api = api;

Vue.use(Message)
Vue.prototype.$message = Message;
Vue.component('qmorntoolbar', QmornToolBar)
Vue.component('webview', WebView)

const opts = {
	theme: {
		dark: false,
		themes: {
			light: {
				primary: '#f39c22',
			},
			dark: {
				primary: '#f39c22',
			}
		}
	}
}
Vue.use(Vuetify)

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

router.beforeResolve((to, from, next) => {
	//检查用户登陆信息，如果存在，则处理存在的信息
	if (store.getters.getUserInfo) {
		//已经登陆
		//如果不存在，则处理登陆
		if (from.path === '/user' && to.path === '/main/device') {
			//登陆成功，执行iot初始化
			Vue.prototype.$iotdevice = iotinit();
		}
	} else {
		//未登陆
		disconnect();
		if (to.path === '/') {
			if (weixin.isWeixin()) {
				next('/weixin')
			} else {
				next({
					path: '/user',
					query: {
						logintype: '0'
					}
				})
			}
		}
	}
	next()
})

new Vue({
	render: h => h(App),
	router,
	store,
	vuetify: new Vuetify(opts)
}).$mount('#app')
