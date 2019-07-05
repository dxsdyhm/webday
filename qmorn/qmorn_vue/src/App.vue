<template>
	<v-app >
		<v-content v-resize="onResize">
			<router-view></router-view>
		</v-content>
	</v-app>
	
</template>

<script>
	export default {
		methods: {
			onResize() {
				this.$store.commit('setWindowSize', {
					x: window.innerWidth,
					y: window.innerHeight
				})
			}
		},
		mounted:function(){
			this.onResize()
		}
	}
</script>

<style>
</style>
