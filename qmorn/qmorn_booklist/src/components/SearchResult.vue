<template>
	<div class="container">
		<br />
		<div class="input-group my-3">
			<input type="text" class="form-control" placeholder="书名或者ISBN" v-model="keywords" @keyup.enter="searchbykey" />
			<div class="input-group-append">
				<span class="input-group-text" id="basic-addon2" @click="searchbykey">
					<i class="material-icons">search</i>
				</span>
			</div>
		</div>
		<div class="col px-0">
			<div class="row lable align-items-center mb-2">
				<h5 class="col-12 text-justify">搜索结果</h5>
			</div>
			<div class="row justify-content-start">
				<Book v-for="(book,index) in books" :key="index" @click.native="toSigleBook(book)" :book="book"></Book>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'searchresult',
		data() {
			return {
				keywords:this.$route.params.keywords,
				books: this.$route.params.books,
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
					baseURL:'https://api1.q-links.net:10081',
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
						//跳转到搜索结果页
						this.$router.push({
							name: 'searchresult',
							params: {
								'books': books
							}
						})
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
