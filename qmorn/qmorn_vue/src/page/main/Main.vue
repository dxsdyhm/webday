<template>
	<div class="d-flex flex-column all">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<v-bottom-navigation v-model="activeBtn" :input-value="showNav" grow absolute color="primary" height="8vh">
			<v-btn v-for="item in bottonNav" :key="item.position" @click="selectNav(item)">
				<span>{{item.name}}</span>
				<v-icon>{{item.icon}}</v-icon>
			</v-btn>
		</v-bottom-navigation>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	export default {
		name: 'Main',
		data() {
			return {
				activeBtn: 0,
				showNav: true,
				bottonNav: [{
						position: 0,
						name: '点播',
						icon: 'library_music',
						path: '/main/voice'
					},
					{
						position: 1,
						name: '设备',
						icon: 'widgets',
						path: '/main/device'
					},
					{
						position: 2,
						name: '我的',
						icon: 'person',
						path: '/main/userinfo'
					}
				]
			}
		},
		mounted: function() {
			this.activeBtn = this.$store.getters.getActive
		},
		activated() {
			if (this.activeBtn === 1) {
				if (this.selectdevice === null || this.selectdevice === undefined) {
					this.$router.replace('/main/empty')
				}
			}
		},
		watch: {
			activeBtn(newvalue, old) {
				this.$store.commit('updateActive', newvalue)
			},
			'$store.getters.getSelectDevice': function(newdevice, olddevice) {
				if ((!!newdevice) && (!!newdevice.id)) {
					this.$router.replace('/main/device')
				} else {
					this.$router.replace('/main/empty')
				}
			}
		},
		methods: {
			selectNav(item){
				if(item.path===this.bottonNav[1].path){
					if(this.selectdevice === null || this.selectdevice === undefined){
						this.$router.replace('/main/empty')
					}else{
						this.$router.replace(item.path)
					}
				}else{
					this.$router.replace(item.path)
				}
			},
		},
		computed: {
			...mapGetters({
				selectdevice: 'getSelectDevice',
			}),
		}
	}
</script>

<style>
	.all{
		height: 100vh;
	}
	.cont{
		height: 92vh;
	}
	.boot{
		height: 8vh;
	}
</style>
