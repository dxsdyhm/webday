<template>
	<v-layout v-if="selectdevice!=null" column align-space-around>
		<qmorntoolbar :title="title"></qmorntoolbar>
		<v-chip :value="!deviceonline" color="warning " text-color="white" class="mx-2">
			<v-icon class="ma-2">warning</v-icon>
			设备离线，无法远程操作.
		</v-chip>
		<v-list two-line>
			<template v-for="(item,index) in funs">
				<v-list-tile v-if="item.id!==6 || selectdevice.role!==2" class="list" :key="item.title" @click="changeInfo(item.id)">
					<v-list-tile-content>
						<v-list-tile-title>{{ item.title }}</v-list-tile-title>
						<v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
					</v-list-tile-content>
					<v-list-tile-action-text v-if="item.id===0">{{settingTemp.nikname}}</v-list-tile-action-text>
					<v-list-tile-action-text v-else-if="item.id===1">{{volume}}</v-list-tile-action-text>
					<v-list-tile-action-text v-else-if="item.id===4">{{settingTemp.wifissid}}</v-list-tile-action-text>
					<v-icon v-if="item.solit===0" class="chevron">chevron_right</v-icon>
					<v-list-tile-action v-if="item.solit===1">
						<v-switch v-if="item.id===2" color="primary" v-model="childlockswitch"></v-switch>
						<v-switch v-else-if="item.id===5" color="primary" v-model="smartpicbookswitch"></v-switch>
					</v-list-tile-action>
				</v-list-tile>
				<!-- <v-divider v-if="index + 1 < funs.length" :key="index"></v-divider> -->
			</template>
		</v-list>
		<v-btn class="mb-5" v-if="selectdevice.role===1" ripple color="primary" @click="unbindShow=true">
			解除绑定
		</v-btn>
		<!-- 昵称输入 -->
		<v-dialog v-model="nicknameShow">
			<v-card>
				<v-card-title>
				</v-card-title>
				<v-card-text>
					<v-text-field v-model="nikname" :counter="10" :label="funs[0].title" required></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn flat color="primary" @click="nicknameShow=false">取消</v-btn>
					<v-btn flat color="primary" @click="nicknameShow=false">确定</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<!-- 音量调节 -->
		<v-dialog v-model="volumeShow">
			<v-card>
				<v-card-title>
					<v-slider v-model="volume" :max="100" thumb-label :min="0" :step="1" append-icon="volume_up" prepend-icon="volume_down"></v-slider>
				</v-card-title>
			</v-card>
		</v-dialog>
		<!-- 解除绑定 -->
		<v-dialog v-model="unbindShow">
			<v-card>
				<v-card-title class="headline">解除绑定</v-card-title>
				<v-card-text>解除绑定后，你将不能再远程操作设备的功能</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green darken-1" flat @click="unbindShow = false">取消</v-btn>
					<v-btn color="green darken-1" flat @click="unbind()">确定</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
	import {
		sendSettingMesg
	} from '../../aliiot/iot.js';
	import {
		CMD
	} from '../../aliiot/cmd.js';
	import {
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				title: '设备设置',
				nicknameShow: false,
				volumeShow: false,
				unbindShow: false,
				value1: '',
				funs: [{
						id: 0,
						title: '小精灵名称',
						subtitle: '',
						solit: 0 //0 箭头  1 开关
					},
					{
						id: 1,
						title: '音量设置',
						subtitle: '',
						solit: 0 //0 箭头  1 开关
					},
					{
						id: 2,
						title: '童锁开关',
						subtitle: '',
						solit: 1 //0 箭头  1 开关
					},
					{
						id: 3,
						title: '小夜灯',
						subtitle: '',
						solit: 0 //0 箭头  1 开关
					},
					{
						id: 4,
						title: 'WiFi网络切换',
						subtitle: '',
						solit: 0 //0 箭头  1 开关
					},
					{
						id: 5,
						title: '智能绘本检索',
						subtitle: '关闭后，小精灵智能阅读书架上已有的绘本',
						solit: 1 //0 箭头  1 开关
					},
					{
						id: 6,
						title: '成员管理',
						subtitle: '',
						solit: 0 //0 箭头  1 开关
					},
					{
						id: 7,
						title: '小精灵基本信息',
						subtitle: '',
						solit: 0 //0 箭头  1 开关
					}
				]
			}
		},
		methods: {
			getSettings() {
				let set = this.$store.getters.getDeviceSettings
				sendSettingMesg(this.$iotdevice, set)
			},
			setNickName() {
				let nic = {
					cmd: CMD.JSON_CODE_NICKNAME,
					option: 1,
					msgid: 0,
					error: 0,
					nickname: this.settingTemp.nikname
				}
				if (!!this.settingTemp.nikname) {
					sendSettingMesg(this.$iotdevice, nic)
				} else {
					console.log("非法值")
				}
			},
			setVolume() {
				let nic = {
					cmd: CMD.JSON_CODE_VOLUME,
					option: 1,
					msgid: 0,
					error: 0,
					VolumeMax: this.settingTemp.maxvolume,
					CurrentVolume: Math.round(this.settingTemp.volume * 100 / this.settingTemp.maxvolume)
				}
				if (!!this.settingTemp.maxvolume) {
					sendSettingMesg(this.$iotdevice, nic)
				} else {
					console.log("非法值")
				}
			},
			setChildLock() {
				let nic = {
					cmd: CMD.JSON_CODE_CHILDLOOK,
					option: 1,
					msgid: 0,
					error: 0,
					look: this.settingTemp.childlockswitch
				}
				sendSettingMesg(this.$iotdevice, nic)
			},
			setSmartSwitch() {
				let nic = {
					cmd: CMD.JSON_CODE_SMARTPICBOOK,
					option: 1,
					msgid: 0,
					error: 0,
					smart: this.settingTemp.smartpicbookswitch
				}
				sendSettingMesg(this.$iotdevice, nic)
			},
			changeInfo(id) {
				switch (id) {
					case 0:
						//弹窗
						this.nicknameShow = true
						break;
					case 1:
						//设置音量
						this.volumeShow = true
						break
					case 2:
						//童锁开关
						//this.setChildLock()
						break
					case 3:
						//小夜灯
						this.$router.push('/light')
						break;
					case 4:
						//wifi
						this.$router.push({name:'netconfig',params:{type:1}})
						break
					case 5:
						//智能绘本
						//this.setSmartSwitch()
						break
					case 6:
						//成员
						this.$router.push('/membermanager')
						break;
					case 7:
						//基本信息
						this.$router.push('/deviceosinfo')
						break;
					default:
						break;
				}
			},
			unbind() {
				this.unbindShow = false;
				this.$api.user.unbindDevice({
					deviceId: this.selectdevice.id
				}).then(res => {
					this.$router.go(-1)
					this.$store.commit('deleteSelectDevice', this.selectdevice.id)
				}).catch(res => {
					this.$message(res.msg)
				})
			}
		},
		created() {
			this.getSettings()
		},
		watch: {
			nicknameShow: function(nva, ova) {
				if (!nva) {
					this.setNickName()
				}
			},
			volumeShow: function(nva, ova) {
				if (!nva) {
					this.setVolume()
				}
			}
		},
		computed: {
			...mapGetters({
				settingTemp: 'getDeviceSettings',
				selectdevice: 'getSelectDevice',
				deviceonline: 'selectDeviceOnlineState',
			}),
			childlockswitch: {
				get() {
					return this.$store.state.activeUser.deviceSetting.childlockswitch;
				},
				set(value) {
					this.$store.commit('updateSettingsParems', {
						childlockswitch: value
					})
					this.setChildLock();
				}
			},
			smartpicbookswitch: {
				get() {
					return this.$store.state.activeUser.deviceSetting.smartpicbookswitch;
				},
				set(value) {
					this.$store.commit('updateSettingsParems', {
						smartpicbookswitch: value
					})
					this.setSmartSwitch();
				}
			},
			nikname: {
				get() {
					return this.$store.state.activeUser.deviceSetting.nikname;
				},
				set(value) {
					this.$store.commit('updateSettingsParems', {
						nikname: value
					})
				}
			},
			volume: {
				get() {
					return Math.round(this.settingTemp.volume * 100 / this.settingTemp.maxvolume);
				},
				set(value) {
					this.$store.commit('updateSettingsParems', {
						volume: Math.round(value * this.settingTemp.maxvolume / 100)
					})
				}
			}
		}
	}
</script>

<style>
	.texts {
		background-color: #42B983;
		padding: 1rem 0rem;
	}

	.list {}
</style>
