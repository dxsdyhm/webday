<template>
	<div class="col-4 col-md-3 col-xl-2 my-1 text-center">
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
		width: 6.5rem;
		height: 6.5rem;
	}
	.ww{
		border: 0.0625rem solid #42B983;
	}
</style>
