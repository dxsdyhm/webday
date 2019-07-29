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
	  path: '/bookcatena',
	  name: 'bookcatena',
	  component: require('@/components/BookCatena').default
	},
	{
	  path: '/catenalist',
	  name: 'catenalist',
	  component: require('@/components/CatenList').default
	},
	{
	  path: '/searchresult',
	  name: 'searchresult',
	  component: require('@/components/SearchResult').default
	},
    {
      path: '*',
      redirect: '/'
    }
  ]
})
