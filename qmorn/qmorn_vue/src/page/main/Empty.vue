<template>
	<v-layout column align-center justify-center fill-height class="gray--text empty" text-xs-center @click="toadd()">
		<v-avatar :size=240>
			<img src="../../assets/img/ic_device_add.png">
		</v-avatar>
		<div>还没有设备，点击添加吧~</div>
		<!-- 配网指引 -->
		<v-dialog v-model="netconfig">
			<v-card>
				<v-card-title class="headline">设备配网</v-card-title>
				<v-card-text>添加设备首先需要让设备连上网络，回到公众号，在底部菜单中选择“帮助”-->“设备联网”或者微信搜索“配网工具”小程序即可进入配网功能</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green darken-1" text @click="yes()">确定</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-layout>
</template>
<script>
	import {
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				netconfig:false,
			}
		},
		mounted() {
			//检查选中设备是否存在
			if (this.selectdevice != null) {
				this.$router.replace('/main/device')
			}
		},
		computed: {
			...mapGetters({
				selectdevice: 'getSelectDevice',
			}),
		},
		methods:{
			toadd(){
				//如果是微信环境，指引用户在公众号菜单或者小程序中配网
				if(this.$weixin.isWeixin()){
					this.netconfig=true;
				}else{
					this.$router.push({name:'netconfig',params:{type:0}})
				}
			},
			yes(){
				this.netconfig=false;
			}
		}
	}
</script>

<style>
	
</style>
