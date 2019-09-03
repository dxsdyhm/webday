<template>
	<v-container>
		<v-layout class="contain" align-center justify-center column fill-height>
			<v-avatar class="qmorn" :size=96 tile>
				<img src="../../assets/img/logo.svg" />
			</v-avatar>
			<v-layout v-if="logintype==='0'||showMuti" column align-space-between>
				<v-flex xs12 sm6 md3>
					<v-text-field prefix="86-" prepend-icon="person" label="手机号码" type="text" v-model="phone" clearable></v-text-field>
				</v-flex>
				<v-flex xs12 sm6 md3>
					<v-text-field prepend-icon="lock" label="密码" v-model="pwd" :append-icon=" show ? 'visibility' : 'visibility_off'"
					 :type="show?'text':'password'" @click:append="show=!show"></v-text-field>
				</v-flex>
				<v-btn color="primary" @click="login">登录</v-btn>
				<v-layout row class="my-2">
					<router-link to="/findpwd">
						<div class="px-1">找回密码</div>
					</router-link>
					<v-spacer></v-spacer>
					<router-link to="/regist">
						<div class="px-1">注册</div>
					</router-link>
				</v-layout>
			</v-layout>
			<v-progress-circular v-else :size="56" :width="4" color="primary" indeterminate></v-progress-circular>
		</v-layout>
	</v-container>
</template>

<script>
	import md5 from 'js-md5';
	import {
		mapActions
	} from 'vuex'
	import {
		getUrlKey
	} from '../../utils/utils.js'
	import {
		iotinit,
		disconnect
	} from '../../aliiot/iot.js';
	export default {
		props: {
			logintype: {
				type: String,
				default: '0'
			}
		},
		data() {
			return {
				phone: this.$route.params.phone || '',
				pwd: '',
				show: false,
				showMuti: false,
			}
		},
		methods: {
			...mapActions([
				'weixinLogin',
			]),
			login() {
				this.$api.user.login({
					account: this.sufixUser,
					pwd: this.mdPwd,
					appOs: '3',
					appToken: '97D0E83CD2ED48b0A511590B78EA3B0AC09B6234AFCF4bfa9B73BF8199BEA302',
					packageName: 'com.qmx.qimengxing'
				}).then(res => {
					//vuex 存储user信息
					this.$store.commit('updateUserInfo', res.data)
					//router 跳转到main
					this.$router.replace('main')
				}).catch(res => {
					this.$message(res.msg)
				})
			},
			checkAccount() {
				return !!this.phone || !!this.pwd
			}
		},
		computed: {
			'sufixUser': function() {
				return '86-' + this.phone
			},
			'mdPwd': function() {
				return md5(this.pwd).toUpperCase()
			},

		},
		mounted() {
			disconnect()
			if (this.logintype === '1') {
				//微信登陆
				console.log("微信登陆")
				let code = getUrlKey('code');
				let state = getUrlKey('state')
				//调用后台微信登陆接口，如果失败，转而展示普通登陆界面
				if (code) {
					this.$api.user.thirdlogin({
						thirdType: 1,
						thirdAccessCode: code,
						option: 'getAliyunIotInfo',
						appOs:50,
						appToken: '97D0E83CD2ED48b0A511590B78EA3B0AC09B6234AFCF4bfa9B73BF8199BEA302',
						packageName: 'com.qmx.qimengxing'
					}).then(res => {
						//修改登陆类型
						this.$store.commit('setlogintype', 1)
						//vuex 存储user信息
						this.$store.commit('updateUserInfo', res.data)
						//router 跳转到main
						this.$router.replace('main')
					}).catch(res => {
						this.showMuti=true;
					})
				}else{
					this.showMuti=true;
				}
			}
		}
	}
</script>

<style>
	.contain {
		/* margin-top: 50%; */
	}

	.qmorn {
		margin-top: 4rem;
		margin-bottom: 3rem;
	}

	a {
		text-decoration: none;
	}

	.router-link-active {
		text-decoration: none;
	}
</style>
