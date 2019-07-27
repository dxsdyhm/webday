<template>
	<div class="container">
		<br />
		<div class="jumbotron bg-info text-white">
			<div class="container">
				<h1 class="display-5">启萌星</h1>
				<p class="lead">海量绘本资源，为小朋友提供优质绘本阅读体验！</p>
			</div>
		</div>
		<div class="col px-0">
			<div class="row lable align-items-center mb-2">
				<h5 class="col-9 text-justify">系列图书</h5>
				<div class="col-2 pr-0 text-right" @click="catena">更多</div>
				<i class="material-icons" @click="catena">chevron_right</i>
			</div>
			<div class="row justify-content-start">
				<Book v-for="(book,index) in getbook.slice(0,6)" :key="index" @click.native="singlelist(book)" :book="book"></Book>
			</div>
		</div>
		<hr />
		<div class="col px-0">
			<div class="row lable align-items-center mb-2">
				<h5 class="col-12 text-justify">精品图书</h5>
				<!-- <div class="col-2 pr-0 text-right" @click="singlelist">更多</div>
				<i class="material-icons" @click="singlelist">chevron_right</i> -->
			</div>
			<div class="row justify-content-start">
				<Book v-for="(book,index) in getBookSingle" :key="index" @click.native="toSigleBook(book)" :book="book"></Book>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	export default {
		name: 'bookhome',
		data() {
			return {
				keywords: '我'
			}
		},
		mounted: function() {
			this.search();
		},
		methods: {
			search() {
				this.$http({
						method: 'post',
						// url: 'https://dev.oss.qmorn.com/qmorn/oss/app/res/book/search',
						url: '/res/book/recommend',
					})
					.then(response => {
						
						let test1=response.data.data.seriseBooks.concat(response.data.data.seriseBooks).concat(response.data.data.seriseBooks)
						let test2=response.data.data.books.concat(response.data.data.books).concat(response.data.data.books)
						// this.$store.commit('updateserisBook', response.data.data.seriseBooks)
						// this.$store.commit('updateHomeBook', response.data.data.books)
						console.log(test1)
						this.$store.commit('updateserisBook', test1)
						this.$store.commit('updateHomeBook', test2)
					})
					.catch(function(error) {
						console.log(error)
					})
			},
			toSigleBook(book) {
				this.$router.push({
					name: 'bookdetail',
					params: {
						'book': book
					}
				})
			},
			catena() {
				this.$router.push({
					name: 'catenalist',
				})
			},
			singlelist(book) {
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
				getbook: 'getBookSeris',
				getBookSingle: 'getBookSingle',
			}),
		},
	}
</script>

<style>
	.lable {
		height: 3rem;
	}
</style>
