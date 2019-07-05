<template>
	<v-layout column fill-height>
		<qmorntoolbar :title='title'></qmorntoolbar>
		<v-list class="userinfo">
			<v-list-tile avatar>
				<v-list-tile-content>
					<v-list-tile-title v-text="'头像'"></v-list-tile-title>
				</v-list-tile-content>

				<v-list-tile-avatar>
					<img :src="userimg">
				</v-list-tile-avatar>
			</v-list-tile>
			<v-list-tile avatar>
				<v-list-tile-content>
					<v-list-tile-title v-text="'手机号'"></v-list-tile-title>
				</v-list-tile-content>
			
				<v-list-tile-action-text>
					{{userphone}}
				</v-list-tile-action-text>
			</v-list-tile>
		</v-list>
		<v-btn class="exit" color="red" dark @click="exit">退出登陆</v-btn>
	</v-layout>
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
