import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'bookhome',
      component: require('@/components/BookHome').default
    },
	{
	  path: '/bookdetail',
	  name: 'bookdetail',
	  component: require('@/components/BookDetails').default
	},
    {
      path: '*',
      redirect: '/'
    }
  ]
})
