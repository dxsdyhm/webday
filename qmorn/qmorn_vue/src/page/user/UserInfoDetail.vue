<template>
	<div>
		<qmorntoolbar :title='title'></qmorntoolbar>
		<v-list class="userinfo">
			<v-list-item>
				<v-list-item-content>
					<v-list-item-title v-text="'头像'"></v-list-item-title>
				</v-list-item-content>

				<v-list-item-avatar>
					<img :src="userimg">
				</v-list-item-avatar>
			</v-list-item>
			<v-list-item>
				<v-list-item-content>
					<v-list-item-title v-text="'手机号'"></v-list-item-title>
				</v-list-item-content>
			
				<v-list-item-action-text>
					{{userphone}}
				</v-list-item-action-text>
			</v-list-item>
		</v-list>
		<v-col :v-show="showlogout">
			<v-btn block color="red" dark @click="exit">退出登陆</v-btn>
		</v-col>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: '用户信息'
			}
		},
		methods: {
			exit(){
				this.$router.push('/user')
			}
		},
		computed:{
			userimg(){
				return this.$store.getters.getUserInfo.image
			},
			userphone(){
				return this.$store.getters.getUserInfo.phoneNo
			},
			showlogout(){
				return this.$store.getters.showSpecial
			}
		}
	}
</script>

<style>
	.userinfo{
		margin-top: 0.5rem;
		margin-bottom: 4rem;
	}
</style>
