<template>
	<v-layout column align-space-around>
		<qmorntoolbar :title='title'></qmorntoolbar>
		<v-stepper v-model="el" alt-labels>
			<v-stepper-header>
				<v-stepper-step :complete="el>1" step="1">手机号码</v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step :complete="el>2" step="2">验证码</v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step step="3">设置密码</v-stepper-step>
			</v-stepper-header>
			<v-stepper-items>
				<v-stepper-content step="1">
					<v-layout align-space-around column>
						<v-text-field class="my-5" :prefix="prefixContry" prepend-icon="person" label="手机号码" type="text" v-model="phone"
						 clearable></v-text-field>
						<v-btn color="primary" @click="sendsms()">
							获取验证码
						</v-btn>
					</v-layout>
				</v-stepper-content>

				<v-stepper-content step="2">
					<v-layout align-space-around column>
						<v-text-field class="my-5" label="验证码" type="text" v-model="vertycode"></v-text-field>
						<v-btn color="primary" @click="verty()">
							确定
						</v-btn>
					</v-layout>
				</v-stepper-content>

				<v-stepper-content step="3">
					<v-layout align-space-around column>
						<v-text-field :append-icon="showpwd ? 'visibility' : 'visibility_off'" :rules="[rules.required, rules.min]" :type="showpwd ? 'text' : 'password'"
						 name="input-10-2" label="密码" hint="最少6个字符" v-model="pwd" class="mt-5 mb-3 input-group--focused" @click:append="showpwd = !showpwd"></v-text-field>
						<v-text-field :append-icon="showpwd ? 'visibility' : 'visibility_off'" :rules="[rules.pwdMatch]" :type="showpwd ? 'text' : 'password'"
						 name="input-10-2" label="确认密码" v-model="pwdagain" @click:append="showpwd = !showpwd" class="mb-5"></v-text-field>
						<v-btn color="primary" @click="regist()">
							{{title}}
						</v-btn>
					</v-layout>
				</v-stepper-content>
			</v-stepper-items>
		</v-stepper>
	</v-layout>
</template>

<script>
	import md5 from 'js-md5';
	export default {
		data() {
			return {
				title: '注册',
				el: 1,
				phone: '',
				contrycode: '86',
				vertycode: '',
				type: 1,
				showpwd: false,
				pwd: '',
				pwdagain: '',
				rules: {
					required: value => !!value || 'Required.',
					min: v => v.length >= 6 || '最少6个字符',
					pwdMatch: () => this.pwd === this.pwdagain || ('两次输入的密码不一致')
				}
			}
		},
		methods: {
			sendsms() {
				this.$api.user.sendsms({
					countryCode: this.contrycode,
					phoneNo: this.phone,
					type: this.type
				}).then(res => {
					this.el = 2;
				}).catch(error => {
					this.$message(error.msg)
				})
			},
			verty() {
				this.$api.user.vertycode({
					account: this.prefixContry + this.phone,
					verifyCode: this.vertycode,
					type: this.type
				}).then(res => {
					this.el = 3;
				}).catch(error => {
					this.$message(error.msg)
				})
			},
			regist() {
				this.$api.user.regist({
					account: this.prefixContry + this.phone,
					verifyCode: this.vertycode,
					pwd: this.mdPwd
				}).then(res => {
					//注册成功，将账号带会登陆页面，让用户重新登陆
					this.$router.push({name:'user',params:{phone:this.phone}})
				}).catch(error => {
					this.$message(error.msg)
				})
			}
		},
		computed: {
			prefixContry() {
				return this.contrycode + "-"
			},
			'mdPwd': function() {
				return md5(this.pwd).toUpperCase()
			},
		}
	}
</script>

<style>
</style>
