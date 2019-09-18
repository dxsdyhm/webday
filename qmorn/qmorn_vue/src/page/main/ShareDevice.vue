<template>
	<div>
		<qmorntoolbar :title="title"></qmorntoolbar>
		<div class="mx-8">
			<v-card class="text-center" :loading="loading">
				<qriously class="pa-4 pb-0" :value="qrcode" :size="qrsize" />
				<!-- <v-card-actions>
					<div class="flex-grow-1"></div>
					<v-btn icon>
						<v-icon>share</v-icon>
					</v-btn>
				</v-card-actions> -->
				<div class="tips pb-4">* 微信扫一扫或者截图后发送给微信好友，即可完成分享(二维码一次有效)</div>
			</v-card>
			<v-flex xs12 class="mt-6">
				<v-text-field label="备注名" required v-model="newGeust.guestRemark"></v-text-field>
			</v-flex>
			<div class="itemtitle pl-2 mt-2">被分享者与宝宝的关系</div>
			<v-flex xs12 sm6>
				<v-radio-group v-model="newGeust.rsBaby" row>
					<v-radio color="primary" v-for="n in 5" :key="n" :label="(n-1) | fensfilter" :value="n-1"></v-radio>
				</v-radio-group>
			</v-flex>
			<small class="tips">* 分享后，被分享者将共享你的设备，可以使用设备的部分功能</small>
			<v-btn class="mx-n1" rounded block color="primary" dark @click="getsharecode()">确定</v-btn>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				title: '分享',
				config: {
					debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: 222, // 必填，公众号的唯一标识
					timestamp: parseInt(new Date().getTime() / 1000), // 必填，生成签名的时间戳
					nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
					signature: '', // 必填，签名
					jsApiList: ['updateAppMessageShareData'] // 必填，需要使用的JS接口列表
				},
				sharecode: undefined,
				newGeust: {
					deviceId: 0,
					guestAccount: '',
					guestRemark: '妈妈',
					permission: 0,
					rsBaby: 1,
				},
				loading:false,
			}
		},
		methods: {
			getsharecode() {
				this.loading=true;
				this.$api.user.getsharecode({
					deviceId: this.newGeust.deviceId,
					permission: this.newGeust.permission,
					//guestId:0,
					guestRemark:this.newGeust.guestRemark,
					appendMsg:'',
				}).then(res => {
					this.loading=false;
					//返回的结果包含部分设备信息
					//不仅需要修改二维码，如果jssdk可用后需要提示三个点分享
					this.sharecode=res.data.shareCode
				}).catch(res => {
					this.loading='error';
					this.$message(res.msg)
				})
			}
		},
		computed: {
			...mapGetters({
				selectdevice: 'getSelectDevice',
				getUserInfo:'getUserInfo'
			}),
			qrsize() {
				return (this.$store.state.activeUser.windSize.x * 0.6)
			},
			qrcode() {
				let domain = window.location.protocol + "//" + window.location.host
				return `${domain}/#/?shareid=${this.getUserInfo.uid}&sharecode=${this.sharecode}`
			},
		},
		mounted() {
			this.newGeust.deviceId=this.selectdevice.id
			this.getsharecode()
		},
	}
</script>

<style>
	.itemtitle {
		border-left: 0.3rem solid #FFCA28;
		color: #888888;
	}
</style>
