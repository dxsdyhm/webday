<template>
	<div class="col-4 my-1 text-center">
		<figure class="figure">
			<b-img-lazy :src="book.coverUrl" class="figure-img shadow rounded ratio"></b-img-lazy>
			<figcaption class="figure-caption text-left">{{book.name}}</figcaption>
		</figure>
	</div>
</template>

<script>
	export default{
		methods: {
		
		},
		props: {
			book: {
				type: Object,
				default: ()=>{
					return {
						coverUrl:'',
						name:'',
					}
				}
			},
		},
	}
</script>

<style>
	.ratio{
		width: 7rem;
		height: 7rem;
	}
</style>
