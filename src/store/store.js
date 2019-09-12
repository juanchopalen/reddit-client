import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		posts: [],
		post: null,
		gallery: [],
		page: 1,
		count: 5,
	},
	actions: {
		getPosts(context){
			if (context.state.posts.length  == 0) {
				return new Promise((resolve, reject)=> {
					axios.get('/top.json')
						.then(response => {
							context.commit('getPosts', response.data.data)
							context.state.loading = false
							resolve(response)
						})
						.catch(error => {
							reject(error)
					})
				})
			}
		},

		setPost(context, payload){
			context.commit('setPost', payload)
		},

		removePost(context, payload) {
			context.commit('removePost', payload)
		},

		removeAll(context) {
			context.commit('removeAll')
		},

		saveImage(context, payload){
			context.commit('saveImage', payload)
		},

		setPage(context, payload){
			context.commit('setPage', payload)
		},
	},
	mutations: {
		getPosts(state, payload) {
			state.posts = payload.children
		},

		setPost(state, payload){
			state.post = payload
			if (payload) {
				state.post.data.clicked = true
			}
		},

		removePost(state, payload){
			let index = state.posts.findIndex(post => post.data.id == payload.data.id)
			state.posts.splice(index, 1);
		},

		removeAll(state){
			state.posts = [];
		},

		saveImage(state, payload) {
			state.gallery.push(payload)
		},

		setPage(state, payload) {
			state.page = payload
		},
	},

	getters: {
		getPosts: state => state.posts,
		getPost: state => state.post,
		getGallery: state => state.gallery,
		getPage: state => state.page,
		getCount: state => state.count,
	},

	plugins: [createPersistedState()]
})
