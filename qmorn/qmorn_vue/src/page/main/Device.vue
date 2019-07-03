<template>
	<div>{{this.$store.state.activeUser.deviceList[0]}}</div>
</template>

<script>
	export default{
		data() {
			return {
				interval:''
			}
		},
		methods: {
			getUserDevices() {
				this.$api.user.getdeviceinfo({
					pageIndex:1,
					pageSize:100,
				}).then(res => {
					console.log(res)
				    this.$store.commit('updateUserDevcie', res.data.deviceList)
				}).catch(res => {
					//登陆失败
					this.$message(res.msg)
				})
			},
			getDeviceOnline(){
				console.log("执行一次")
			}
		},
		mounted:function(){
			//获取用户所有设备
			this.getUserDevices()
			clearInterval(this.interval)
			this.interval=setInterval(this.getDeviceOnline, 10000);
		},
		beforeDestroy:function(){
			clearInterval(this.interval)
		}
	}
</script>

<style>
</style>
