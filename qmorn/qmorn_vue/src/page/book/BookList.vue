<template>
	<v-layout column>
		<qmorntoolbar :title="title" :gape="no"></qmorntoolbar>
		<v-container fluid grid-list-lg>
			<v-layout row wrap>
				<v-flex v-for="item in bookLists" :key="item.id" xs4>
					<v-card class="elevation-1">
						<v-img :src="item.coverUrl" aspect-ratio="1"></v-img>
						<div class="cardText">
							<div class="bookName">{{item.name}}</div>
							<div class="bookPublish gray--text">{{item.publisher}}</div>
						</div>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
		<v-btn v-model="fab" color="primary" dark fab fixed bottom right @click="toSearch">
			<v-icon dark>add</v-icon>
		</v-btn>
	</v-layout>
</template>

<script>
	import { mapGetters,mapActions} from 'vuex'
	import acount, {
		info
	} from '../../weixin/config';
	import wx from 'weixin-js-sdk';
	import weixin from '../../weixin/weixin.js';
	export default {
		data() {
			return {
				title: '绘本书架',
				fab: false,
				no:'no',
				config: {
					debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: acount.appID, // 必填，公众号的唯一标识
					timestamp: parseInt(new Date().getTime() / 1000), // 必填，生成签名的时间戳
					nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
					signature: '', // 必填，签名
					jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
				},
				qrcode:'',
			}
		},
		created: function() {
			this.getBookList()
		},
		watch: {
			qrcode(newValue, oldValue) {
				this.$router.push({ path: '/booksearch', query: { keyword: newValue }})
			}
		},
		methods: {
			...mapActions([
				'getJsApiTiket',
			]),
			getBookList() {
				this.$api.user.getBookList({
					deviceId: this.$store.getters.getSelectDevice.id,
					bookListIn: [],
				}).then(res => {
					this.$store.commit('updateBookList', res.data.bookList)
				}).catch(res => {
					//登陆失败
					this.$message(res.msg)
				})
			},
			toSearch(){
				if(weixin.isWeixin()){
					this.toQrScan();
				}else{
					//直接去搜索页面
					this.$router.push('/booksearch')
				}
			},
			toQrScan(){
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
							//this.qrcode = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
							console.log(res.resultStr)
							this.qrcode='我'
						}
					});
				})
			}
		},
		computed: {
			...mapGetters({
				bookLists:'getBookLists'
			})
		}
	}
</script>

<style>
	.qmorn_card {
		margin: 0.1rem;
	}

	.bookName,
	.bookPublish {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.75rem;
	}
	.cardText{
		padding: 1rem 0.3rem 0.9rem 0.3rem;
	}
</style>
