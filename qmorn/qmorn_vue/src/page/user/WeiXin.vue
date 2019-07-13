<template>
	<v-layout></v-layout>
</template>

<script>
	import weinxin from '../../weixin/weixin.js';
	export default{
		data() {
			return {
			}
		},
		mounted() {
			window.location.href=weinxin.getCode()
		}
	}
</script>

<style>
</style>
