<template>
	<div class="col-4 col-lg-6 col-xl-4 my-3 text-center">
		<figure class="figure d-lg-none foot" @click="toSigleBook(book)">
			<div class="ratio rounded shadow">
				<b-img-lazy :src="book.coverUrl" class="card-img cov"></b-img-lazy>
			</div>
			<figcaption class="figure-caption text-left mt-2">{{book.name}}</figcaption>
		</figure>
		<div class="card border-light d-none d-lg-block px-3 pb-3 shadowtrans" v-bind:class="[shadowlarge?'shadow-lg':'shadow']"
		 @mouseenter="addshadow" @mouseleave="releaseshadow">
			<div class="conten d-flex flex-column">
				<div @click="toSigleBook(book)">
					<b-img-lazy :src="book.coverUrl" class="img-fluid rounded cardimg mt-4"></b-img-lazy>
					<figcaption class="figure-caption text-center mt-2 descrip1">{{book.name}}</figcaption>
					<hr />
				</div>
				<div class="flex-grow-1">
					<div class="text-left descrip align-middle">{{book.description}}</div>
				</div>
				<div class="row mt-2">
					<div class="col text-left">{{book.pubdate}}</div>
					<a v-if="!!book.goodsUrl" :href='book.goodsUrl' class="col-auto" target='_blank' v-on:click.stop.capture="down()">
						<!-- <i class="material-icons col-auto primaryicon">cloud_download</i> -->
						购买
					</a>
					<a v-if="!!book.bookUrl" :href='book.bookUrl|ossurl' class="col-auto" v-on:click.stop.capture="down()">
						<!-- <i class="material-icons col-auto primaryicon">cloud_download</i> -->
						下载
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				shadowlarge: false,
			}
		},
		methods: {
			down() {
				console.log("dsdsd")
			},
			addshadow() {
				this.shadowlarge = true
			},
			releaseshadow(s) {
				this.shadowlarge = false
			},
			toSigleBook(book) {
				//系列应该跳转到系列列表，单本书跳转到详情
				let target ='bookdetail'
				if(!!book.seriseId){
					target='bookcatena'
				}
				this.$router.push({
					name: target,
					params: {
						'book': book
					}
				})
			},
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
	@media (max-width: 991.98px) {
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
		cursor: pointer;
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

	.descrip1 {
		height: 1.5em;
		text-overflow: ellipsis;
		overflow: hidden;
		display: block;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.shadowtrans {
		transition: box-shadow .3s;
	}
	.conten{
		height: 25rem;
	}
</style>
