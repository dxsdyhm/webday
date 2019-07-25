<template>
	<div class="act-form">
		<iframe class="voice" :src="srcid"></iframe>
	</div>
</template>

<script>
	export default {
		name:'Voice',
		data() {
			return {
				uid: '',
			}
		},
		mounted:function(){
			this.uid=this.$store.state.activeUser.userinfo.toThirdUid
		},
		computed: {
			'srcid':function(){
				// return 'http://iot-ai.tuling123.com/jump/app/source?apiKey=1f9c927241a64082a5be9d967dbc5991&uid='+this.uid+'&client=android'
				return 'http://iot-ai.tuling123.com/jump/app/source?apiKey=271f20c64afb4dbea6ad2645e2fbbcf8&uid='+this.uid+'&client=android'
			}
		},
	}
</script>

<style>
	.voice{
		width: 100%;
		height: 100vh;
	}
</style>
