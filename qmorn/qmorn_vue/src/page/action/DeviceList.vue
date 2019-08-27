<template>
	<v-layout column>
		<qmorntoolbar :title="title"></qmorntoolbar>
		<v-list v-if="(!!devicelist)&&(devicelist.length>0)">
			<v-list-item v-for="item in devicelist" :key="item.id" @click="selectdevice(item)">
				<v-list-item-avatar>
					<v-avatar :size=36 tile>
						<img src="../../assets/img/ic_dev_elf.png" />
					</v-avatar>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title>{{ item.remark }}</v-list-item-title>
					<v-list-item-sub-title>{{ item.name }}</v-list-item-sub-title>
				</v-list-item-content>

				<v-list-item-action>
					<v-icon :v-show="isSelectDevice(item)" color='primary'>check_circle</v-icon>
				</v-list-item-action>
			</v-list-item>
		</v-list>
		<v-layout v-else align-center justify-center column fill-height class="mt-5">
			还没有设备
		</v-layout>
	</v-layout>
</template>

<script>
	export default {
		data() {
			return {
				title: '我的设备'
			}
		},
		methods: {
			selectdevice(device){
				this.$store.commit('setSelectDevice', device)
			},
			isSelectDevice(device){
				if(!!this.$store.state.selectDevice){
					return device.id===this$store.state.selectDevice.id;
				}
				return false;
			},
			postSelect(newid){
				this.$api.user.setselect({
					deviceId:newid
				}).then(res => {
					console.log(res);
				}).catch(res => {
					console.log(res)
				})
			}
		},
		computed:{
			devicelist:function(){
				return this.$store.getters.getUserDeviceList;
			}
		},
		watch:{
			'$store.getters.getSelectDevice':function(select){
				this.postSelect(select.id)
			}
		}
	}
</script>

<style>
</style>
