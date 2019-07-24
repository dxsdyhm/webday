<template>
	<div class="col px-0">
		<div class="primarybg text-center pt-5 pb-4">
			<figure class="figure">
				<b-img-lazy :src="book.coverUrl" class="figure-img img-fluid rounded"></b-img-lazy>
				<figcaption class="figure-caption bookname">{{book.name}}</figcaption>
			</figure>
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
	}
</script>

<style>
	.bookname{
		color: #FFFFFF;
		margin-top: 1rem;
	}
	.des{
		text-indent: 2em;
		font-size: 16px;
	}
	.publish{
		color: #A9A9A9;
		font-size: 14px;
	}
</style>
