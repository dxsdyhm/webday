<template>
	<v-layout column>
		<qmorntoolbar :title="title" :gape="no"></qmorntoolbar>
		<v-container fluid grid-list-lg>
			<v-layout row wrap>
				<v-flex v-for="item in bookLists" :key="item.id" xs4>
					<v-card class="elevation-1">
						<v-img :src="item.coverUrl" aspect-ratio="1"></v-img>
						<div class="cardText">
							<div class="bookName">{{item.name}}</div>
							<div class="bookPublish gray--text">{{item.publisher}}</div>
						</div>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
		<v-btn v-model="fab" color="primary" dark fab fixed bottom right>
			<v-icon dark>add</v-icon>
		</v-btn>
	</v-layout>
</template>

<script>
	import { mapGetters} from 'vuex'
	export default {
		inject: ['reload'],
		data() {
			return {
				title: '绘本书架',
				fab: false,
				no:'no'
			}
		},
		created: function() {
			this.getBookList()
		},
		methods: {
			getBookList() {
				this.$api.user.getBookList({
					deviceId: this.$store.getters.getSelectDevice.id,
					bookListIn: [],
				}).then(res => {
					this.$store.commit('updateBookList', res.data.bookList)
				}).catch(res => {
					//登陆失败
					this.$message(res.msg)
				})
			}
		},
		computed: {
			...mapGetters({
				bookLists:'getBookLists'
			})
		}
	}
</script>

<style>
	.qmorn_card {
		margin: 0.1rem;
	}

	.bookName,
	.bookPublish {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.75rem;
	}
	.cardText{
		padding: 1rem 0.3rem 0.9rem 0.3rem;
	}
</style>
