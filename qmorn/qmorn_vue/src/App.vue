<template>
	<v-app>
		<v-content v-resize="onResize">
			<router-view v-if='isRouterAlive'></router-view>
		</v-content>
	</v-app>

</template>

<script>
	export default {
		data() {
			return {
				isRouterAlive: true
			}
		},
		methods: {
			onResize() {
				this.$store.commit('setWindowSize', {
					x: window.innerWidth,
					y: window.innerHeight
				})
			},
			reload() {
				this.isRouterAlive = false;
				// 该方法会在dom更新后执行
				this.$nextTick(function() {
					this.isRouterAlive = true
				})
			}
		},
		mounted: function() {
			this.onResize()
		},
		provide: function() {
			return {
				reload: this.reload
			}
		},
	}
</script>

<style>
</style>
