<template>
	<div class="col-4 col-md-3 col-xl-2 my-1 text-center">
		<figure class="figure">
			<div class="ratio rounded shadow">
				<b-img-lazy :src="book.coverUrl" class="figure-img cov"></b-img-lazy>
			</div>
			<figcaption class="figure-caption text-left mt-2">{{book.name}}</figcaption>
		</figure>
	</div>
</template>

<script>
	export default {
		methods: {

		},
		props: {
			book: {
				type: Object,
				default: () => {
					return {
						coverUrl: '',
						name: '',
					}
				}
			},
		},
	}
</script>

<style>
	@media (max-width: 575.98px) {
		.ratio {
			overflow: hidden;
			position: relative;
			width: 6.5rem;
			height: 6.5rem;
		}
	}
	
	@media (min-width: 576px) and (max-width: 767.98px) {
		.ratio {
			overflow: hidden;
			position: relative;
			width: 7rem;
			height: 7rem;
		}
	}
	
	@media (min-width: 768px) and (max-width: 991.98px) {
		.ratio {
			overflow: hidden;
			position: relative;
			width: 8rem;
			height: 8rem;
		}
	}
	
	@media (min-width: 992px) and (max-width: 1199.98px) {
		.ratio {
			overflow: hidden;
			position: relative;
			width: 9rem;
			height: 9rem;
		}
	}
	
	@media (min-width: 1200px) {
		.ratio {
			overflow: hidden;
			position: relative;
			width: 10rem;
			height: 10rem;
		}
	}

	.cov {
		position: absolute;
		width: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
