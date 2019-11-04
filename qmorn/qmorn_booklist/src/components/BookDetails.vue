<template>
	<div class="container px-0">
		<QmornToolBar title=''></QmornToolBar>
		<div ref="detailbg" class="primarybg text-center pt-2 pb-4">
			<img ref="imgbooks" :src="book.coverUrl" @load="imgbooks" cross-origin="anonymous" class="figure-img img-fluid rounded"></img>
			<div class="bookname">{{book.name}}</div>
		</div>
		<div class="text-right">
			<a v-if="!!book.goodsUrl" :href='book.goodsUrl' target='_blank' class="p-3 d-inline-flex cleara">
				<i class="material-icons primaryicon mr-1">shopping_cart</i>购买
			</a>
			<div class="text-right d-none d-sm-inline-block">
				<a v-if="!!book.bookUrl" :href='book.bookUrl|ossurl' class="p-3 d-inline-flex cleara">
					<i class="material-icons primaryicon mr-1">cloud_download</i>下载
				</a>
			</div>
		</div>
		<div class="col">
			<p></p>
			<div class="des">{{book.description}}</div>
			<p></p>
			<div class="publish">{{book.author}}&nbsp;&nbsp;&nbsp;{{book.publisher}}&nbsp;&nbsp;&nbsp;{{book.pubdate}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'bookdetail',
		data() {
			return {
				book: this.$route.params.book,
			}
		},
		mounted: function() {},
		methods: {
			imgbooks() {

			},
		},
	}
</script>

<style>
	.bookname {
		color: #FFFFFF;
		margin-top: 0.8rem;
	}

	.des {
		text-indent: 2em;
		font-size: 16px;
	}

	.publish {
		color: #A9A9A9;
		font-size: 14px;
	}
	
	.cleara{
		text-decoration: none;
	}
</style>
