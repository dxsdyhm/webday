<template>
	<v-app>
		<v-content v-resize="onResize">
			<router-view v-if='isRouterAlive'></router-view>
		</v-content>
	</v-app>

</template>

<script>
	import wx from 'weixin-js-sdk';
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
			},
			wxConfig() {
				this.axios({
					method: 'post',
					url: 'http://my.service.com/index.php/opcode/6002',
					data: {
						url: location.href.split('#')[0]
					} //向服务端提供授权url参数，并且不需要#后面的部分
				}).then((res) => {
					wx.config({
						debug: true, // 开启调试模式,
						appId: res.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
						timestamp: res.timestamp, // 必填，生成签名的时间戳
						nonceStr: res.nonceStr, // 必填，生成签名的随机串
						signature: res.signature, // 必填，签名，见附录1
						jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});
				})
			}
		},
		mounted: function() {
			this.onResize()
			//this.wxConfig() //暂时没有后台支持
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
