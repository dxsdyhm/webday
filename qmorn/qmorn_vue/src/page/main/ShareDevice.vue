<template>
	<div>
		<qmorntoolbar :title="title"></qmorntoolbar>
		<qriously :value="qrcode" :size="qrsize" />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: '分享',
				config: {
					debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: acount.appID, // 必填，公众号的唯一标识
					timestamp: parseInt(new Date().getTime() / 1000), // 必填，生成签名的时间戳
					nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
					signature: '', // 必填，签名
					jsApiList: ['updateAppMessageShareData'] // 必填，需要使用的JS接口列表
				},
				qrcode:'sdsdss'
			}
		},
		methods: {
			
		},
		computed: {
			qrsize() {
				return (this.$store.state.activeUser.windSize.x - 10)
			},
		},
		mounted() {
			
		}
	}
</script>

<style>
</style>
