<template>
	<div>
		<div class="col px-0">
			<div class="row justify-content-start">
				<Book v-for="(book,index) in books" :key="index" :book="book"></Book>
			</div>
		</div>
		<div v-if="isloading" class="text-center">
			<div class="spinner-grow text-info" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		</div>
		<div v-else class="btn btn-info btn-block d-block d-sm-none" @click="loadmore()">
			加载更多
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				books:[],
				pageIndex: 1,
				isloading: false,
				end:false,
			}
		},
		props: {
			booksort: {
				type: String,
				default: ''
			},
		},
		activated() {
			this.getBooks()
			window.addEventListener('scroll', this.onScroll)
		},
		deactivated() {
			window.removeEventListener('scroll', this.onScroll)
		},
		methods:{
			getBooks(){
				this.isloading = true
				this.$http({
					method: 'post',
					baseURL: 'https://api1.q-links.net:10081',
					url: '/res/book/recommend/search',
					data: {
						key: "",
						ctype:this.booksort,
						pageIndex: this.pageIndex,
						pageSize: 54
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
							this.end=true
							alert('没有更多了')
						} else {
							if(this.pageIndex===1){
								this.books=books
							}else{
								this.books = this.books.concat( books)
							}
						}
					}
				}).catch(error => {
					this.isloading = false
					console.log(error)
				})
			},
			toSigleBook(book) {
				//系列应该跳转到系列列表，单本书跳转到详情
				let target ='bookdetail'
				if(!!book.seriseId){
					target='bookcatena'
				}
				this.$router.push({
					name: target,
					params: {
						'book': book
					}
				})
			},
			onScroll() {
				let innerHeight = document.querySelector('#app').clientHeight;
				//屏幕尺寸高度
				let outerHeight = document.documentElement.clientHeight;
				//可滚动容器超出当前窗口显示范围的高度
				let scrollTop = document.documentElement.scrollTop;
				if (innerHeight < (outerHeight + scrollTop+1)) {
					this.loadmore()
				}
			},
			loadmore(){
				//加载更多操作
				if (this.isloading) {
					console.log("loading");
				} else {
					if(this.end){
						console.log("is the end");
					}else{
						this.pageIndex += 1
						this.getBooks()
					}
				}
			}
		}
	}
</script>

<style>
</style>
