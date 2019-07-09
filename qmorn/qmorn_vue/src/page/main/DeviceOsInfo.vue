<template>
	<v-layout column>
		<qmorntoolbar :title="title"></qmorntoolbar>
		<v-responsive :aspect-ratio="3/1" class="up">
			<v-layout align-center justify-center row fill-height>
				<v-avatar  :size=96>
					<img src="../../assets/img/ic_dev_elf.png" />
				</v-avatar>
			</v-layout>
		</v-responsive>
		<div class="dowm">
			<v-list>
				<template v-for="(item,index) in deviceosinfo">
					<v-list-tile class="list_action" avatar :key="item.title" @click="jumpTo(item.id)">
						<v-list-tile-content>
							<v-list-tile-title>{{item.title}}</v-list-tile-title>
						</v-list-tile-content>
						<v-list-tile-action-text>{{item.dis}}</v-list-tile-action-text>
						<v-icon v-if="item.co" class="chevron">chevron_right</v-icon>
					</v-list-tile>
					<v-divider v-if="index + 1 < deviceosinfo.length && theme.showDevider" :key="index" color="#fefefe"></v-divider>
				</template>
			</v-list>
		</div>
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
				title: '设备信息'
			}
		},
		methods:{
			jumpTo(id){
				if(id==3){
					//检查固件更新
				}
			},
			getosInfo(){
				let os=this.$store.getters.getDeviceOSInfo
				sendSettingMesg(os)
			},
			checkDeviceUpdate(){
				
			}
		},
		mounted() {
			this.getosInfo()
		},
		computed: {
			...mapGetters({
				theme: 'getTheme'
			}),
			deviceosinfo() {
				let deviceinfo = this.$store.getters.getDeviceSettings
				let osinfo = this.$store.getters.getDeviceOSInfo
				return [{
					id: 0,
					title: '设备类型',
					dis: '小精灵慧读机',
					co: false
				}, {
					id: 1,
					title: '设备型号',
					dis: 'E10',
					co: false
				}, {
					id: 2,
					title: '设备ID',
					dis: deviceinfo.id,
					co: false
				}, {
					id: 3,
					title: '固件版本',
					dis: osinfo.versionname,
					co: true
				}, {
					id: 4,
					title: '存储空间',
					dis: osinfo.sdcapacity,
					co: true
				}, {
					id: 5,
					title: '设备电量',
					dis: osinfo.battery+'%',
					co: false
				}];
			}
		}
	}
</script>

<style>
	.up{
		margin-bottom: 0.5rem;
	}
</style>
