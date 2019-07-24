<template>
	<div id="app" class="container-fluid px-0">
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
