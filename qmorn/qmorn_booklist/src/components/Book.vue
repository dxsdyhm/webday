<template>
	<div class="col-4 col-md-3 col-xl-2 my-1 text-center">
		<figure class="figure">
			<b-img-lazy :src="book.coverUrl" class="figure-img shadow rounded ratio"></b-img-lazy>
			<figcaption class="figure-caption text-left">{{book.name}}</figcaption>
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
			width: 6.5rem;
			height: 6.5rem;
		}
	}

	@media (min-width: 576px) and (max-width: 767.98px) {
		.ratio {
			width: 7rem;
			height: 7rem;
		}
	}

	@media (min-width: 768px) and (max-width: 991.98px) {
		.ratio {
			width: 8rem;
			height: 8rem;
		}
	}

	@media (min-width: 992px) and (max-width: 1199.98px) {
		.ratio {
			width: 9rem;
			height: 9rem;
		}
	}

	@media (min-width: 1200px) {
		.ratio {
			width: 10rem;
			height: 10rem;
		}
	}

	.ww {
		border: 0.0625rem solid #42B983;
	}
</style>
