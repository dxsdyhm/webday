<template>
	<div class="d-flex flex-column all">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
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
				]
			}
		},
		mounted: function() {
			this.activeBtn = this.$store.getters.getActive
			this.getUserDevices()
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
			selectNav(item){
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
		},
		computed: {
			...mapGetters({
				selectdevice: 'getSelectDevice',
			}),
		}
	}
</script>

<style>
	.all{
		height: 100vh;
	}
	.cont{
		height: 92vh;
	}
	.boot{
		height: 8vh;
	}
</style>
