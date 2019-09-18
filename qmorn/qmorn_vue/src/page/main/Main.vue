<template>
	<div class="d-flex flex-column all">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<v-dialog v-model="newDevice">
			<v-card class="pa-4">
				<v-card-title class=" text-center">
					收到一个分享的设备
				</v-card-title>
				<v-layout align-center justify-center column>
					<v-avatar class="ma-1" :size=96>
						<img src="../../assets/img/ic_dev_elf.png" />
					</v-avatar>
					<v-card-text>设备名称:&nbsp;&nbsp;&nbsp;&nbsp;{{device.remark}}</v-card-text>
					<v-card-text>设备ID:&nbsp;&nbsp;&nbsp;&nbsp;{{device.id}}</v-card-text>
				</v-layout>
				<v-card-actions>
					<v-btn color="primary" block @click="comfirm()">确定</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-bottom-navigation v-model="activeBtn" :input-value="showNav" grow absolute color="primary" height="8vh">
			<v-btn v-for="item in bottonNav" :key="item.position" @click="selectNav(item)">
				<span>{{item.name}}</span>
				<v-icon>{{item.icon}}</v-icon>
			</v-btn>
		</v-bottom-navigation>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	export default {
		name: 'Main',
		data() {
			return {
				activeBtn: 0,
				showNav: true,
				bottonNav: [{
						position: 0,
						name: '点播',
						icon: 'library_music',
						path: '/main/voice'
					},
					{
						position: 1,
						name: '设备',
						icon: 'widgets',
						path: '/main/device'
					},
					{
						position: 2,
						name: '我的',
						icon: 'person',
						path: '/main/userinfo'
					}
				],
				newDevice:false,
				device:{}
			}
		},
		mounted: function() {
			this.activeBtn = this.$store.getters.getActive
			this.getUserDevices()
			this.checkShare()
		},
		activated() {
			// if (this.activeBtn === 1) {
			// 	if (this.selectdevice === null || this.selectdevice === undefined) {
			// 		this.$router.replace('/main/empty')
			// 	}
			// }
		},
		watch: {
			activeBtn(newvalue, old) {
				this.$store.commit('updateActive', newvalue)
			},
			//不再主页面判断设备页状态
			// '$store.getters.getSelectDevice': function(newdevice, olddevice) {
			// 	if ((!!newdevice) && (!!newdevice.id)) {
			// 		this.$router.replace('/main/device')
			// 	} else {
			// 		this.$router.replace('/main/empty')
			// 	}
			// }
		},
		methods: {
			selectNav(item) {
				this.$router.replace(item.path)
			},
			getUserDevices() {
				this.$api.user.getdeviceinfo({
					pageIndex: 1,
					pageSize: 100,
				}).then(res => {
					//如果存在currId，则选中id设备，否则随机选中第一台设备
					let needcommit = false;
					if (!!res.data.currId) {
						for (var i = 0; i < res.data.deviceList.length; i++) {
							if (res.data.deviceList[i].id === res.data.currId) {
								this.$store.commit('setSelectDevice', res.data.deviceList[i])
								break;
							}
						}
					} else {
						needcommit = true;
					}
					this.$store.commit('updateUserDevcie', res.data.deviceList)
					if (this.$store.getters.getSelectDevice == null) {
						//不再替换当前显示页面，页面切换由device页面自行完成
						// this.$router.push("/main/empty")
					} else {
						if (needcommit || (this.$store.getters.getSelectDevice.id !== res.data.currId)) {
							//需要上报当前选中id
							this.postSelect()
						}
					}
				}).catch(res => {
					this.$message(res.msg)
				})
			},
			checkShare() {
				if (!!this.getShareInfo) {
					let shareid = this.getShareInfo.shareid
					//仅过滤自己分享给自己，不要求一定带这个参数，交由服务器判断
					if (this.getUserInfo.uid !== shareid) {
						this.getShareDevice(this.getShareInfo.sharecode)
					}
				}
			},
			getShareDevice(code) {
				this.$api.user.getsharedevice({
					shareCode: code,
					autoAddDev: 1,
				}).then(res => {
					//返回的结果包含部分设备信息
					console.log(res)
					this.device={
						remark:res.data.masterName,
						id:res.data.deviceId
					}
					this.newDevice=true;
					this.getUserDevices()
				}).catch(res => {
					this.$message(res.msg)
				})
			},
			comfirm(){
				this.newDevice=false
			}
		},
		computed: {
			...mapGetters({
				selectdevice: 'getSelectDevice',
				getShareInfo: 'getShareInfo',
				getUserInfo: 'getUserInfo'
			}),
		}
	}
</script>

<style>
	.all {
		height: 100vh;
	}

	.cont {
		height: 92vh;
	}

	.boot {
		height: 8vh;
	}
</style>
