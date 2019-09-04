<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-dark d-none d-sm-block bg-info sticky-top">
			<div class="container">
				<a class="navbar-brand text-white">
					<img src="../assets/logo.svg" width="40" height="40" class="d-inline-block mr-3" alt="">启萌星</a>
				 <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
				    <span class="navbar-toggler-icon"></span>
				  </button>
				 <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
					<ul class="navbar-nav mr-auto">
						<li class="nav-item" v-for="(item,index) in types" :key="index">
							<a class="nav-link" href="javascript:;" @click="scrollIntoView(item)" v-bind:class="[activetype===item.type?'active':'']">{{item.name}}</a>
						</li>
					</ul>
					<div class="form-inline">
						<input class="form-control mr-sm-2" type="search" v-model="keywords" placeholder="输入书名或者ISBN" aria-label="Search"
						 @keyup.enter="searchbykey">
						<i class="material-icons text-light" @click="searchbykey">search</i>
					</div>
				</div>
			</div>
		</nav>
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
							<Book v-for="(book,index) in getBookSingle.slice(index*6,index*6+typeitem.number)" :key="index" @click.native="singlelist(book)"
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
				keywords: '',
				types: [{
						type: 'seriseBooks',
						name: '系列图书',
						number: 6
					},
					{
						type: 'cards',
						name: '益智卡片',
						number: 6
					},
					{
						type: 'textbooks',
						name: '全国教材',
						number: 6
					},
					{
						type: 'books',
						name: '精品图书',
						number: 48
					}
				],
				activetype: 'books',
				tips:'Tips:<br> 资源更新时，用USB数据线连接设备和PC(个人电脑)，选择感兴趣的资源下载到电脑或者直接下载到对应目录<br>1.卡片资源复制到设备的<strong>"\\卡片_cards"</strong>目录。<br>2.其他书本资源复制到<strong>"\\书本_books"</strong>目录',
			}
		},
		mounted: function() {
			this.search();
		},
		methods: {
			search() {
				this.$http({
						method: 'post',
						// url: 'https://dev.oss.qmorn.com/qmorn/oss/app/res/book/search',
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
			scrollIntoView(item) {
				this.activetype = item.type
				let anchor = this.$refs[item.type][0]
				document.documentElement.scrollTop = anchor.offsetTop - 75
			},
			loadmorelist(item) {
				if (item.type === 'books') {
					this.catena()
				} else if (item.type === 'book') {
					this.sigleBookMore()
				}
			}
		},
		computed: {
			...mapGetters({
				getbook: 'getBookSeris',
				getBookSingle: 'getBookSingle',
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
