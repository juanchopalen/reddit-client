<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      This test retrieve the latests top posts from <a href="https://www.reddit.com/top">Reddit</a>
    </p>
    <h3>Posts list</h3>
    <button class="btn-delete" @click="removeAll">Remove All</button>

    <div class="container">
		<div v-if="posts.length == 0" class="container">
			<h2>Posts List Empty</h2>
		</div>
		<div v-else class="post-container">
	        <ul>
	          <li v-for="(post, index) in posts" :key="index" v-if="index > count * page - count && index < count * page">
				<a href="##" rel="noopener" @click="setPost(post)" :class="post.data.clicked ? 'readed' : ''">
					<p>Date: {{ getDate(post) }}</p>
					<img class="thumbnail" :src="getThumbnail(post)">
					<p>Author: {{ post.data.author  }}</p>
					<p> Name: {{ post.data.name  }}</p>
					<p> #Comments: {{ post.data.num_comments  }}</p>
				</a>
				<button class="btn-delete" @click="removePost(post)">Remove</button>
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
	            <button class="btn-image" @click="saveImage(post)" v-if="getFullImage(post) != '/img/empty.png'">Save to gallery</button>
	        </div>
		</div>

        <div class="gallery-container">
        	<h1>Gallery</h1>
        	<div class="images-container">
        		<img :src="image" v-for="(image, index) in gallery"/>
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
        post: null,
        page: 1,
        count: 5,
    }
  },
	created(){
		this.$store.dispatch('getPosts')
		.then(() => {
			this.setFirstPost()
		})
	},
  methods: {
  	setFirstPost(){
  		this.setPost(this.posts[0])
  	},
	setPost(post) {
		this.post = post
		this.$store.dispatch('readPost', post)
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
		this.setFirstPost()
	},
	removeAll(){
		this.$store.dispatch('removeAll')
	},
	setPage(page){
		this.page = page
	},
	saveImage(post) {
		this.$store.dispatch('saveImage', this.getFullImage(post))
	}
  },
  computed: {
    posts() {
        return this.$store.getters.getPosts
    },
    gallery() {
        return this.$store.getters.getGallery
    },
    pagesCount(){
    	let count = this.posts.length / this.count
    	let integerCount = count >> 0
    	return count > integerCount ? integerCount + 1 : count
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
.container {
    display: flex;
}
.post-container{
	display: flex;
	width: 80%;
}
ul {
	list-style-type: none;
	padding: 0;
	width: 30%;
}
li {
	margin: 0;
	padding: 20px 0;
}
.container a {
	background-color: #ccc;
	display: flex;
	flex-flow: column;
	color: #42b983;
	text-align: left;
	text-decoration: none;
}
.thumbnail {
	position: relative;
	left: 0;
	width: 20%;
	height: auto;
}
.post-preview {
	width: 70%;
}

.post-img {
	width: 50%;
}

.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}
a.active {
	background-color: #42b983;
}
a.readed {
	background-color: #42b983;
	color: #ccc;
}

.gallery-container {
	width: 20%;
}
.images-container {
	display: flex;
	flex-flow: column;
	align-items: center;
}
.images-container img {
	padding: 10px;
	width: 50%;
}
</style>
