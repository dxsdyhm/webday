<template>
	<v-container>
		<v-alert :value="true" type="warning">测试行为，正式版本中将改为微信登陆</v-alert>
		<v-form>
			<v-layout class="contain" align-space-around justify-center column fill-height>
				<v-flex xs12 sm6 md3>
					<v-text-field prefix="86-" prepend-icon="person" label="手机号码" type="text" v-model="phone" clearable></v-text-field>
				</v-flex>
				<v-flex xs12 sm6 md3>
					<v-text-field prepend-icon="lock" label="密码" v-model="pwd" :append-icon=" show ? 'visibility' : 'visibility_off'"
					 :type="show?'text':'password'" @click:append="show=!show"></v-text-field>
				</v-flex>
				<v-btn color="primary" @click="login">登录</v-btn>
			</v-layout>
		</v-form>
	</v-container>
</template>

<script>
	import md5 from 'js-md5';
	export default {
		data() {
			return {
				phone: '',
				pwd: '',
				show: false
			}
		},
		methods: {
			login() {
				if (!this.checkAccount()) {
					this.$message("请输入用户信息")
					return
				}
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
					//登陆失败
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
	}
</script>

<style>
	.contain {
		margin-top: 50%;
	}
</style>
