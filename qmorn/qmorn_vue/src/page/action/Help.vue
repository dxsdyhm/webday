<template>
	<v-layout>
		<qmorntoolbar :title='title'></qmorntoolbar>
	</v-layout>
</template>

<script>
	export default{
		data() {
			return {
				title:"帮助",
				url:'https://static.qmorn.com/help/app/?lan=%s&version=%s'
			}
		},
		methods: {
			
		},
	}
</script>

<style>
	.web{
		
	}
</style>
