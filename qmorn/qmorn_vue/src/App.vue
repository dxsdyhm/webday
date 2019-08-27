<template>
	<v-app>
		<v-content v-resize="onResize">
			<keep-alive include='BookSearchResult,Main,UserInfo,Voice,Device,NetConfig'>
				<router-view></router-view>
			</keep-alive>
		</v-content>
	</v-app>

</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			onResize() {
				this.$store.commit('setWindowSize', {
					x: window.innerWidth,
					y: window.innerHeight
				})
			},
		},
		mounted: function() {
			this.onResize()
		},
	}
</script>

<style>
	.test {
		border: 0.0625rem solid #00695C;
	}
	.fullscreen {
		height: 90vh;
	}
</style>
