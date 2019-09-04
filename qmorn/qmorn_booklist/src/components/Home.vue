<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="info">
			<div class="container">
				<b-navbar-brand href="javascript:;">
					<a class="navbar-brand text-white home" @click="gohome()">
						<img src="../assets/logo.svg" width="40" height="40" class="d-inline-block mr-3" alt="">巴布精灵</a>
				</b-navbar-brand>
				<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
				<b-collapse id="nav-collapse" is-nav>
					<b-navbar-nav>
						<b-nav-item href="javascript:;" v-for="(item,index) in types" :key="index" @click="scrollIntoView(item)" :active="activetype===item.type">{{item.name}}</b-nav-item>
					</b-navbar-nav>

					<b-navbar-nav class="ml-auto">
						<b-nav-form>
							<b-form-input class="mr-sm-2" v-model="keywords" placeholder="输入书名或者ISBN" @keyup.enter="searchbykey"></b-form-input>
							<i class="material-icons text-light" @click="searchbykey">search</i>
						</b-nav-form>
						<!-- <div class="form-inline">
							<input class="form-control mr-sm-2" type="search" v-model="keywords" placeholder="输入书名或者ISBN" aria-label="Search"
							 @keyup.enter="searchbykey">
							<i class="material-icons text-light" @click="searchbykey">search</i>
						</div> -->
					</b-navbar-nav>
				</b-collapse>
			</div>
		</b-navbar>
		<!-- <nav class="navbar navbar-expand-lg navbar-dark d-none d-sm-block bg-info sticky-top">
			<div class="container">
				<a class="navbar-brand text-white home" @click="gohome()">
					<img src="../assets/logo.svg" width="40" height="40" class="d-inline-block mr-3" alt="">启萌星</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
				 aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
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
		</nav> -->
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				keywords: '',
				defaultShow: 'main',
			}
		},
		mounted() {
			this.gohome()
		},
		methods: {
			tosearch() {
				this.$router.push({
					name: 'searchresult',
					params: {
						keywords: this.keywords,
						'muti': true
					}
				})
			},
			scrollIntoView(item) {
				console.log(item)
				this.$store.commit('updatecurrentlisttype', item.type)
			},
			searchbykey() {
				this.tosearch()
			},
			gohome() {
				this.$store.commit('updatecurrentlisttype', this.defaultShow)
				this.$router.replace({
					name: this.defaultShow,
					params: {
						types: this.types
					}
				})
			}
		},
		computed: {
			...mapGetters({
				activetype: 'getcurretnbooklist',
				types: 'gettypes'
			}),
		},
		watch: {
			'$store.getters.getcurretnbooklist': function(current) {
				console.log(current)
				this.$router.replace({
					name: `${current}`,
					params: {
						sortname: current
					}
				})
			}
		}
	}
</script>

<style>
	.home {
		cursor: pointer;
	}
</style>
