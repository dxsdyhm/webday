<template>
	<v-layout pa-2 column fill-height class="white--text pink lighten-3" text-xs-center>
		<!-- <div>{{this.$store.state.activeUser.deviceList[0]}}</div> -->
		<v-container grid-list-md>
			<v-layout row wrap>
				<v-flex v-for="item in onlinestate" :key="item.id" xs4>
					<v-card>
						<v-card-actions>
							<v-icon v-if="item.id==2" :color="item.text | batteryfilter">{{item.icon}}</v-icon>
							<v-icon v-else color="primary">{{item.icon}}</v-icon>
							<!-- <v-icon :color="item.id==2?(85 | batteryfilter):'primary'">{{item.icon}}</v-icon> -->
						</v-card-actions>
						<v-card-text class="cardtext" v-if="item.id==2">{{item.text+'%'}}</v-card-text>
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
	export default {
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
				online: 0
			}
		},
		methods: {
			getUserDevices() {
				this.$api.user.getdeviceinfo({
					pageIndex: 1,
					pageSize: 100,
				}).then(res => {
					this.$store.commit('updateUserDevcie', res.data.deviceList)
					this.inet();
				}).catch(res => {
					//登陆失败
					this.$message(res.msg)
				})
			},
			getDeviceOnline() {
				console.log("请求在线状态,与电量信息")
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
			},
			toFunction(path) {
				this.$router.push(path)
			},
			updateInfo() {
				let slect = this.$store.getters.getSelectOnline;
				if (slect.deviceName != this.onlinestate[0].text) {
					this.onlinestate[0].text = slect.deviceName
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
				this.interval = setInterval(this.getDeviceOnline, 60000);
			},
			getAliOnline() {
				this.$api.user.getAlionline({
					groupList: [{
						productKey: this.$store.getters.getSelectDevice.pkey,
						deviceList: [{
							id: this.$store.getters.getSelectDevice.id,
							name: this.$store.getters.getSelectDevice.dname
						}]
					}]
				}).then(res => {
					console.log(response);
				}).catch(res => {
					//登陆失败
					this.$message(res.msg)
				})
			}
		},
		mounted: function() {
			//获取用户所有设备
			this.getUserDevices()
		},
		beforeDestroy: function() {
			clearInterval(this.interval)
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
</style>
