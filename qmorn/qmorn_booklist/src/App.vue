<template>
	<div id="app">
		<keep-alive include='bookhome,catenlist,bookserisdetal,searchresult'>
			<router-view></router-view>
		</keep-alive>
		<br />
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
	.cleara{
		text-decoration: none;
	}
</style>
