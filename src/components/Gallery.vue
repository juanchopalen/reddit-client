<template>
	<div class="gallery-container" :style="posts.length == 0 ? 'width: 100%' : ''">

		<h1>Gallery</h1>

		<div class="images-container" :class="posts.length == 0 ? 'full' : ''">
			<div class="polaroid" v-for="(image, index) in gallery">
				<img :src="image.url"/>
				<div class="p-container">
					<p>{{ image.title }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['gallery'],

		computed: {
			posts() {
				return this.$store.getters.getPosts
			},

		}
	}
</script>
