<template>
	<div>
		<!-- <b-navbar v-b-scrollspy:scrollspy-nested type="light" variant="light" class="flex-column float-left listtype position-fixed d-none d-xl-block">
			<b-nav pills slot="header" class="flex-column">
				<b-nav-item href="javascript:;" v-for="(item,index) in types" :key="index" @click="scrollIntoView(item)" :active="activetype===item.type">{{item.name}}</b-nav-item>
			</b-nav>
		</b-navbar> -->
		<div class="card float-right position-fixed text-info border-info d-none d-xl-block tipcard">
			<div class="card-body">
				<div v-html="tips"></div>
			</div>
		</div>
		<div class="container">
			<br />
			<div>
				<i class="material-icons text-light float-right p-3 d-block d-sm-none" @click="tosearch">search</i>
				<div class="jumbotron bg-info text-white shadow">
					<div class="container">
						<h1 class="display-5">绘本大全</h1>
						<p class="lead">海量人声绘本，让小朋友远离屏幕回归书本！</p>
					</div>
				</div>
			</div>
			<div id="scrollspy-nested">
				<div v-for="(typeitem,index) in types" :key="index">
					<div :ref="typeitem.type" class="col px-0">
						<div class="row lable align-items-center justify-content-between mb-2">
							<h5 class="col text-justify">{{typeitem.name}}</h5>
							<div class="col-auto d-inline-flex" @click="loadmorelist(typeitem)">
								<div class="d-inline-block">更多</div>
								<i class="material-icons pr-0">chevron_right</i>
							</div>
						</div>
						<div class="row">
							<Book v-for="(book,index) in getBookSingle.slice(index*6,index*6+typeitem.number)" :key="index"
							 :book="book"></Book>
						</div>
					</div>
					<hr v-show="index!==types.length-1" class="d-sm-none" />
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
				activetype: 'books',
				tips:'Tips:<br> 资源更新时，用USB数据线连接设备和PC(个人电脑)，选择感兴趣的资源下载到电脑或者直接下载到对应目录<br>1.卡片资源复制到设备的<strong>"\\卡片_cards"</strong>目录。<br>2.其他书本资源复制到<strong>"\\书本_books"</strong>目录'
			}
		},
		mounted: function() {
			this.search();
		},
		methods: {
			search() {
				this.$http({
						method: 'post',
						baseURL: 'https://api1.q-links.net:10081',
						url: '/res/book/recommend',
					})
					.then(response => {
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
				this.tosearch()
			},
			tosearch() {
				this.$router.push({
					name: 'searchresult',
					params: {
						keywords: this.keywords,
						'muti': true
					}
				})
			},
			sigleBookMore() {
				this.keywords = ''
				this.tosearch()
			},
			loadmorelist(item) {
				this.$store.commit('updatecurrentlisttype', item.type)
			}
		},
		computed: {
			...mapGetters({
				getbook: 'getBookSeris',
				getBookSingle: 'getBookSingle',
				types:'gettypes'
			}),
		},
	}
</script>

<style>
	.listtype {
		max-width: 20rem;
		margin-left: 14%;
		margin-top: 1.5rem;
	}
	
	.tipcard {
		max-width: 23rem;
		margin-left: 80%;
		margin-top: 1.5rem;
	}

	.lable {
		height: 3rem;
	}
</style>