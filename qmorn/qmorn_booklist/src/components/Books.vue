<template>
	<div>
		<div class="container">
			<BookList :booksort="sort"></BookList>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'books',
		data() {
			return {
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
