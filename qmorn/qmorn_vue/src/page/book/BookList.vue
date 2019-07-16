<template>
	<v-layout column>
		<qmorntoolbar :title="title" :gape="no"></qmorntoolbar>
		<v-container fluid grid-list-lg>
			<v-layout row wrap>
				<v-flex v-for="item in bookLists" :key="item.id" xs4 md2>
					<v-card class="elevation-${showDelete?3:1}" @touchstart="gotouchstart(item)" @touchmove="gotouchmove" @touchend="gotouchend">
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
		<v-dialog v-model="showDelete">
			<v-card>
				<v-card-title class="headline">删除绘本</v-card-title>
				<v-card-text>删除绘本后，设备在没有网络的情况下，将不能识别此绘本</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="gray" flat @click="showDelete = false">取消</v-btn>
					<v-btn color="error" flat @click="deleteBook()">确定</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-layout>
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
				title: '绘本书架',
				fab: false,
				no: 'no',
				config: {
					debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: acount.appID, // 必填，公众号的唯一标识
					timestamp: parseInt(new Date().getTime() / 1000), // 必填，生成签名的时间戳
					nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
					signature: '', // 必填，签名
					jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
				},
				qrcode: '',
				timeOutEvent:0,
				showDelete:false,
				deleteTemp:null,
			}
		},
		created: function() {
			this.getBookList()
		},
		watch: {
			qrcode(newValue, oldValue) {
				this.$router.push({
					path: '/booksearch',
					query: {
						keyword: newValue
					}
				})
			}
		},
		methods: {
			...mapActions([
				'getJsApiTiket',
			]),
			getBookList() {
				this.$api.user.getBookList({
					deviceId: this.getSelectDevice.id,
					bookListIn: [],
				}).then(res => {
					this.$store.commit('updateBookList', res.data.bookList)
				}).catch(res => {
					//登陆失败
					this.$message(res.msg)
				})
			},
			gotouchstart(item) {
				this.deleteTemp=item;
				clearTimeout(this.timeOutEvent); //清除定时器
				this.timeOutEvent = 0;
				this.timeOutEvent = setTimeout(()=>{
					//执行长按要执行的内容，
					this.showDelete=true;
				}, 500); //这里设置定时
			},
			//手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
			gotouchend() {
				clearTimeout(this.timeOutEvent);
				if (this.timeOutEvent != 0) {
					//这里写要执行的内容（尤如onclick事件）
				}
			},
			//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按 
			gotouchmove() {
				clearTimeout(this.timeOutEvent); //清除定时器
				this.timeOutEvent = 0;
			},
			toSearch() {
				if (weixin.isWeixin()) {
					this.toQrScan();
				} else {
					//直接去搜索页面
					this.$router.push('/booksearch')
				}
			},
			toQrScan() {
				//申请签名
				this.getJsApiTiket(this.config).then(result => {
					this.$wx.config({
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
				this.$wx.ready(() => {
					console.log('微信jssdk准本好了')
					this.$wx.scanQRCode({
						needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
						scanType: ["barCode"], // 可以指定扫二维码还是一维码，默认二者都有 "qrCode", 
						success: res => {
							// 这里过滤书本条形码?
							console.log(res)
							this.test=res.resultStr
							let resul=res.resultStr.split(",");
							if(resul.length>=2){
								this.qrcode = resul[1]; // 当needResult 为 1 时，扫码返回的结果
							}else{
								this.$message({message:`条形码错误(${res.resultStr})`,type:'error'})
							}
						}
					});
				})
			},
			deleteBook(){
				this.showDelete=false;
				this.$api.user.deletebook({
					deviceId: this.getSelectDevice.id,
					bookId: this.deleteTemp.id,
				}).then(res => {
					this.$store.commit('deleteBook', this.deleteTemp)
				}).catch(res => {
					//登陆失败
					this.$message(res.msg)
				})
			}
		},
		computed: {
			...mapGetters({
				bookLists: 'getBookLists',
				getSelectDevice:'getSelectDevice',
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

	.cardText {
		padding: 1rem 0.3rem 0.9rem 0.3rem;
	}
</style>
