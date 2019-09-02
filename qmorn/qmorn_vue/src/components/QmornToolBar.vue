<template>
	<v-app-bar dark flat color="primary" scroll-off-screen scroll-target="#scrolling-techniques" :class="gape">
		<v-btn icon @click="goBack">
			<v-icon>arrow_back</v-icon>
		</v-btn>
		<v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
		<v-spacer></v-spacer>
	</v-app-bar>
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
	.toolbar{
		margin-bottom: 0.8rem;
	}
</style>
