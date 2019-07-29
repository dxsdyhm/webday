<template>
	<div>
		<QmornToolBar :title='book.name'></QmornToolBar>
		<br />
		<div class="container">
			<div class="row justify-content-start">
				<Book v-for="(book,index) in booklist" :key="index" @click.native="toSeris(book)" :book="book"></Book>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'bookserisdetal',
		data() {
			return {
				book: this.$route.params.book,
				booklist:[]
			}
		},
		mounted() {
			this.getAllserisBook();
		},
		activated() {
			if(this.book!==this.$route.params.book){
				this.book=this.$route.params.book;
				this.getAllserisBook();
			}
		},
		methods: {
			getAllserisBook() {
				let bookslist=this.$store.getters.getBookSerisbyid(this.book.seriseId)
				if(!!bookslist&&bookslist.lenght>0){
					this.booklist=bookslist
				}else{
					this.$http({
							method: 'post',
							// url: 'https://dev.oss.qmorn.com/qmorn/oss/app/res/book/search',
							url: '/res/book/recommend/serise',
							data:{
								seriseId:this.book.seriseId
							}
						})
						.then(response => {
							let serisid=this.book.seriseId
							this.$store.commit('saveserisbooklist', {serisid:response.data.data.books})
							this.booklist=response.data.data.books
						})
						.catch(function(error) {
							console.log(error)
						})
				}
			},
			toSeris(book){
				this.$router.push({
					name: 'bookdetail',
					params: {
						'book': book
					}
				})
			},
			back(){
				this.$router.back()
			}
		},
	}
</script>

<style>
</style>
