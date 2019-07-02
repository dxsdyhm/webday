import Vue from 'vue'
import Vuex from 'vuex'
import { activeUser } from './modules/userModules.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    activeUser: activeUser
  },
  strict: process.env.NODE_ENV !== 'production'
})

if (module.hot) {
  module.hot.accept(['./modules/userModules'], () => {
	const newActiveUser = require('./modules/userModules').default
    store.hotUpdate({
	  modules: {
	    activeUser: newActiveUser
	  }
    })
  })
}

export default store