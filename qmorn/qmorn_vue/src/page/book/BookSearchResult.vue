<template>
	<v-layout column>
		<qmorntoolbar :title='title' gape="no"></qmorntoolbar>
		<v-text-field ref="searchbar" class="ma-2 elevation-0 searchbar" v-model="keyword" solo flat hide-details label="输入书名或ISBN" append-icon="search" @click:append='search' @keyup.enter="search"></v-text-field>
		<!-- <v-chip >
			<v-text-field ref="searchbar" label="输入书名或ISBN" append-icon="search" value="keyword" hide-details single-line full-width @click:append='search' @keyup.enter="search"></v-text-field>
		</v-chip> -->
		<v-list v-if="booklist&&booklist.length>0">
			<v-layout class="itembook" row v-for="(item, index) in booklist" :key="item.name" @click="toShowDetail(item)">
				<v-flex xs3>
					<v-avatar :size=96 tile>
						<v-img class="img" :src="item.coverUrl"></v-img>
					</v-avatar>
				</v-flex>
				<v-flex xs9 fill-height>
					<v-layout column justify-space-between fill-height class="bookdetail">
						<div>{{item.name}}</div>
						<div class="bookPublish">{{item.description}}</div>
						<p></p>
						<p></p>
						<div class="bookdowm">{{item.author}}&nbsp;&nbsp;{{item.publisher}}&nbsp;&nbsp;{{item.pubdate}}</div>
					</v-layout>
				</v-flex>
			</v-layout>
		</v-list>
		<v-layout v-else align-center justify-center column fill-height class="mt-4">
			没有查询到结果
		</v-layout>
	</v-layout>
</template>

<script>
	export default {
		props: {
			keyword: {
				type: String,
				default: '',
			}
		},
		data() {
			return {
				title: '绘本查询',
				pageIndex: 1,
				pageSize: 100,
				booklist: [],
			}
		},
		methods: {
			search() {
				this.$api.user.searchBook({
					key: this.keyword,
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
				}).then(response => {
					console.log(response.data)
					this.booklist = response.data.bookList;
					this.$refs.searchbar.blur();
				}).catch(error => {
					this.$message(error.msg)
				});
			},
			toShowDetail(book) {
				this.$router.push({
					name: 'bookdetail',
					params: {
						book: book
					}
				})
			}
		},
		mounted() {
			if (this.booklist.length <= 0) {
				this.search()
			}
		}
	}
</script>

<style>
	.itembook {
		padding: 0.5rem;
	}

	.bookPublish {
		color: #A1A1A0;
		font-size: 0.85rem;
	}

	.bookdowm {
		font-size: 0.5rem;
	}

	.bookdetail {
		margin-left: 1rem;
	}

	.searchbar {}
</style>
