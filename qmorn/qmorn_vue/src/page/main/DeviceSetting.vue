<template>
	<v-layout column>
		<qmorntoolbar :title="title"></qmorntoolbar>
		<v-list two-line>
			<template v-for="(item,index) in funs">
				<v-list-tile class="list" :key="item.title" @click="changeInfo(item.id)">
					<v-list-tile-content>
						<v-list-tile-title>{{ item.title }}</v-list-tile-title>
						<v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
					</v-list-tile-content>
					<v-list-tile-action-text v-if="item.id===0">{{settingTemp.nikname}}</v-list-tile-action-text>
					<v-list-tile-action-text v-else-if="item.id===1">{{settingTemp.volume}}</v-list-tile-action-text>
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
		<v-btn ripple color="primary" @click="getSettings">
			解除绑定
		</v-btn>
		<!-- 昵称输入 -->
		<v-dialog v-model="nicknameShow">
			<v-card>
				<v-card-text>
					<v-text-field v-model="value1"  :counter="10" :label="funs[0].title" required></v-text-field>
				</v-card-text>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
	import {
		sendSettingMesg
	} from '../../aliiot/iot.js';
	import {
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				title: '设备设置',
				nicknameShow:false,
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
				let set=this.$store.getters.getDeviceSettings
				sendSettingMesg(set)
			},
			changeInfo(id) {
				switch (id) {
					case 0:
						//弹窗
						this.nicknameShow = true
						break;
					case 1:
						//设置音量
						break
					case 2:
						//童锁开关
						break
					case 3:
						//小夜灯
						break;
					case 4:
						//wifi
						break
					case 5:
						//智能绘本
						break
					case 6:
						//成员
						break;
					case 7:
						//基本信息
						this.$router.push('/deviceosinfo')
						break;
					default:
						break;
				}
			},
		},
		created() {
			this.getSettings()
		},
		computed: {
			...mapGetters({
				settingTemp: 'getDeviceSettings'
			}),
			childlockswitch: {
				get() {
					return this.$store.state.activeUser.deviceSetting.childlockswitch;
				},
				set(value) {
					this.$store.commit('updateSettingsParems', {
						childlockswitch: value
					})
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
