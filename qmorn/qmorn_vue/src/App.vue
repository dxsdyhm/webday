<template>
	<v-app>
		<v-content v-resize="onResize">
			<keep-alive>
				<router-view ref="test"></router-view>
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
		beforeRouteLeave (to, from, next) {
			// 导航离开该组件的对应路由时调用
			// 可以访问组件实例 `this`
			console.log("==================")
			console.log(this.$refs.test)
		}
	}
</script>

<style>
</style>
