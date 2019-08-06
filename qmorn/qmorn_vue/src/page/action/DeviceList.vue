<template>
	<v-layout column="">
		<qmorntoolbar :title="title"></qmorntoolbar>
		<v-list v-if="devicelist&&devicelist.lenght>0">
			<v-list-tile v-for="item in devicelist" :key="item.id" avatar @click="selectdevice(item)">
				<v-list-tile-avatar>
					<v-avatar :size=36 tile>
						<img src="../../assets/img/ic_dev_elf.png" />
					</v-avatar>
				</v-list-tile-avatar>

				<v-list-tile-content>
					<v-list-tile-title>{{ item.remark }}</v-list-tile-title>
					<v-list-tile-sub-title>{{ item.name }}</v-list-tile-sub-title>
				</v-list-tile-content>

				<v-list-tile-action>
					<v-icon :v-show="isSelectDevice(item)" color='primary'>check_circle</v-icon>
				</v-list-tile-action>
			</v-list-tile>
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
