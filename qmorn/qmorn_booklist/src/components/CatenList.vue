<template>
	<div>
		<QmornToolBar title='系列图书'></QmornToolBar>
		<br />
		<div class="container">
			<div class="row justify-content-start">
				<Book v-for="(book,index) in getBookSeris" :key="index" @click.native="toSeris(book)" :book="book"></Book>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	export default {
		name: 'catenlist',
		data() {
			return {
			}
		},
		methods: {
			toSeris(book) {
				this.$router.push({
					name: 'bookcatena',
					params: {
						'book': book
					}
				})
			}
		},
		computed: {
			...mapGetters({
				getBookSeris: 'getBookSeris',
			}),
		},
	}
</script>

<style>
	.title {
		color: #FFFFFF;
	}
</style>
