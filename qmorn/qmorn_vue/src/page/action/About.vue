<template>
	<div>
		<qmorntoolbar :title='title'></qmorntoolbar>
		<v-layout class="fullscreen text-center d-flex flex-column">
			<div class="mt-auto mb-auto">
				<v-avatar :size=144 tile>
					<img src="../../assets/img/logo.svg" />
				</v-avatar>
				<div class="version">{{this.$store.state.activeUser.versionName}}</div>
			</div>
			<div class="copyright mt-auto">深圳启萌星科技有限公司提供技术支持</div>
		</v-layout>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: '关于'
			}
		},
		methods: {

		},
	}
</script>

<style>
	.copyright {
		text-align: center;
		color: #a1a1a0;
		font-size: 0.875rem;
		margin: 3rem;
	}

	.version {
		margin: 1rem auto;
	}
</style>
