<template>
	<div class="mw-100 mh-35 bg">{{book.name}}</div>
</template>

<script>
	export default{
		name:'bookdetail',
		data() {
			return {
				book:this.$route.params.book,
			}
		},
		mounted: function () {
		},
	}
</script>

<style>
	.bg{
		width: 100%;
		height: 100px;
	}
</style>
