<template>
	<div>
		<QmornToolBar title='搜索'></QmornToolBar>
		<br />
		<div class="container">
			<div class="input-group">
				<input type="text" class="form-control" placeholder="书名或者ISBN" v-model="keywords" @keyup.enter="searchByEnter()" />
				<div class="input-group-append">
					<span class="input-group-text btn btn-secondary" id="basic-addon2" @click="searchByEnter()">
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
			<div v-if="isloading" class="text-center">
				<div class="spinner-grow text-info" role="status">
					<span class="sr-only">Loading...</span>
				</div>
			</div>
			<div v-else class="btn btn-info btn-block d-block d-sm-none" @click="loadmore()">
				加载更多
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
				books: [],
				pageIndex: 1,
				isloading: false,
				end:false,
				lastkeyword:undefined
			}
		},
		activated() {
			this.keywords = this.$route.params.keywords;
			let muti=this.$route.params.muti;
			if(!!muti){
				//正向进入搜索页面
				this.searchByEnter()
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
						this.lastkeyword=this.keywords;
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
			searchByEnter() {
				if(this.lastkeyword===this.keywords){
					console.log("与上一个关键词相同")
				}else{
					this.pageIndex = 1
					this.searchbykey()
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
						this.searchbykey()
					}
				}
			}
		},
		watch:{
			keywords(){
				this.end=false
			}
		}
	}
</script>

<style>
</style>
