<template>
	<div>
		<QmornToolBar title='搜索'></QmornToolBar>
		<br />
		<div class="container">
			<div class="input-group">
				<input type="text" class="form-control" placeholder="书名或者ISBN" v-model="keywords" @keyup.enter="searchByEnter" />
				<div class="input-group-append">
					<span class="input-group-text" id="basic-addon2" @click="searchByEnter">
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
			<div v-show="isloading" class="text-center">
				<div class="spinner-grow text-info" role="status">
					<span class="sr-only">Loading...</span>
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
				pageIndex: 1,
				isloading: false
			}
		},
		activated() {
			this.keywords = this.$route.params.keywords;
			this.books = this.$route.params.books;
			if (!!!this.$route.params.keywords) {
				this.searchbykey()
			}
			window.addEventListener('scroll', this.onScroll)
		},
		deactivated() {
			window.removeEventListener('scroll', this.onScroll)
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
				this.isloading = true
				this.$http({
					method: 'post',
					baseURL: 'https://api1.q-links.net:10081',
					// url: 'https://dev.oss.qmorn.com/qmorn/oss/app/res/book/search',
					url: '/res/book/recommend/search',
					data: {
						key: this.keywords,
						pageIndex: this.pageIndex,
						pageSize: 100
					}
				}).then(response => {
					this.isloading = false
					let totalCount = response.data.data.totalCount
					if (totalCount <= 0) {
						//没有任何书本
						this.keywords = ''
						alert('没有找到书本')
					} else {
						let books = response.data.data.books
						if (books === null || books.length <= 0) {
							alert('没有更多了')
						} else {
							this.books = books
						}
					}
				}).catch(error => {
					this.isloading = false
					console.log(error)
				})
			},
			onScroll() {
				let innerHeight = document.querySelector('#app').clientHeight;
				//屏幕尺寸高度
				let outerHeight = document.documentElement.clientHeight;
				//可滚动容器超出当前窗口显示范围的高度
				let scrollTop = document.documentElement.scrollTop;
				if (innerHeight < (outerHeight + scrollTop)) {
					//加载更多操作
					if (this.isloading) {
						console.log("loading");
					} else {
						this.pageIndex += 1
						this.searchbykey()
					}
				}
			},
			searchByEnter() {
				this.pageIndex = 1
				this.searchbykey()
			}
		},
	}
</script>

<style>
</style>
