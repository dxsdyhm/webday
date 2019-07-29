<template>
	<div>
		<nav class="navbar navbar-dark bg-info justify-content-between sticky-top d-none d-lg-block d-xl-block">
			<div class="container">
				<a class="navbar-brand text-white">
					<img src="../assets/logo.svg" width="40" height="40" class="d-inline-block mr-3" alt="">启萌星</a>
				<div class="form-inline">
					<input class="form-control mr-sm-2" type="search" v-model="keywords" placeholder="输入书名或者ISBN" aria-label="Search"
					 @keyup.enter="searchbykey">
					<i class="material-icons text-light" @click="searchbykey">search</i>
				</div>
			</div>
		</nav>
		<div class="container">
			<br />
			<div class="jumbotron bg-info text-white">
				<div class="container">
					<h1 class="display-5">绘本大全</h1>
					<p class="lead">海量人声绘本，让小朋友远离屏幕回归书本！</p>
				</div>
			</div>
			<div class="col px-0">
				<div class="row lable align-items-center justify-content-between mb-2">
					<h5 class="col text-justify">系列图书</h5>
					<div class="col-auto d-inline-flex" @click="catena">
						<div class="d-inline-block">更多</div>
						<i class="material-icons pr-0">chevron_right</i>
					</div>
				</div>
				<div class="row">
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
				keywords: ''
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
						baseURL:'https://api1.q-links.net:10081',
						url: '/res/book/recommend',
					})
					.then(response => {
						// let test1 = response.data.data.seriseBooks.concat(response.data.data.seriseBooks).concat(response.data.data.seriseBooks)
						// let test2 = response.data.data.books.concat(response.data.data.books).concat(response.data.data.books)
						// console.log(test1)
						// this.$store.commit('updateserisBook', test1)
						// this.$store.commit('updateHomeBook', test2)
						this.$store.commit('updateserisBook', response.data.data.seriseBooks)
						this.$store.commit('updateHomeBook', response.data.data.books)
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
			},
			searchbykey() {
				this.$http({
					method: 'post',
					baseURL:'https://api1.q-links.net:10081',
					url: '/res/book/recommend/search',
					data: {
						key: this.keywords
					}
				}).then(response => {
					let books = response.data.data.books
					if (books.length <= 0) {
						//提示
						alert('没有找到书本')
					} else {
						//跳转到搜索结果页
						this.$router.push({
							name: 'searchresult',
							params: {
								keywords:this.keywords,
								'books': books
							}
						})
					}
				}).catch(function(error) {
					console.log(error)
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
