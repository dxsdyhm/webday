<template>
	<v-layout column>
		<qmorntoolbar :title='title'></qmorntoolbar>
		<v-layout column align-space-between class="ma-4">
			<v-flex xs12 sm6 md3>
				<v-text-field prepend-icon="wifi" label="wifi名称" type="text" v-model="s" clearable hint="设备不支持5G WiFi" :rules="[rules.required]"></v-text-field>
			</v-flex>
			<v-flex xs12 sm6 md3>
				<v-text-field prepend-icon="lock" label="wifi密码" v-model="p" type="text" :rules="[rules.min]" :disabled="checkbox"></v-text-field>
			</v-flex>
			<v-checkbox class="my-2" v-model="checkbox" label="wifi没有密码" height='10'></v-checkbox>
			<v-btn color="primary" @click="wifitoqr()">确定</v-btn>
		</v-layout>
	</v-layout>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'NetConfig',
		data() {
			return {
				s: '',
				p: '',
				checkbox:false,
				rules: {
					required:v=> this.requild() || '必填',
					min:v=> this.pwd()|| '最少8位',
				}
			}
		},
		watch:{
			checkbox(newvalue,oldvalue){
				if(newvalue){
					this.p="";
				}
			}
		},
		methods: {
			wifitoqr() {
				if(this.pwd()&&this.requild()){
					this.$router.push({
						name: 'qrcode',
						params: {
							qrcode: this.qrcode
						}
					})
				}else{
					this.$message({message:'请输入有效信息',type:'warning'})
				}
			},
			pwd(){
				return this.checkbox||this.p.length >= 8 ;
			},
			requild(){
				return this.s.length>0;
			}
		},
		mounted() {

		},
		computed: {
			...mapGetters({
				userinfo: 'getUserInfo',
			}),
			qrcode() {
				return JSON.stringify({
					s: this.s,
					p: this.p,
					u: this.userinfo.uid+''
				});
			},
			title(){
				return this.$route.params.type===0?"添加设备":"配置网络";
			}
		}
	}
</script>

<style>
</style>
