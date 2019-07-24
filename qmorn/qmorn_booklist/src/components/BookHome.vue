<template>
	<div class="col">
		<div class="col px-0">
			<div class="row lable align-items-center mb-2">
				<h5 class="col-9 text-justify">系列图书</h5>
				<div class="col-2 pr-0 text-right" @click="catena">更多</div>
				<i class="material-icons" @click="catena">chevron_right</i>
			</div>
			<div class="row justify-content-start">
				<Book v-for="(book,index) in getBookSingle.slice(0,6)" :key="index" @click.native="singlelist(book)" :book="book"></Book>
			</div>
		</div>
		<hr />
		<div class="col px-0">
			<div class="row lable align-items-center mb-2">
				<h5 class="col-9 text-justify">精品图书</h5>
				<div class="col-2 pr-0 text-right" @click="singlelist">更多</div>
				<i class="material-icons" @click="singlelist">chevron_right</i>
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
						// url: 'https://dev.oss.qmorn.com/qmorn/oss/app/res/book/search',
						url: '/qmorn/oss/app/res/book/search',
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
			},
			catena(){
				this.$router.push({name:'catenalist'})
			},
			singlelist(book){
				this.$router.push({name:'bookcatena'})
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
	.lable {
		height: 2.5rem;
	}
	.ratio{
		width: 7rem;
		height: 7rem;
	}
</style>
