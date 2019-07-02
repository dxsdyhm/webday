<template>
	<div id="containt">
		<div class="login">
			<el-input placeholder="手机号码" v-model="phone" clearable></el-input>
			<el-input placeholder="密码" v-model="pwd" show-password></el-input>
			<el-button type="primary" @click="login">登录</el-button>
		</div>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	export default {
		data() {
			return {
				phone: '',
				pwd: ''
			}
		},
		methods: {
			
			login() {
				if(!this.checkAccount()){
					this.$message("请输入用户信息")
					return
				}
				this.$api.user.login({
					account:this.sufixUser,
					pwd: this.mdPwd,
					appOs:'3',
					appToken:'97D0E83CD2ED48b0A511590B78EA3B0AC09B6234AFCF4bfa9B73BF8199BEA302',
					packageName:'com.qmx.qimengxing'
				}).then(res => {
					console.log(res)
					//vuex 存储user信息
					// this.$store.commit('updateUserInfo',res.data.data)
					// //router 跳转到main
					// this.$router.push('main')
				},error=>{
					console.log(error)
				}).catch(res=>{
					//登陆失败
					console.log(res)
					// this.$message(res.data.msg)
				})
			},
			checkAccount(){
				console.log(!!this.phone)
				console.log(!!this.pwd)
				return !!this.phone||!!this.pwd
			}
		},computed: {
			'sufixUser':function(){
				return '86-'+this.phone
			},
			'mdPwd':function(){
				return md5(this.pwd)
			},
		},
	}
</script>

<style>
	.el-input {
		margin-bottom: 0.5rem;
	}

	.el-button {
		width: 100%;
	}

	#containt {}

	.login {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 85%;
		height: 40%;
		-webkit-transform: translateX(-50%) translateY(-50%);
	}
</style>
