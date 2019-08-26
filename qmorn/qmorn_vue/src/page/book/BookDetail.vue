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
		<div class="des px-2">{{book.description}}</div>
		<p></p>
		<div class="px-2">{{book.author}}&nbsp;&nbsp;&nbsp;{{book.publisher}}&nbsp;&nbsp;&nbsp;{{book.pubdate}}</div>
		<v-btn v-if="booklistids" class="ma-4" color="gray" disabled>已添加到书架</v-btn>
		<v-btn v-else class="ma-4" color="primary" @click="addbook">添加到书架</v-btn>
	</v-layout>
</template>

<script>
	import { mapGetters,mapActions} from 'vuex'
	export default{
		data() {
			return {
				title:this.$route.params.book.name,
				book:this.$route.params.book,
			}
		},
		methods: {
			addbook(){
				this.$api.user.addbook({
					deviceId: this.getSelectDevice.id,
					bookId: this.book.id,
				}).then(response => {
					this.$message({message:'添加成功',type:'success'})
					this.$store.commit('addBook', response.data)
				}).catch(error => {
					this.$message(error.msg)
				});
			}
		},
		computed:{
			...mapGetters({
				bookLists:'getBookLists',
				getSelectDevice:'getSelectDevice',
			}),
			booklistids(){
				let ids=[]
				this.bookLists.forEach(item=>{
					ids.push(item.id)
				})
				return ids.includes(this.book.id);
			}
		}
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
	.des{
		text-indent: 2em;
	}
</style>