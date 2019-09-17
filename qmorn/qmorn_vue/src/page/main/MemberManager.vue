<template>
	<v-layout column>
		<qmorntoolbar :title="title"></qmorntoolbar>
		<v-list subheader>
			<v-subheader>
				<v-chip color="primary" text-color="white">
					<v-avatar left>
						<v-icon>account_circle</v-icon>
					</v-avatar>
					管理员
				</v-chip>
			</v-subheader>
			<v-list-item avatar>
				<v-list-item-avatar>
					<img :src="user.image">
				</v-list-item-avatar>

				<v-list-item-content row>
					<v-list-item-title v-html="user.nickName"></v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>

		<v-divider></v-divider>

		<v-list subheader>
			<v-subheader>
				<v-chip color="primary" text-color="white">
					<v-avatar left>
						<v-icon>account_circle</v-icon>
					</v-avatar>
					成员
				</v-chip>
			</v-subheader>
			<v-list-item v-for="item in members" :key="item.id" avatar>
				<v-list-item-avatar>
					<img :src="item.image">
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title v-html="item.remarkName"></v-list-item-title>
				</v-list-item-content>
				<v-list-item-action>
					<v-btn text icon color="primary" @click="showDelete(item)">
						<v-icon color="primary">clear</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>
		</v-list>
		<v-btn v-model="fab" color="primary" dark fab fixed bottom right @click="showAdd()">
			<v-icon dark>add</v-icon>
		</v-btn>
		<!-- 添加成员 -->
		<v-dialog v-model="addShow" value="addShow" max-width="600px" lazy>
			<v-card>
				<v-card-title>
					<span class="headline">添加成员</span>
				</v-card-title>
				<v-card-text>
					<v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12>
								<v-text-field :prefix="phonepresufix" label="手机号" required v-model="newGeust.guestAccount"></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-text-field label="备注" required v-model="newGeust.guestRemark"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6>
								<v-radio-group v-model="newGeust.rsBaby" row>
									<v-radio color="primary" v-for="n in 5" :key="n" :label="(n-1) | fensfilter" :value="n-1"></v-radio>
								</v-radio-group>
							</v-flex>
						</v-layout>
					</v-container>
					<small class="tips">*添加后，成员将共享你的设备，可以使用设备的部分功能</small>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" text @click="addShow = false">取消</v-btn>
					<v-btn color="primary" text @click="addGuest()">确定</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="deleteShow">
			<v-card>
				<v-card-title class="headline">删除成员</v-card-title>
				<v-card-text>删除成员后，成员将不能在远程操作设备的功能</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green darken-1" text @click="deleteShow = false">取消</v-btn>
					<v-btn color="green darken-1" text @click="deleteGuest()">确定</v-btn>
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
					jsApiList: ['updateAppMessageShareData'] // 必填，需要使用的JS接口列表
				},
			}
		},
		methods: {
			...mapActions([
				'getJsApiTiket',
			]),
			getMembers() {
				this.$api.user.getMember({
					pageIndex: 0,
					pageSize: 200,
					deviceId: this.selectdevice.id
				}).then(res => {
					this.$store.commit('updateGuestList', res.data.guestList)
				}).catch(res => {
					//登陆失败
					this.$message(res.msg)
				})
			},
			showDelete(guesi) {
				this.deleteShow = true;
				this.deletid = guesi.id;
			},
			showAdd() {
				this.addShow = true;
			},
			deleteGuest() {
				this.deleteShow = false;
				this.$api.user.deleteDeviceMember({
					guestId: this.deletid,
					deviceId: this.selectdevice.id
				}).then(res => {
					this.$store.commit('deleteGuestList', this.deletid)
					this.deletid = 0;
				}).catch(res => {
					this.$message(res.msg)
					this.deletid = 0;
				})
			},
			addGuest() {
				this.addShow = false;
				this.newGeust.deviceId = this.selectdevice.id;
				let parems = Object.assign({}, this.newGeust);
				parems.guestAccount = this.phonepresufix + this.newGeust.guestAccount;
				this.$api.user.addDeviceMember(parems).then(res => {
					let data = res.data
					//判断id 提示未注册
					if (data.guestId === 0) {
						this.$message({
							message: "用户还没有注册",
							type: 'warning'
						});
					}
					this.$store.commit('addGuestList', data)
					//插入访客列表
				}).catch(res => {
					//登陆失败
					this.$message(res.msg)
				})
			},
			sharetoweixin() {
				// this.$api.user.singqure({
				// 	url:location.href.split('#')[0]
				// }).then(result=>{
				// 	console.log(result)
				// 	this.$wx.config({
				// 		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				// 		appId: acount.appID, // 必填，公众号的唯一标识
				// 		timestamp: result.data.timestamp, // 必填，生成签名的时间戳
				// 		nonceStr: result.data.noncestr, // 必填，生成签名的随机串
				// 		signature: result.data.signature, // 必填，签名
				// 		jsApiList: this.config.jsApiList // 必填，需要使用的JS接口列表
				// 	});
				// }).catch(res => {
				// 	//登陆失败
				// 	this.$message(res.msg)
				// })
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
				})
				this.$wx.ready(() => {
					console.log('微信jssdk准本好了')
					wx.updateAppMessageShareData({
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
		},
		mounted() {
			this.getMembers()
		}
	}
</script>

<style>
	.tips {
		font-size: 0.5rem;
		color: #A1A1A0;
	}
</style>
