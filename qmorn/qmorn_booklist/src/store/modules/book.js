const state = {
	books: [],
	booksingle: [],
	bookseris:{},
	currentlisttype:'main',
	types: [{
			type: 'seriseBooks',
			name: '系列图书',
			number: 6
		},
		{
			type: 'cards',
			name: '益智卡片',
			number: 6
		},
		{
			type: 'textbooks',
			name: '全国教材',
			number: 6
		},
		{
			type: 'books',
			name: '精品图书',
			number: 48
		}
	],
}

const mutations = {
	updateHomeBook(state, data) {
		state.booksingle = data;
	},
	updateserisBook(state, data) {
		state.books = data;
	},
	saveserisbooklist(state, data){
		state.bookseris[data.seriseId]=data.books
	},
	updatecurrentlisttype(state, data){
		state.currentlisttype=data
	}
}

const getters = {
	getBookSingle(state) {
		return state.booksingle;
	},
	getBookSeris(state) {
		return state.books;
	},
	getBookSerisbyid:(state)=>(serisId)=> {
		return state.bookseris[serisId];
	},
	getcurretnbooklist(state){
		return state.currentlisttype
	},
	gettypes(state){
		return state.types
	}
}

const actions = {
	getHomeBook({
		commit,
		state
	}, param) {
		// do something async
		commit('updateHomeBook')
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}
