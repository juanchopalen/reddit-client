<template>
<ul>
	<template v-for="(post, index) in posts">
		<li v-if="canShowed(index)" :class="isCurrent(post) ? 'current-post' : ''" :key="index">
			<div class="post-link" rel="noopener" @click="setPost(post)">
				<div class="post-image">
					<img class="thumbnail" :src="getThumbnail(post)">
					<i class="fas fa-trash" @click="removePost(post)" title="Remove Post"></i>
					<i class="fas fa-eye readed" v-if="post.data.clicked" title="Post Read"></i>
					<i class="fas fa-eye-slash readed" v-else title="Post Unread"></i>
				</div>
				<div class="post-details">
					<p>Date: {{ getDate(post) }}</p>
					<p>Author: {{ post.data.author  }}</p>
					<p> Name: {{ post.data.name  }}</p>
					<p> #Comments: {{ post.data.num_comments  }}</p>
				</div>
			</div>
		</li>
	</template>
</ul>
</template>

<script>
	export default {
		methods: {
			setPost(post) {
				this.$store.dispatch('setPost', post)
			},

			removePost(post){
				this.$store.dispatch('removePost', post)
				this.post = null
				if (this.pagesCount < this.page) {
					this.$store.dispatch('setPage', this.pagesCount)
				}
			},

			getDate(post) {
				const moment = require('moment')
				let date = moment(post.data.created)
				return moment(date, "YYYYMMDD").fromNow();
			},

			getThumbnail(post) {
				return post.data.thumbnail ? post.data.thumbnail : '/img/empty.png'
			},

			isCurrent(post) {
				return this.post === post
			},
			canShowed(index){
				return (index >= this.count * this.page - this.count) && (index < this.count * this.page)
			},
		},
		computed: {
			posts() {
				return this.$store.getters.getPosts
			},
			post() {
				return this.$store.getters.getPost
			},
			page() {
				return this.$store.getters.getPage
			},
			count() {
				return this.$store.getters.getCount
			},
			pagesCount(){
				let count = this.posts.length / this.count
				let integerCount = count >> 0
				return count > integerCount ? integerCount + 1 : count
			},
		}
	}
</script>
