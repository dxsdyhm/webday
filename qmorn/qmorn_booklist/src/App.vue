<template>
	<div id="app">
		<keep-alive include='bookhome,catenlist'>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
	export default {
		name: 'app',
	}
</script>

<style>
	.primarybg{
		background-color: #42B983;
	}
</style>
