<template>
	<div class="post-preview" v-if="post">
		<h1>{{ post.data.author }}</h1>
		<img class="post-img" :src="getFullImage(post)">
		<p>
			{{ post.data.title }}
		</p>
		<button class="btn-image" @click="saveImage(post)" v-if="getFullImage(post) != '/img/empty.png'"><i class="fas fa-trash"></i> Save to gallery</button>
		<a href="#" class="close-post" @click="setPost(null)"><i class="fas fa-times"></i></a>
	</div>
</template>

<script>
	export default {
		props: ['post'],
		methods: {
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
