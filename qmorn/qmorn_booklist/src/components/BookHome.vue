<template>
	<div class="col">
		<div class="col px-0">
			<div class="row lable align-items-center primarybg mb-2">
				<div class="col-9 text-justify">系列图书</div>
				<div class="col-2 pr-0 text-right" @click="catena">更多</div>
				<i class="material-icons" @click="catena">chevron_right</i>
			</div>
			<div class="row mh-10 justify-content-around">
				<div v-for="(book,index) in getBookSingle.slice(0,6)" :key="index" class="col-4 my-1" @click="toSigleBook(book)">
					<figure class="figure">
						<img :src="book.coverUrl" class="figure-img img-fluid rounded ratio">
						<figcaption class="figure-caption">{{book.name}}</figcaption>
					</figure>
				</div>
			</div>
		</div>
		<div class="col px-0">
			<div class="row lable align-items-center primarybg mb-2">
				<div class="col-9 text-justify">精品图书</div>
				<div class="col-2 pr-0 text-right" @click="singlelist">更多</div>
				<i class="material-icons" @click="singlelist">chevron_right</i>
			</div>
			<div class="row mh-10">
				<div v-for="(book,index) in getBookSingle" :key="index" class="col-4 my-1" @click="toSigleBook(book)">
					<figure class="figure">
						<b-img-lazy :src="book.coverUrl" class="figure-img img-fluid rounded img-thumbnail ratio"></b-img-lazy>
						<figcaption class="figure-caption">{{book.name}}</figcaption>
					</figure>
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
			},
			catena(){
				this.$router.push({name:'catenalist'})
			},
			singlelist(){
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
		width: 7.5rem;
		height: 7.5rem;
	}
</style>
