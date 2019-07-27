const state = {
	books: [],
	booksingle: [],
	bookseris:{}
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
