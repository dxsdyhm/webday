<template>
	<div>
		<div class="container">
			<BookList :booksort="sort" :url="url"></BookList>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'bookteachmateral',
		data() {
			return {
				url:'/res/book/recommend/serise/search',
				sort: this.$route.params.sortname,
			}
		},
		mounted: function() {},
		methods: {
			
		},
	}
</script>

<style>
</style>
