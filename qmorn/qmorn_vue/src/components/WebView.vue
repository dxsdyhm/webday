<template>
	<a ref='link' :href="url"></a>
</template>

<script>
	export default {
		props: {
			url: {
				type: String,
				default: 'http:www.baidu.com'
			},
		},
		mounted: function() {
			//模拟点击
			this.$refs.link.click();
		},
	}
</script>

<style>
</style>
