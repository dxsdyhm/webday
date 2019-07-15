<template>
	<v-layout column>
		<qmorntoolbar title='' gape="no"></qmorntoolbar>
		<v-responsive :aspect-ratio="16/9" class="primary" fill-height>
			<v-layout align-center justify-center column fill-height>
				<v-avatar :size=144 tile>
					<v-img :src="book.coverUrl" class="detail" cross-origin="anonymous"></v-img>
				</v-avatar>
				<div class="bookname">{{book.name}}</div>
			</v-layout>
		</v-responsive>
		<p></p>
		<div>{{book.description}}</div>
		<p></p>
		<div>{{book.author}}&nbsp;&nbsp;&nbsp;{{book.publisher}}&nbsp;&nbsp;&nbsp;{{book.pubdate}}</div>
	</v-layout>
</template>

<script>
	import Grade from 'grade-js'
	export default{
		data() {
			return {
				title:this.$route.params.book.name,
				book:this.$route.params.book,
			}
		},
		methods: {
			
		},
	}
</script>

<style>
	.detail{
		width: 3.125rem;
		height: 3.125rem;
	}
	.bookname{
		color: #FFFFFF;
		margin-top: 1rem;
	}
</style>