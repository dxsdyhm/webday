<template>
	<v-layout pa-2 column fill-height class="white--text pink lighten-3" text-xs-center>
		<!-- <div>{{this.$store.state.activeUser.deviceList[0]}}</div> -->
		<v-flex xs12>

		</v-flex>
		<v-flex xs12>
			<v-avatar :size=144 tile>
				<img src="../../assets/img/ic_dev_elf.png" />
			</v-avatar>
		</v-flex>
		<v-layout row wrap class="fun">
			<v-flex xs4 class="item" v-for="item in fundata" :key="item.funid" @click="toFunction(item.path)">
				<v-icon class="circle">{{item.icon}}</v-icon>
				<div> {{item.funname}} </div>
			</v-flex>
		</v-layout>
	</v-layout>
</template>
<script>
	export default {
		data() {
			return {
				interval: '',
				note: {
					backgroundImage: "url(" + require("../../assets/img/bg_elfdevice.webp") + ")",
					backgroundRepeat: "no-repeat",
					backgroundPosition: 'center',
				},
				fundata:[
					{
						funid:1,
						icon:'settings',
						funname:'设备设置',
						path:'/devicesetting'
					},
					{
						funid:2,
						icon:'videocam',
						funname:'远程陪护',
						path:'/moniter'
					},
					{
						funid:3,
						icon:'local_library',
						funname:'绘本书架',
						path:'/booklist'
					}
				]
			}
		},
		methods: {
			getUserDevices() {
				this.$api.user.getdeviceinfo({
					pageIndex: 1,
					pageSize: 100,
				}).then(res => {
					console.log(res)
					this.$store.commit('updateUserDevcie', res.data.deviceList)
				}).catch(res => {
					//登陆失败
					this.$message(res.msg)
				})
			},
			getDeviceOnline() {
				console.log("请求在线状态")
			},
			toFunction(path){
				this.$router.push(path)
			}
		},
		mounted: function() {
			//获取用户所有设备
			this.getUserDevices()
			clearInterval(this.interval)
			this.interval = setInterval(this.getDeviceOnline, 10000);
		},
		beforeDestroy: function() {
			clearInterval(this.interval)
		}
	}
</script>

<style>
	.fun {
		margin-bottom: 4rem;
	}
	.item {}

	.circle {
		width: 3rem;
		height: 3rem;
		margin-bottom: 0.5rem;
		background-color: white;
		border-radius: 1.5rem;
		align-items: center;
	}
</style>
