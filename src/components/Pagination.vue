<template>
	<div class="pagination">
		<a href="##" @click="setPage(page-1)" v-if="page > 1 && pagesCount > 0">&laquo;</a>
		<a href="##" v-for="i in pagesCount" @click="setPage(i)" :class="page == i ? 'active' : ''" :key="i">{{ i }}</a>
		<a href="##" @click="setPage(page+1)" v-if="page < pagesCount">&raquo;</a>
	</div>
</template>

<script>
	export default {
		methods: {
			setPage(page){
				this.$store.dispatch('setPage', page)
			}
		},
		computed: {
			posts() {
				return this.$store.getters.getPosts
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
