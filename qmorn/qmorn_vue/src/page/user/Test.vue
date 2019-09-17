<template>
	<v-btn v-model="fab" color="primary" dark fab fixed bottom right @click="sharetoweixin()">
		<v-icon dark>share</v-icon>
	</v-btn>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import weixin from '../../weixin/weixin.js';
	import acount, {
		info
	} from '../../weixin/config';
	export default {
		data() {
			return {
				title: '成员管理',
				deleteShow: false,
				addShow: false,
				fun4: '我是宝宝的',
				phonepresufix: '86-',
				newGeust: {
					deviceId: '',
					guestAccount: '',
					guestRemark: '',
					permission: 0,
					rsBaby: 1,
				},
				fab: '',
				deletid: 0,
				config: {
					debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: acount.appID, // 必填，公众号的唯一标识
					timestamp: parseInt(new Date().getTime() / 1000), // 必填，生成签名的时间戳
					nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
					signature: '', // 必填，签名
					jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
				},
			}
		},
		methods: {
			...mapActions([
				'getJsApiTiket',
			]),
			sharetoweixin() {
				this.$api.user.singqure({
					url:location.href.split('#')[0]
				}).then(result=>{
					console.log(result)
					this.$wx.config({
						debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: acount.appID, // 必填，公众号的唯一标识
						timestamp: result.data.timestamp, // 必填，生成签名的时间戳
						nonceStr: result.data.noncestr, // 必填，生成签名的随机串
						signature: result.data.signature, // 必填，签名
						jsApiList: this.config.jsApiList // 必填，需要使用的JS接口列表
					});
				}).catch(res => {
					//登陆失败
					this.$message(res.msg)
				})
				this.$wx.ready(() => {
					console.log('微信jssdk准本好了')
					this.$wx.onMenuShareAppMessage({
						title: '分享测试', // 分享标题
						desc: '分享描述', // 分享描述
						link: 'https://www.qmorn.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: 'https://www.qmorn.com/images/logo.png', // 分享图标
						success: function() {
							// 设置成功
							console.log("设置成功")
						}
					})
				})
			}
		},
		computed: {
			...mapGetters({
				selectdevice: 'getSelectDevice',
				user: 'getUserInfo',
				members: 'getGuestList'
			}),
		}
	}
</script>

<style>
</style>
