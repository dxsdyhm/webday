<template>
	<v-layout column>
		<qmorntoolbar :title="title"></qmorntoolbar>
		<v-layout row>
			<v-container grid-list-xl fluid v-if="directMessages.length>0" row>
				<v-layout v-for="(msg, index) in directMessages" :key="msg.id" row :align-start="ismyself(msg.userid)"
				 :align-end="!ismyself(msg.userid)" :align-content-start="ismyself(msg.userid)"
				 :align-content-end="!ismyself(msg.userid)">
					<v-flex xs6 sm4 :offset-xs6="ismyself(msg.userid)" :offset-sm8="ismyself(msg.userid)">
						<v-card class="msg" :color="ismyself(msg.userid) ? 'blue' : 'white' ">
							<v-card-text :class="ismyself(msg.userid) ? 'white--text' : 'black--text' ">
								{{msg.msg}}
							</v-card-text>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
			<v-container v-else fluid>
				<v-card color="blue">
					<v-card-text>
						<v-icon class="pa-2">info</v-icon>没有聊天记录
					</v-card-text>
				</v-card>
			</v-container>
		</v-layout>
		<v-footer app inset :style="{height: messageInputHeight}">
			<v-layout row align-center class="pa-4">
				<v-flex xs11>
					<v-text-field v-model="message" @keyup.enter="sendMessage()" single-line label="Type a message..."></v-text-field>
				</v-flex>
				<v-flex xs1 align-end style="min-width: 100px">
					<v-btn color="blue" flat @click="sendMessage()"><v-icon>send</v-icon>
					</v-btn>
				</v-flex>
			</v-layout>
		</v-footer>
	</v-layout>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				messageInputHeight: '56px',
				title: '远程陪护',
				message:'',
				directMessages:[
					{
						msgid:0,
						userid:10043,
						msg:'测试内容',
						type:1,
						time:new Date().getDate()
					}
				]
			}
		},
		methods:{
			sendMessage(){
				
			},
			getMessages(){
				return [];
			},
			ismyself(userid){
				return userid===this.userinfo.id;
			}
		},
		mounted() {
			this.$api.user.getdeviceinfo({
				deviceList:[
					this.selectdevice.id
				]
			}).then(res => {
				console.log(res)
				this.$store.commit('setGroupInfo', res.data.groupInfoList[0])
			}).catch(res => {
				//登陆失败
				this.$message(res.msg)
			})
		},
		computed:{
			...mapGetters({
				selectdevice: 'getSelectDevice',
				userinfo:'getUserInfo',
			}),
		}
	}
</script>

<style>
</style>
