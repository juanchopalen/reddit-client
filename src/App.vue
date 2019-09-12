<template>
  <div id="app">
    <posts msg="Welcome to VueJS Front-end Test"/>
  </div>
</template>

<script>
import Posts from './components/Posts.vue'
import Post from './components/Post.vue'

export default {
  name: 'app',
  components: {
    Posts,
    Post,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
