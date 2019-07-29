<template>
	<div>
		<QmornToolBar title='搜索结果'></QmornToolBar>
		<br />
		<div class="container">
			<div class="input-group">
				<input type="text" class="form-control" placeholder="书名或者ISBN" v-model="keywords" @keyup.enter="searchbykey" />
				<div class="input-group-append">
					<span class="input-group-text" id="basic-addon2" @click="searchbykey">
						<i class="material-icons">search</i>
					</span>
				</div>
			</div>
			<br />
			<div class="col px-0">
				<div class="row justify-content-start">
					<Book v-for="(book,index) in books" :key="index" @click.native="toSigleBook(book)" :book="book"></Book>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'searchresult',
		data() {
			return {
				keywords: this.$route.params.keywords,
				books: this.$route.params.books,
			}
		},
		activated() {
			if (!!this.$route.params.keywords) {
				this.keywords = this.$route.params.keywords;
					this.books = this.$route.params.books;
			}
		},
		methods: {
			toSigleBook(book) {
				this.$router.push({
					name: 'bookdetail',
					params: {
						'book': book
					}
				})
			},
			searchbykey() {
				this.$http({
					method: 'post',
					baseURL: 'https://api1.q-links.net:10081',
					// url: 'https://dev.oss.qmorn.com/qmorn/oss/app/res/book/search',
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
						this.books = books;
					}
				}).catch(function(error) {
					console.log(error)
				})
			}
		},
	}
</script>

<style>
</style>
