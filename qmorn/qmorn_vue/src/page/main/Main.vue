<template>
	<v-layout column fill-height justify-space-between>
		<keep-alive>
			<router-view class="content"></router-view>
		</keep-alive>
		<v-bottom-nav :active.sync="activeBtn" :value="showNav" absolute color="#fff">
			<router-link to="/main/voice" replace>
				<v-btn flat color="pink lighten-3">
					<span>音乐</span>
					<v-icon>library_music</v-icon>
				</v-btn>
			</router-link>
			<router-link to="/main/device" replace>
				<v-btn flat color="pink lighten-3">
					<span>设备</span>
					<v-icon>widgets</v-icon>
				</v-btn>
			</router-link>
			<router-link to="/main/userinfo" replace>
				<v-btn flat color="pink lighten-3">
					<span>我的</span>
					<v-icon>person</v-icon>
				</v-btn>
			</router-link>
		</v-bottom-nav>
	</v-layout>
</template>

<script>
	export default {
		data() {
			return {
				activeBtn: 1,
				showNav: true
			}
		},
		mounted: function() {
			this.activeBtn=this.$store.getters.getActive
		},
		watch:{
            activeBtn(newvalue,old){
				this.$store.commit('updateActive', newvalue)
			}
		},
		methods: {

		},
		// created() {
		// 	console.log("--------")
		// 	if(!this.$store.state.activeUser.aliiotstate){
		// 		iotinit();
		// 	}
		// },
	}
</script>

<style>
	.content {
		margin-bottom: 3.5rem;
	}
</style>
