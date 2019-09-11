<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      This test retrieve the latests top posts from <a href="https://www.reddit.com/top">Reddit</a>
    </p>
    <h3>Posts list</h3>
    <button class="btn-delete" @click="removeAll"><i class="fas fa-trash"></i> Remove All</button>

    <div class="container">
		<div v-if="posts.length == 0" class="container">
			<h2>Posts List Empty</h2>
		</div>
		<div v-else class="post-container">
	        <ul>
	          <li v-for="(post, index) in posts" :key="index" v-if="index > count * page - count && index < count * page" :class="isCurrent(post) ? 'current-post' : ''">
				<a href="##" rel="noopener" @click="setPost(post)" :class="post.data.clicked ? 'readed' : ''" >
					<div class="post-image">
						<img class="thumbnail" :src="getThumbnail(post)">
					</div>
					<div class="post-details">
						<p>Date: {{ getDate(post) }}</p>
						<p>Author: {{ post.data.author  }}</p>
						<p> Name: {{ post.data.name  }}</p>
						<p> #Comments: {{ post.data.num_comments  }}</p>
						<button class="btn-delete" @click="removePost(post)"><i class="fas fa-trash"></i> Remove</button>
					</div>
				</a>
	        </li>
	        <li>
	        	<div class="pagination">
					<a href="##" @click="setPage(page-1)" v-if="page > 1">&laquo;</a>
					<a href="##" v-for="i in pagesCount" @click="setPage(i)" :class="page == i ? 'active' : ''">{{ i }}</a>
					<a href="##" @click="setPage(page+1)" v-if="page < pagesCount">&raquo;</a>
				</div>
	        </li>
	        </ul>
	        <div class="post-preview" v-if="post">
	            <h1>{{ post.data.author }}</h1>
	            <img class="post-img" :src="getFullImage(post)">
	            <p>
	                {{ post.data.title }}
	            </p>
	            <button class="btn-image" @click="saveImage(post)" v-if="getFullImage(post) != '/img/empty.png'"><i class="fas fa-trash"></i> Save to gallery</button>
	            <a href="#" class="close-post" @click="setPost(null)"><i class="fas fa-times"></i></a>
	        </div>
		</div>

        <div class="gallery-container">
        	<h1>Gallery</h1>
        	<div class="images-container">
				<div class="polaroid" v-for="(image, index) in gallery">
					<img :src="image.url"/>
					<div class="p-container">
						<p>{{ image.title }}</p>
					</div>
			</div>
        	</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reddit-Posts',
  props: {
    msg: String
  },
  data(){
    return {
        page: 1,
        count: 5,
    }
  },
	created(){
		this.$store.dispatch('getPosts')
	},
  methods: {
	setPost(post) {
		this.$store.dispatch('setPost', post)
	},
	getThumbnail(post) {
		return post.data.thumbnail ? post.data.thumbnail : '/img/empty.png'
	},
	getFullImage(post) {
		return this.isImage(post.data.url) ? post.data.url : this.getThumbnail(post)
	},
	getDate(post) {
		let date = moment(post.data.created)
		return moment(date, "YYYYMMDD").fromNow();
	},
	isImage(url){
		let extensions = ['jpg', 'jepg', 'png', 'gif', 'svg']
		for (let i in extensions) {
			return url.includes(extensions[i])
		}
		return
	},
	removePost(post){
		this.$store.dispatch('removePost', post)
		this.post = null
	},
	removeAll(){
		this.$store.dispatch('removeAll')
	},
	setPage(page){
		this.page = page
	},
	saveImage(post) {
		let img = {
			url: this.getFullImage(post),
			title: this.post.data.name,
		}
		this.$store.dispatch('saveImage', img)
	},
	isCurrent(post) {
		return this.post === post
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
    pagesCount(){
    	let count = this.posts.length / this.count
    	let integerCount = count >> 0
    	return count > integerCount ? integerCount + 1 : count
    },
  }
}
</script>
