import Vue from 'vue'
import Vuex from 'vuex'
import {
	activeUser
} from './modules/userModules.js'
import {
	weixinState
} from './modules/weixinModules.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		activeUser: activeUser,
		weixinState: weixinState
	},
	strict: process.env.NODE_ENV !== 'production'
})

if (module.hot) {
	module.hot.accept(['./modules/userModules', './modules/weixinModules.js'], () => {
		const newActiveUser = require('./modules/userModules').default
		const newWeixinState = require('./modules/weixinModules.js').default
		store.hotUpdate({
			modules: {
				activeUser: newActiveUser,
				weixinState: weixinState
			}
		})
	})
}
export default store
