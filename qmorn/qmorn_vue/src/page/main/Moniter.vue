<template>
	<div v-resize="onResize">
		<qmorntoolbar :title="title" gape="no"></qmorntoolbar>
		<div class="d-flex flex-column" fluid v-if="getGroupMessage.length>0">
			<v-row class="latext my-2" align='center' no-gutters v-for="(msg, index) in getGroupMessage" :key="msg.chatmsgid"
			 :justify="ismyself(msg.sendid)?'end':'start'">
				<template v-if="!ismyself(msg.sendid)">
					<v-col cols="2" class="text-center">
						<v-avatar>
							<v-img :src="userinfo.image"></v-img>
						</v-avatar>
					</v-col>
					<v-col cols="auto">
						<v-card class="msg" :color="ismyself(msg.sendid) ? 'primary' : 'blue' " flat max-width="70vw">
							<v-card-text :class="ismyself(msg.sendid) ? 'white--text' : 'white--text' ">
								{{msg.text}}
							</v-card-text>
						</v-card>
					</v-col>
				</template>
				<template v-else>
					<v-col cols="auto" class="">
						<v-card class="msg" :color="ismyself(msg.sendid) ? 'primary' : 'blue' " flat max-width="70vw">
							<v-card-text :class="ismyself(msg.sendid) ? 'white--text' : 'white--text' ">
								{{msg.text}}
							</v-card-text>
						</v-card>
					</v-col>
					<v-col cols="2" class="text-center">
						<v-avatar>
							<v-img :src="userimage(msg.sendid)"></v-img>
						</v-avatar>
					</v-col>
				</template>
			</v-row>
			<div ref="end"></div>
		</div>
		<v-container v-else fluid>
			<v-card color="blue">
				<v-card-text>
					<v-icon class="pa-2">info</v-icon>没有聊天记录
				</v-card-text>
			</v-card>
		</v-container>
		<v-footer class="" app inset :absolute='keybord' padless :style="{height: messageInputHeight}" v-bind:class="keybord?'mb-5':''">
			<v-text-field ref="searchbar" class="ma-1 elevation-0 searchbar" v-model="messtext" solo flat hide-details clearable
			 label="" append-icon="send" @click:append='sendMessage()' @keyup.enter="sendMessage()"></v-text-field>
		</v-footer>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import {
		sendGroupMesg
	} from '../../aliiot/iot.js';
	import weixin from '../../weixin/weixin.js';
	export default {
		data() {
			return {
				messageInputHeight: '56px',
				title: '远程陪护',
				messtext: '',
				keybord: false,
				windowSize: {
					x: 0,
					y: 0,
				},
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
				if (this.messtext.trim().length <= 0) {
					return;
				}
				let message = this.getSendTextMessage();
				try {
					sendGroupMesg(this.$iotdevice, message, this.userrole)
					this.$store.commit('addGroupMessage', message)
					this.messtext = "";
				} catch (e) {
					//TODO handle the exception
					this.$message({
						message: "发送失败，设备已离线",
						type: "error"
					})
				}
			},
			ismyself(userid) {
				return parseInt(userid) === this.userinfo.uid;
			},
			getUtcTime() {
				let date = new Date();
				let y = date.getUTCFullYear();
				let m = date.getUTCMonth();
				let d = date.getUTCDate();
				let h = date.getUTCHours();
				let M = date.getUTCMinutes();
				let s = date.getUTCSeconds();
				return Date.UTC(y, m, d, h, M, s);
			},
			getSendTextMessage() {
				let msgid = this.chatmsid();
				return {
					cmd: 27,
					option: 1,
					msgid: msgid,
					error: 0,
					type: 0,
					text: this.messtext,
					url: '',
					time: this.getUtcTime() / 1000,
					duration: 0,
					sendid: this.userinfo.uid,
					chatmsgid: msgid,
					elfid: this.selectdevice.id,
					groupid: this.getGroupInfo.id,
					localuri: '',
					buckname: '',
					objkey: '',
					extra: ''
				}
			},
			chatmsid() {
				return Math.round(new Date().getTime() / 1000 - this.$store.state.activeUser.lastUpdated / 1000);
			},
			userimage(userid) {
				for (var i = 0; i < this.users.length; i++) {
					if (this.users[i].id === userid) {
						return this.users[i].image;
					}
				}
				return this.userinfo.image;
			},
			onResize() {
				if ((!weixin.isWeixin()) && this.windowSize.y - window.innerHeight > 60) {
					this.keybord = true
				} else {
					this.keybord = false
				}
			}
		},
		mounted() {
			this.windowSize = {
				x: window.innerWidth,
				y: window.innerHeight
			}
			this.onResize()
			this.$api.user.getGroupInfo({
				deviceList: [
					this.selectdevice.id
				]
			}).then(res => {
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
		},
		watch: {
			'$store.getters.getGroupMessage': function(select) {
				this.$vuetify.goTo(this.$refs.end, {
					duration: 1000,
					offset: 0,
					easing: "easeInOutCubic",
				})
			}
		}
	}
</script>

<style>
	.latext {}
</style>
