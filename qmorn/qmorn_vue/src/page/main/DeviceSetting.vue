<template>
	<v-layout column>
		<qmorntoolbar :title="title"></qmorntoolbar>
		<v-btn color="primary" @click="getSettings">设备信息</v-btn>
	</v-layout>
</template>

<script>
	import {sendSettingMesg} from '../../aliiot/iot.js'
	export default{
		data() {
			return {
				title: '设备设置'
			}
		},
		methods:{
			getSettings(){
				let msg={
					cmd:1,
                    option:0,
                    msgid:3,
                    error:0,
					nikname:'',
                    nightmode:'',
                    volume:0,
                    maxvolume:0,
                    childlockswitch:false,
                    lightswitch:0,
                    lightmode:0,
                    wifissid:'',
                    smartpicbookswitch:false,
                    nightmodeswitch:false,
                    touchwake:false
				}
				sendSettingMesg(msg)
			}
		}
	}
</script>

<style>
</style>
