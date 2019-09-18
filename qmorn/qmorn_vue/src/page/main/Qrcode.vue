<template>
	<div class="column" column>
		<qmorntoolbar :title='title'></qmorntoolbar>
		<qriously :value="qrcode" :size="qrsize" />
		<div class="ma-4 text-center">请将二维码放置到设备正前方，如果设备不能识别，请在设备面前小幅度移动手机</div>
		<v-dialog v-model="newDevice">
			<v-card>
				<v-card-title class="headline">
					发现新设备
				</v-card-title>
				<v-layout align-center justify-center column>
					<v-avatar class="pa-2" :size=96>
						<img src="../../assets/img/ic_dev_elf.png" />
					</v-avatar>
					<v-card-text>设备名称:&nbsp;&nbsp;&nbsp;&nbsp;{{device.remark}}</v-card-text>
					<v-card-text>设备ID:&nbsp;&nbsp;&nbsp;&nbsp;{{device.id}}</v-card-text>
				</v-layout>
				<v-card-actions>
					<v-btn color="primary" block @click="back()">确定</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<!-- 搜索超时 -->
		<v-dialog v-model="timeout">
			<v-card>
				<v-card-title class="headline">
					超时
				</v-card-title>
				<v-card-text>配置超时,请确设备处于配网状态，并且输入的wifi与密码正确</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green darken-1" text @click="reset()">重试</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: '配置网络',
				newDevice: false,
				device: {},
				interval: '',
				maxtime:65,
				current:0,
				timeout:false,
			}
		},
		methods: {
			takeNewDevice() {
				this.current++;
				if(this.current>this.maxtime){
					this.timeout=true;
					this.stoploop();
					return;
				}
				this.$api.user.checknewdevice().then(res => {
					this.stoploop();
					//有新设备，弹窗
					this.device=res.data;
					this.newDevice=true;
					this.$store.commit('addUserDevice',this.device)
				}).catch(res => {
					console.log(res)
				})
			},
			back(){
				this.newDevice=false;
				//回到主页
				this.$router.replace('/main')
			},
			deviceloop(){
				clearInterval(this.interval)
				this.interval = setInterval(this.takeNewDevice, 1000);
			},
			test(){
				this.device={
					remark:'小精灵',
					id:100000
				};
				this.newDevice=true;
			},
			reset(){
				this.timeout=false;
				this.current=-1;
				this.$router.back()
			},
			stoploop(){
				clearInterval(this.interval)
			}
		},
		computed: {
			qrcode() {
				return this.$route.params.qrcode;
			},
			qrsize() {
				return (this.$store.state.activeUser.windSize.x - 10)
			},
			showname(){
				if(!!this.device.remark){
					return this.device.remark
				}else{
					return this.device.name
				}
			}
		},
		mounted() {
			this.deviceloop();
		},
		beforeDestroy: function() {
			this.stoploop();
		},
	}
</script>

<style>
</style>
