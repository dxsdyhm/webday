<template>
	<div class="act-form">
		<iframe class="voice cont" :src="srcid" frameborder='no' scrolling='no'></iframe>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	export default {
		name:'Voice',
		data() {
			return {
				
			}
		},
		computed: {
			...mapGetters({
				selectdevice: 'getSelectDevice',
				userinfo:'getUserInfo',
			}),
			'srcid':function(){
				// return 'http://iot-ai.tuling123.com/jump/app/source?apiKey=1f9c927241a64082a5be9d967dbc5991&uid='+this.uid+'&client=android'
				// return 'http://iot-ai.tuling123.com/jump/app/source?apiKey=271f20c64afb4dbea6ad2645e2fbbcf8&uid='+this.userinfo.toThirdUid+'&client=android'
				return `http://iot-ai.tuling123.com/jump/app/source?apiKey=${this.apikey}&uid=${this.userinfo.toThirdUid}&client=android`
			},
			apikey(){
				if(!!this.selectdevice&&(this.selectdevice.tulingLT===1)){
					return '1f9c927241a64082a5be9d967dbc5991'
				}else{
					return '271f20c64afb4dbea6ad2645e2fbbcf8'
				}
			}
		},
	}
</script>

<style>
	.voice{
		width: 100%;
		/* scrolling:'no'; */
		frameborder:'no';
	}
</style>
