<template>
	<div class="col">
		<div class="row lable align-items-center primarybg mb-2">
			<div class="col-9 text-justify">系列图书</div>
		</div>
		<div class="row mh-10 justify-content-around">
			<div v-for="(book,index) in getBookSingle" :key="index" class="col-4 my-1" @click="toSigleBook(book)">
				<figure class="figure">
					<img :src="book.coverUrl" class="figure-img img-fluid rounded ratio">
					<figcaption class="figure-caption">{{book.name}}</figcaption>
				</figure>
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
				keywords:'我'
			}
		},
		mounted: function () {
			this.search();
		},
		methods: {
			search() {
				this.$http({
						method: 'post',
						url: 'https://dev.oss.qmorn.com/qmorn/oss/app/res/book/search',
						data: {
							key: this.keywords
						},
						headers: {
							'content-type': 'application/json',
							token: 'C5D9921FD458477CBEF5F6484DBBEC6D'
						}
					})
					.then(response => {
						this.$store.commit('updateHomeBook', response.data.bookList)
					})
					.catch(function(error) {
						console.log(error)
					})
			},
			toSigleBook(book){
				this.$router.push({name:'bookdetail',params:{'book':book}})
			}
		},
		computed: {
			...mapGetters({
				getBookSingle: 'getBookSingle',
			}),
		},
	}
</script>

<style>
</style>
