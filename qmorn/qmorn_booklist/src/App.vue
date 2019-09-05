<template>
	<div id="app">
		<keep-alive include='home,catenlist,bookserisdetal,searchresult'>
			<router-view></router-view>
		</keep-alive>
		<br />
		<br />
	</div>
</template>

<script>
	export default {
		name: 'app',
	}
</script>

<style>
	.primarybg {
		background-color: #17a2b8 !important;
	}
	.shadowtrans {
		transition: box-shadow .3s;
	}
</style>
