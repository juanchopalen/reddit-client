<template>
  <div>
    <h2>
      VueJs Front-end Test
    </h2>

    <h3>Developed by <a href="http://klaustro.net" target="blank">Juan Palencia</a></h3>

    <div class="container">
		<div v-if="posts.length > 0" class="post-container">
			<list></list>
			<post
				:post="post"
			></post>
		</div>

		<gallery
			:gallery="gallery"
		></gallery>
    </div>

    <div class="tools-container">
		<pagination></pagination>
		<p><i class="fas fa-trash delete-all" @click="removeAll" title="Remove All posts"></i></p>
    </div>


  </div>
</template>

<script>
	import List from './List'
	import Post from './Post'
	import Gallery from './Gallery'
	import Pagination from './Pagination'

	export default {
		name: 'Reddit-Posts',

		components: {
			List,
			Post,
			Gallery,
			Pagination
		},

		props: {
			msg: String
		},

		created(){
			this.$store.dispatch('getPosts')
		},

		methods: {
			removeAll(){
				this.$store.dispatch('removeAll')
			},
		},

		computed: {
			posts() {
				return this.$store.getters.getPosts
			},

			post() {
				return this.$store.getters.getPost
			},

			gallery() {
				return this.$store.getters.getGallery
			},

			page() {
				return this.$store.getters.getPage
			},

			count() {
				return this.$store.getters.getCount
			},
		}
	}
</script>
