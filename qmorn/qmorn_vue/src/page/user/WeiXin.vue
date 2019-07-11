<template>
	<v-layout></v-layout>
</template>

<script>
	import {initweixin,getCode} from '../../weixin/weixin.js';
	export default{
		data() {
			return {
			}
		},
		mounted() {
			window.location.href=getCode()
			//initweixin();
		}
	}
</script>

<style>
</style>
