<template>
	<div class="post-preview" v-if="post">
		<h1>{{ post.data.author }}</h1>
		<img class="post-img" :src="getFullImage(post)">
		<p>
			{{ post.data.title }}
		</p>

		<i class="fas fa-save" @click="saveImage(post)" v-if="getFullImage(post) != '/img/empty.png'" title="Save to gallery"></i>

		<a href="#" class="close-post" @click="closePost"><i @click="closePost" class="fas fa-times"></i></a>
	</div>
</template>

<script>
	export default {
		props: ['post'],

		methods: {
			closePost(){
				this.$store.dispatch('setPost', null)
			},

			saveImage(post) {
				let img = {
					url: this.getFullImage(post),
					title: this.post.data.name,
				}
				this.$store.dispatch('saveImage', img)
			},

			getFullImage(post) {
				return this.isImage(post.data.url) ? post.data.url : this.getThumbnail(post)
			},

			getThumbnail(post) {
				return post.data.thumbnail ? post.data.thumbnail : '/img/empty.png'
			},

			isImage(url){
				let extensions = ['jpg', 'jepg', 'png', 'gif', 'svg']
				for (let i in extensions) {
					return url.includes(extensions[i])
				}
				return
			},
		},
	}
</script>
