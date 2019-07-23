const state = {
	books: [],
	booksingle: []
}

const mutations = {
	updateHomeBook(state, data) {
		state.booksingle = data;
	},
}

const getters = {
	getBookSingle(state) {
		return state.booksingle;
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
