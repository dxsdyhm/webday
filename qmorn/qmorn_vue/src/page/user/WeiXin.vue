<template>
	<v-layout></v-layout>
</template>

<script>
	import weinxin from '../../weixin/weixin.js';
	import {
		mapGetters
	} from 'vuex';
	export default{
		data() {
			return {
			}
		},
		mounted() {
			if(!!this.getShareInfo){
				window.location.href=weinxin.getCode(this.getShareInfo.sharecode)
			}else{
				window.location.href=weinxin.getCode('0')
			}
		},
		computed: {
			...mapGetters({
				getShareInfo: 'getShareInfo',
			}),
		}
	}
</script>

<style>
</style>
