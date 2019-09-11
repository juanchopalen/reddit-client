<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      This test retrieve the latests top posts from <a href="https://www.reddit.com/top">Reddit</a>
    </p>
    <h3>Posts list</h3>
    <div class="container">
        <ul>
          <li v-for="(post, index) in posts" :key="index">
            <a href="#" rel="noopener" @click="setPost(post)">
            	<img class="thumbnail" :src="getThubnail(post)">
            	<p>Author: {{ post.data.author  }}</p>
            	<p> Name: {{ post.data.name  }}</p>
            </a>
        </li>
        </ul>
        <div class="post-preview" v-if="post">
            <h1>{{ post.data.author }}</h1>
            <img class="post-img" :src="getThubnail(post)">
            <p>
                {{ post.data.title }}
            </p>
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
        post: null
    }
  },
  created(){
    this.$store.dispatch('getPosts')
    	.then(response => {
    		this.setPost(this.posts[0])
    	})
  },
  methods: {
	setPost(post) {
		this.post = post
	},
	getThubnail(post) {
		return post.data.thumbnail ? post.data.thumbnail : '/img/empty.png'
	}
  },
  computed: {
    posts() {
        return this.$store.getters.getPosts
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
</style>
