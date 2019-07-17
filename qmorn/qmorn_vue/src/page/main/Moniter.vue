<template>
	<v-layout column>
		<qmorntoolbar :title="title"></qmorntoolbar>
		<v-layout row>
			<v-container grid-list-xl fluid v-if="getGroupMessage.length>0" row>
				<v-layout class="latext" align-center v-for="(msg, index) in getGroupMessage" :key="msg.chatmsgid" row :align-start="!ismyself(msg.sendid)" :align-end="ismyself(msg.sendid)"
				 :align-content-start="ismyself(msg.sendid)" :align-content-end="!ismyself(msg.sendid)">
					<v-avatar v-if="!ismyself(msg.sendid)">
						<v-img :src="userimage(msg.sendid)"></v-img>
					</v-avatar>
					<v-flex xs6 sm4 :offset-xs6="ismyself(msg.sendid)" :offset-sm8="ismyself(msg.userid)">
						<v-card class="msg" :color="ismyself(msg.sendid) ? 'primary' : 'blue' " flat>
							<v-card-text :class="ismyself(msg.sendid) ? 'white--text' : 'white--text' ">
								{{msg.text}}
							</v-card-text>
						</v-card>
					</v-flex>
					<v-avatar v-if="ismyself(msg.sendid)">
						<v-img :src="userinfo.image"></v-img>
					</v-avatar>
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
			<v-text-field ref="searchbar" class="ma-1 elevation-0 searchbar" v-model="messtext" solo flat hide-details label="" append-icon="send" @click:append='sendMessage()' @keyup.enter="sendMessage()"></v-text-field>
		</v-footer>
	</v-layout>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import {
		sendGroupMesg
	} from '../../aliiot/iot.js';
	export default {
		data() {
			return {
				messageInputHeight: '56px',
				title: '远程陪护',
				messtext: '',
				// messageTemp: {
				// 	cmd: 27,
				// 	option: 1,
				// 	msgid: 0,
				// 	error: 0,
				// 	type: 0,
				// 	text: '',
				// 	url: '',
				// 	localuri: '',
				// 	time: 0,
				// 	duration: 0,
				// 	sendid: 0,
				// 	buckname: '',
				// 	objkey: '',
				// 	extra: '',
				// 	chatmsgid: 1,
				// 	elfid: 0,
				// 	groupid: 0,
				// },
			}
		},
		methods: {
			sendMessage() {
				if(this.messtext.trim().length<=0){
					return;
				}
				let message=this.getSendTextMessage();
				sendGroupMesg(this.$iotdevice, message, this.userrole)
				this.$store.commit('addGroupMessage', message)
				this.messtext="";
			},
			ismyself(userid) {
				return parseInt(userid) === this.userinfo.uid;
			},
			getUtcTime() {
				let date=new Date();
				let y = date.getUTCFullYear();
				let m = date.getUTCMonth();
				let d = date.getUTCDate();
				let h = date.getUTCHours();
				let M = date.getUTCMinutes();
				let s = date.getUTCSeconds();
				return Date.UTC(y,m,d,h,M,s);
			},
			getSendTextMessage(){
				let msgid=this.chatmsid();
				return {
					cmd: 27,
					option: 1,
					msgid: msgid,
					error: 0,
					type: 0,
					text: this.messtext,
					url: '',
					time: this.getUtcTime(),
					duration: 0,
					sendid: this.userinfo.uid,
					chatmsgid: msgid,
					elfid: this.selectdevice.id,
					groupid: this.getGroupInfo.id,
				}
			},
			chatmsid(){
				return Math.round(new Date().getTime()/1000-this.$store.state.activeUser.lastUpdated/1000);
			},
			userimage(userid){
				for (var i = 0; i < this.users.length; i++) {
					if (this.users[i].id === userid) {
						return this.users[i].image;
					}
				}
				return this.userinfo.image;
			}
		},
		mounted() {
			this.$api.user.getGroupInfo({
				deviceList: [
					this.selectdevice.id
				]
			}).then(res => {
				console.log(res)
				this.$store.commit('setGroupInfo', res.data.groupInfoAndMemberList[0])
			}).catch(res => {
				//登陆失败
				this.$message(res.msg)
			})
		},
		computed: {
			...mapGetters({
				selectdevice: 'getSelectDevice',
				userinfo: 'getUserInfo',
				getGroupMessage: 'getGroupMessage',
				getGroupInfo: 'getGroupInfo',
			}),
			users() {
				return this.getGroupInfo.groupMemberInfoWithRsBabyList;
			},
			userrole() {
				for (var i = 0; i < this.users.length; i++) {
					if (this.users[i].id === this.userinfo.uid) {
						return this.users[i].role;
					}
				}
				return 2;
			},
		}
	}
</script>

<style>
	.latext{
	}
</style>
