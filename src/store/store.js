import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		posts: [],
		gallery: [],
	},
	actions: {
	    getPosts(context, params){
			if (context.state.posts == []) {
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
			}
	    },
	    removePost(context, payload) {
			context.commit('removePost', payload)
	    },
	    removeAll(context) {
			context.commit('removeAll')
	    },
	    readPost(context, payload){
			context.commit('readPost', payload)
	    },
	    saveImage(context, payload){
			context.commit('saveImage', payload)
	    }
	},
	mutations: {
		getPosts(state, payload) {

			state.posts = payload.children
		},
		removePost(state, payload){
			let index = state.posts.findIndex(post => post.data.id == payload.data.id)
			state.posts.splice(index, 1);
		},
		removeAll(state){
			state.posts = [];
		},
		readPost(state, payload){
			let index = state.posts.findIndex(post => post.data.id == payload.data.id)
			state.posts[index].data.clicked = true
		},
		saveImage(state, payload) {
			state.gallery.push(payload)
		},
	},
	getters: {
		getPosts: state => state.posts,
		getGallery: state => state.gallery
	},
	plugins: [createPersistedState()]
})
