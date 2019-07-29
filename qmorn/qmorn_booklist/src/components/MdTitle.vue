<template>
	<nav class="navbar navbar-dark bg-info sticky-top">
		<div class="container justify-content-start px-0">
			<i class="material-icons text-light d-block d-sm-none" width="40" height="40" @click="goBack">arrow_back</i>
			<a class="navbar-brand text-white mx-3">{{title}}</a>
		</div>
	</nav>
</template>

<script>
	export default{
		methods: {
			goBack() {
				if(typeof(this.$parent.back)==='function'){
					let canback=this.$parent.back()
					if(!!canback){
						this.$router.back()
					}
				}else{
					this.$router.back()
				}
			}
		},
		props: {
			title: {
				type: String,
				default: '启萌星'
			},
			gape: {
				type: String,
				default: 'toolbar'
			},
		},
	}
</script>

<style>
</style>
