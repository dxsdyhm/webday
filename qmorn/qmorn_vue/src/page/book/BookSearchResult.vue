<template>
	<div>
		<qmorntoolbar :title='title' gape="no"></qmorntoolbar>
		<v-text-field ref="searchbar" class="ma-2 elevation-0 searchbar" v-model="keyword" solo flat hide-details label="输入书名或ISBN" append-icon="search" @click:append='search' @keyup.enter="search"></v-text-field>
		<v-list v-if="booklist&&booklist.length>0">
			<v-row class="ma-0 my-n3" v-for="(item, index) in booklist" :key="item.id" @click="toShowDetail(item)">
				<v-col cols="3">
					<v-avatar :size=96 tile>
						<v-img class="img" :src="item.coverUrl"></v-img>
					</v-avatar>
				</v-col>
				<v-col cols="9">
					<div class="d-flex itembook flex-column pl-1">
						<div>{{item.name}}</div>
						<div class="bookPublish">{{item.description}}</div>
						<div class="bookdowm mt-auto">{{item.author}}&nbsp;&nbsp;{{item.publisher}}&nbsp;&nbsp;{{item.pubdate}}</div>
					</div>
				</v-col>
			</v-row>
		</v-list>
		<div v-else align-center justify-center column fill-height class="mt-4">
			没有查询到结果
		</div>
	</div>
</template>

<script>
	export default {
		name:'BookSearchResult',
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
		height: 6.2rem;
	}

	.bookPublish {
		color: #A1A1A0;
		font-size: 0.85rem;
	}

	.bookdowm {
		font-size: 0.5rem;
	}
</style>
