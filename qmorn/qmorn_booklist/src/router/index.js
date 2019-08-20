import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	base: './',
	routes: [{
			path: '/home',
			name: 'home',
			component: require('@/components/Home').default,
			children: [{
				path: '/home/main',
				name: 'main',
				component: require('@/components/BookHomeS').default
			}, {
				path: '/home/series',
				name: 'series',
				component: require('@/components/BookSeries').default
			}, {
				path: '/home/card',
				name: 'card',
				component: require('@/components/BookCard').default
			}, {
				path: '/home/teachmaterial',
				name: 'teachmaterial',
				component: require('@/components/BookTeachmaterial').default
			}, {
				path: '/home/books',
				name: 'books',
				component: require('@/components/Books').default
			}]
		},
		{
			path: '/bookhome',
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
			redirect: '/home'
		}
	]
})
