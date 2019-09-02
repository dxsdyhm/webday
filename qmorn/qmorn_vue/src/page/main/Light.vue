<template>
	<v-layout column>
		<qmorntoolbar :title="title"></qmorntoolbar>
		<v-list>
			<v-list-item>
				<v-list-item-content>
					<v-list-item-title>{{ title }}</v-list-item-title>
				</v-list-item-content>
				<v-list-item-action>
					<v-switch color="primary" v-model="lightswitch"></v-switch>
				</v-list-item-action>
			</v-list-item>
		</v-list>
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
	export default{
		data() {
			return {
				title: '小夜灯'
			}
		},
		methods:{
			setLightSwitch(){
				let nic={
					cmd:CMD.JSON_CODE_LIGHT_SWITCH,
					option:1,
					msgid:0,
					error:0,
					lightSwitch:this.settingTemp.lightswitch,
					lightMode:1,
				}
				sendSettingMesg(this.$iotdevice, nic)
			}
		},
		computed:{
			...mapGetters({
				settingTemp: 'getDeviceSettings'
			}),
			lightswitch: {
				get() {
					return this.$store.state.activeUser.deviceSetting.lightswitch!=0;
				},
				set(value) {
					this.$store.commit('updateSettingsParems', {
						lightswitch: value?1:0
					})
					this.setLightSwitch()
				}
			}
		}
	}
</script>

<style>
</style>
