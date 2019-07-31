<template>
	<v-layout column>
		<qmorntoolbar :title="title"></qmorntoolbar>
		<v-responsive :aspect-ratio="3/1" class="up">
			<v-layout align-center justify-center row fill-height>
				<v-avatar :size=96>
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
						<v-icon v-if='item.id===3 && newversion' small color="red">lens</v-icon>
						<v-list-tile-action-text>{{item.dis}}</v-list-tile-action-text>
						<v-icon v-if="item.co" class="chevron">chevron_right</v-icon>
					</v-list-tile>
					<v-divider v-if="index + 1 < deviceosinfo.length && theme.showDevider" :key="index" color="#fefefe"></v-divider>
				</template>
			</v-list>
		</div>
		<v-dialog v-model="showupdate" scrollable>
			<v-card>
				<v-card-title class="headline">设备有新版本</v-card-title>
				<v-card-text>
					<div class="py-1" v-for="(item,index) in updateinfo.upgInfoList" :key='index'>{{item}}</div>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="gray" flat @click="showupdate = false">取消</v-btn>
					<v-btn color="error" flat @click="sendupdateinfo()">确定</v-btn>
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
		mapGetters
	} from 'vuex';
	import {
		CMD
	} from '../../aliiot/cmd.js';
	export default {
		data() {
			return {
				title: '设备信息',
				updateinfo: {},
				showupdate:false
			}
		},
		methods: {
			jumpTo(id) {
				if (id == 3) {
					//检查固件更新
					if(this.newversion){
						//展示弹窗
						this.showupdate=true
					}else{
						this.checkDeviceUpdate(true)
					}
				}
			},
			getosInfo() {
				let os = this.$store.getters.getDeviceOSInfo
				sendSettingMesg(this.$iotdevice, os)
			},
			checkDeviceUpdate(showTip) {
				this.$api.user.checkdeviceversion({
					option: 'GetUpgInfo',
					deviceVersion: this.osinfo.versioncode,
					deviceId: this.deviceinfo.id,
				}).then(res => {
					//存在新版本
					this.updateinfo = res.data;
					if(showTip){
						//
					}
				}).catch(res => {
					//不存在新版本
				})
			},
			capacity(value) {
				if (null == value || value == '') {
					return "0 Bytes";
				}
				let unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
				let index = 0,
					srcsize = parseFloat(value);
				index = Math.floor(Math.log(srcsize) / Math.log(1024));
				let size = srcsize / Math.pow(1024, index);
				//  保留的小数位数
				size = size.toFixed(2);
				return size + unitArr[index];
			},
			sendupdateinfo(){
				let updatework = {
					cmd: CMD.JSON_CODE_UPDATE_WORK,
					option: 1,
					msgid: 0,
					error: 0,
					upgFlag: this.updateinfo.upgFlag,
					version: this.updateinfo.version,
					showVersion:this.updateinfo.showVersion,
					url:this.updateinfo.url,
					md5:this.updateinfo.md5,
					size:this.updateinfo.size,
					upgInfoList:[]
				}
				sendSettingMesg(this.$iotdevice, updatework)
				this.showupdate=false
			}
		},
		mounted() {
			this.getosInfo()
		},
		computed: {
			...mapGetters({
				theme: 'getTheme',
				deviceinfo: 'getSelectDevice',
				osinfo: 'getDeviceOSInfo'
			}),
			deviceosinfo() {
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
					dis: this.deviceinfo.id,
					co: false
				}, {
					id: 3,
					title: '固件版本',
					dis: this.osinfo.versionname,
					co: true
				}, {
					id: 4,
					title: '存储空间',
					dis: '剩余' + this.capacity(this.osinfo.sdcapacity),
					co: true
				}, {
					id: 5,
					title: '设备电量',
					dis: this.osinfo.battery + '%',
					co: false
				}];
			},
			newversion(){
				return !!this.updateinfo&&this.updateinfo.upgFlag===1
			}
		},
		watch: {
			'$store.getters.getDeviceOSInfo': function(newOs, oldOs) {
				this.checkDeviceUpdate(false)
			}
		}
	}
</script>

<style>
	.up {
		margin-bottom: 0.5rem;
	}
</style>
