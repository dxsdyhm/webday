<template>
	<div class="text-center">
		<qmorntoolbar :title='title'></qmorntoolbar>
		<div class="logo">
			<v-avatar :size=144 tile>
				<img src="../../assets/img/logo.svg" />
			</v-avatar>
			<div class="version">{{this.$store.state.activeUser.versionName}}</div>
		</div>
		<div class="copyright">深圳启萌星科技有限公司提供技术支持</div>
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
	.logo {
		margin: 10rem auto;
	}

	.copyright {
		text-align: center;
		color: #a1a1a0;
		font-size: 0.875rem;
		margin: 3rem;
	}

	.version {
		margin: 1rem auto;
		text-align: center;
	}
</style>
