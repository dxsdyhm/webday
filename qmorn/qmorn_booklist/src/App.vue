<template>
	<div id="app">
		<keep-alive include='home,catenlist,bookserisdetal,searchresult'>
			<router-view></router-view>
		</keep-alive>
		<br />
		<br />
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
			}
		}, 
		methods:{
			checkTitle(){
				let screenWidth = document.body.clientWidth
				if(screenWidth>575){
					document.title="资源下载"
				}else{
					document.title="书单"
				}
			}
		},
		mounted() {
			this.checkTitle()
			window.onresize = () => {
				this.checkTitle()
			}
		}
	}
</script>

<style>
	.primarybg {
		background-color: #17a2b8 !important;
	}

	.shadowtrans {
		transition: box-shadow .3s;
	}
</style>
