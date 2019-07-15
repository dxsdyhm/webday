import Vue from 'vue'
import routes from './paths'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default new VueRouter({
	routes,
	// strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, fro, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (fro.meta.keepAlive) {
				fro.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})
