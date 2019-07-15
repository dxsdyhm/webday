<template>
	<v-layout column>
		<qmorntoolbar :title='title'></qmorntoolbar>
		<div>二维码扫描结果:{{qrcode}}</div>
		<div>地理位置:{{geo.speed}}</div>
	</v-layout>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	import acount, {
		info
	} from '../../weixin/config';
	import wx from 'weixin-js-sdk'
	export default {
		data() {
			return {
				title: '配置网络',
				config: {
					debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: acount.appID, // 必填，公众号的唯一标识
					timestamp: parseInt(new Date().getTime() / 1000), // 必填，生成签名的时间戳
					nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
					signature: '', // 必填，签名
					jsApiList: ['scanQRCode', 'getLocation'] // 必填，需要使用的JS接口列表
				},
				qrcode:'',
				geo:{},
			}
		},
		methods: {
			...mapActions([
				'getJsApiTiket',
			]),
		},
		mounted() {
			//申请签名
			this.getJsApiTiket(this.config).then(result => {
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: acount.appID, // 必填，公众号的唯一标识
					timestamp: this.config.timestamp, // 必填，生成签名的时间戳
					nonceStr: this.config.nonceStr, // 必填，生成签名的随机串
					signature: result, // 必填，签名
					jsApiList: this.config.jsApiList // 必填，需要使用的JS接口列表
				});
			}).
			catch(error => {
				console.log(error)
				console.log('请在微信客户端打开')
			})
			wx.ready(()=> {
				console.log('微信jssdk准本好了')
				wx.scanQRCode({
					needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: res => {
						console.log(this)
						this.qrcode = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
						console.log(this.qrcode)
					}
				});
			})
		}
	}
</script>

<style>
</style>
