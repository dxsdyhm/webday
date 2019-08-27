<template>
	<v-layout pa-2 column fill-height class="white--text pink lighten-3" text-xs-center>
		<v-layout class="ma-2" row justify-end>
			<v-icon color="#fff" size="32" @click="toadd()">add</v-icon>
		</v-layout>
		<v-container grid-list-md>
			<v-layout row wrap>
				<v-flex v-for="item in onlinestate" :key="item.id" xs4>
					<v-card height="95">
						<v-card-actions>
							<v-icon v-if="item.id==2" :color="item.text | batteryfilter">{{item.icon}}</v-icon>
							<v-icon v-else-if="item.id==1" color="primary">{{deviceonline?item.icon:'wifi_off'}}</v-icon>
							<v-icon v-else color="primary">{{item.icon}}</v-icon>
							<div class="ml-1" v-if="item.id==1&&!deviceonline">(离线)</div>
							<!-- <v-icon :color="item.id==2?(85 | batteryfilter):'primary'">{{item.icon}}</v-icon> -->
						</v-card-actions>
						<v-card-text class="text-truncate" v-if="item.id==2">{{item.text+'%'}}</v-card-text>
						<v-card-text class="cardtext" v-else>{{item.text}}</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
		<v-flex xs12>
			<v-avatar :size=144 tile>
				<img src="../../assets/img/ic_dev_elf.png" />
			</v-avatar>
		</v-flex>
		<v-layout row wrap class="fun">
			<v-flex xs4 class="item" v-for="item in fundata" :key="item.funid" @click="toFunction(item.path)">
				<v-icon class="circle">{{item.icon}}</v-icon>
				<div> {{item.funname}} </div>
			</v-flex>
		</v-layout>
	</v-layout>
</template>
<script>
	import axios from 'axios';
	import {
		mapGetters
	} from 'vuex';
	export default {
		name: 'Device',
		data() {
			return {
				interval: '',
				note: {
					backgroundImage: "url(" + require("../../assets/img/bg_elfdevice.webp") + ")",
					backgroundRepeat: "no-repeat",
					backgroundPosition: 'center',
				},
				fundata: [{
						funid: 1,
						icon: 'settings',
						funname: '设备设置',
						path: '/devicesetting'
					},
					{
						funid: 2,
						icon: 'videocam',
						funname: '远程陪护',
						path: '/moniter'
					},
					{
						funid: 3,
						icon: 'local_library',
						funname: '绘本书架',
						path: '/booklist'
					}
				],
				onlinestate: [{
						id: 0,
						icon: "insert_emoticon",
						text: "小精灵",
					},
					{
						id: 1,
						icon: "wifi",
						text: "正在获取..."
					},
					{
						id: 2,
						icon: "battery_full",
						text: "80"
					}
				],
				online: 0,
			}
		},
		methods: {
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
						this.$router.push("/main/empty")
					} else {
						if (needcommit || (this.$store.getters.getSelectDevice.id !== res.data.currId)) {
							//需要上报当前选中id
							this.postSelect()
						}
						this.inet();
					}
				}).catch(res => {
					//登陆失败
					this.$message(res.msg)
				})
			},
			getDeviceOnline() {
				//检查登陆态，否则结束轮询
				if (this.$store.getters.getLoginState) {
					clearInterval(this.interval)
					console.log("stop intervel device state")
				} else {
					this.$api.user.getdevicebatter({
						deviceList: [this.$store.getters.getSelectDevice.id]
					}).then(res => {
						this.$store.commit('updateSelectOnline', res.data.deviceStateList)
						this.updateInfo()
					}).catch(res => {
						//登陆失败
						this.$message(res.msg)
					})
					this.getAliOnline()
				}
			},
			toFunction(path) {
				this.$router.push(path)
			},
			updateInfo() {
				let slect = this.$store.getters.getSelectOnline;
				if (slect.deviceName != this.onlinestate[0].text) {
					this.onlinestate[0].text = this.showname
				}
				if (slect.ssid != this.onlinestate[1].text) {
					this.onlinestate[1].text = slect.ssid
				}
				if (slect.battery != this.onlinestate[2].text) {
					this.onlinestate[2].text = slect.battery
				}
			},
			inet() {
				this.getDeviceOnline()
				clearInterval(this.interval)
				//修改轮询逻辑，将均匀逻辑改为前期密集，后期稀疏   //放弃
				this.interval = setInterval(this.getDeviceOnline, 30000);
			},
			getAliOnline() {
				this.$api.user.getAlionline({
					productList: [{
						productKey: this.$store.getters.getSelectDevice.pkey,
						deviceList: [{
							id: this.$store.getters.getSelectDevice.id,
							name: this.$store.getters.getSelectDevice.dname
						}]
					}]
				}).then(res => {
					console.log(res);
					this.$store.commit('updateList', res.data.stateList)
				}).catch(res => {
					console.log(res)
				})
			},
			toadd() {
				this.$router.push({
					name: 'netconfig',
					params: {
						type: 0
					}
				})
			},
			postSelect() {
				this.$api.user.setselect({
					deviceId: this.$store.getters.getSelectDevice.id
				}).then(res => {
					console.log(res);
				}).catch(res => {
					console.log(res)
				})
			}
		},
		mounted: function() {
			//获取用户所有设备
			this.getUserDevices()
		},
		beforeDestroy: function() {
			clearInterval(this.interval)
		},
		computed: {
			...mapGetters({
				selectdevice: 'getSelectDevice',
				deviceonline: 'selectDeviceOnlineState',
			}),
			showname() {
				if (!!this.selectdevice.remark) {
					return this.selectdevice.remark
				} else {
					return this.selectdevice.name
				}
			}
		}
	}
</script>

<style>
	.fun {
		margin-bottom: 4rem;
	}

	.item {}

	.circle {
		width: 3rem;
		height: 3rem;
		margin-bottom: 0.5rem;
		background-color: white;
		border-radius: 1.5rem;
		align-items: center;
	}

	.cardtext {
		display: inline-block;
		white-space: nowrap;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.ss {
		height: 85vh;
	}
</style>
