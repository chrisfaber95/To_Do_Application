import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		todo: Object.create(null),
		theme: 'dark'
	},
	mutations: {
		addListItem(state, payload){
			Vue.set(state.todo, payload.id, payload)
			Vue.delete(state.todo, undefined)
			localStorage.setItem('listitems', JSON.stringify(state.todo))
		},
		updateListItem(state, payload){
			state.todo[payload.id] = payload	
			Vue.delete(state.todo, undefined)
			localStorage.setItem('listitems', JSON.stringify(state.todo))
		},
		deleteListItem(state,payload){
			Vue.delete(state.todo, payload.id)
			Vue.delete(state.todo, undefined)
			localStorage.setItem('listitems', JSON.stringify(state.todo))
		},
		reloadListItems(state){
			state.todo = JSON.parse(localStorage.getItem('listitems'))
		},
		reloadTheme(state){
			state.theme = localStorage.getItem('theme')
		},
		updateTheme(state, payload){
			state.theme = payload
            localStorage.setItem("theme", payload);
		}
	},
	actions: {
	},
	modules: {
	},
	getters: {
		getCard: (state) => (id) => {
			return state.todo[id]
		}
	}       
})
