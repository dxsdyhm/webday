<template>
	<div id="app" class="container-fluid bg">
		<keep-alive include='bookhome'>
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
	.bg{
		background-color: darkgray;
	}
</style>
