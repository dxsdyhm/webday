<template>
	<v-layout column align-center justify-center fill-height class="gray--text empty" text-xs-center @click="toadd()">
		<v-avatar :size=240>
			<img src="../../assets/img/ic_device_add.png">
		</v-avatar>
		<div>还没有设备，点击添加吧~</div>
	</v-layout>
</template>
<script>
	import {
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {}
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
				this.$router.push({name:'netconfig',params:{type:0}})
			}
		}
	}
</script>

<style>
	
</style>
