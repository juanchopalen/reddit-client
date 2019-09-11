import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		posts: ''
	},
	actions: {
	    getPosts(context, params){
	        context.state.loading = true
			return new Promise((resolve, reject)=> {
				axios.get('http://localhost:8080/top.json')
					.then(response => {
						context.commit('getPosts', response.data.data)
						context.state.loading = false
						resolve()
					})
					.catch(error => {
						console.log(error)
						reject()
				})
			})
	    },
	},
	mutations: {
		getPosts(state, payload) {

			state.posts = payload.children
		}
	},
	getters: {
		getPosts: state => state.posts
	}
})
