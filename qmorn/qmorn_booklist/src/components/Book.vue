<template>
	<div class="col-4 col-sm-6 col-md-4 col-xl-4 my-3 text-center">
		<figure class="figure d-sm-none foot">
			<div class="ratio rounded shadow">
				<b-img-lazy :src="book.coverUrl" class="card-img cov"></b-img-lazy>
			</div>
			<figcaption class="figure-caption text-left mt-2">{{book.name}}</figcaption>
		</figure>
		<div class="card border-light d-none d-sm-block px-3 pb-3" v-bind:class="[shadowlarge?'shadow-lg':'shadow']" @mouseenter="addshadow" @mouseleave="releaseshadow">
			<b-img-lazy :src="book.coverUrl" class="img-fluid rounded cardimg mt-4"></b-img-lazy>
			<figcaption class="figure-caption text-center mt-2">{{book.name}}</figcaption>
			<hr />
			<div class="text-left descrip">不识字、甚至还没有学会说话和走路的幼儿，书本对他们真的有用吗甚至还没有学会说话和走路的幼儿甚至还没有学会说话和走路的幼儿</div>
			<div class="row mt-2">
				<div class="col text-left">{{book.pubdate}}</div>
				<a v-if="!!book.bookUrl" :href='"https://static.qmorn.com/apk/app/qmorn_app_1.0.12.apk"' class="col-auto"
				 v-on:click.stop.capture="down()">
					<!-- <i class="material-icons col-auto primaryicon">cloud_download</i> -->
					下载
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				shadowlarge:false,
			}
		},
		methods: {
			down() {
				console.log("dsdsd")
			},
			addshadow(){
				this.shadowlarge=true
			},
			releaseshadow(s){
				this.shadowlarge=false
			}
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

		.foot {
			width: 6.5rem;
		}
	}

	/* @media (min-width: 576px) and (max-width: 991.98px) {
		.ratio {
			overflow: hidden;
			position: relative;
			width: 7rem;
			height: 7rem;
		}

		.foot {
			width: 7rem;
		}
	}

	@media (min-width: 992px) and (max-width: 1199.98px) {
		.ratio {
			overflow: hidden;
			position: relative;
			width: 9rem;
			height: 9rem;
		}

		.foot {
			width: 9rem;
		}
	}

	@media (min-width: 1200px) {
		.ratio {
			overflow: hidden;
			position: relative;
			width: 10rem;
			height: 10rem;
		}

		.foot {
			width: 10rem;
		}
	} */

	.cov {
		position: absolute;
		width: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.primaryicon {
		color: #17A2B8;
	}

	.cardimg {
		max-width: 10rem;
		max-height: 10rem;
	}

	.descrip {
		font-size: 0.875rem;
		color: #888888;
		height: 3.2em;
		text-overflow: ellipsis;
		overflow: hidden;
		display: block;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
