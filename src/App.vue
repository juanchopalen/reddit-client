<template>
  <div id="app">
    <index msg="Welcome to VueJS Front-end Test"/>
  </div>
</template>

<script>
import Index from './components/Index.vue'
import List from './components/List.vue'
import Post from './components/Post.vue'
import Gallery from './components/Gallery.vue'

export default {
  name: 'app',
  components: {
    Index,
    List,
    Post,
    Gallery,
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
