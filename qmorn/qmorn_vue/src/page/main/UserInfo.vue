<template>
	<div class="cont">
		<v-responsive :aspect-ratio="16/9" class="up primary">
			<v-layout align-center justify-center column fill-height @click="jumpTo('/userdetail')">
				<v-avatar :size=72>
					<img class="circlw" :src="userimg" />
				</v-avatar>
				<div class="user_phone">
					{{username}}
				</div>
			</v-layout>
		</v-responsive>
		<div class="dowm">
			<v-list avatar>
				<template v-for="(item,index) in items">
					<v-list-item class="list_action" :key="item.title" @click="jumpTo(item.path)">
						<v-icon class="action_icon " color="primary">{{item.icon}}</v-icon>
						<v-list-item-content>
							<v-list-item-title>{{item.title}}</v-list-item-title>
						</v-list-item-content>
						<v-icon class="chevron">chevron_right</v-icon>
					</v-list-item>
					<v-divider v-if="index + 1 < items.length && showDevider" :key="index" color="#fefefe"></v-divider>
				</template>
			</v-list>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	export default {
		name:'UserInfo',
		data() {
			return {
				showDevider:false,
				items: [{
						icon: 'account_circle',
						title: '宝宝信息',
						path: '/babyinfo'
					},
					{
						icon: 'widgets',
						title: '我的设备',
						path: '/devicelist'
					},
					// {
					// 	icon: 'feedback',
					// 	title: '问题反馈',
					// 	path: '/webview'
					// },
					// {
					// 	icon: 'help',
					// 	title: '使用帮助',
					// 	path: '/help'
					// },
					{
						icon: 'info',
						title: '关于',
						path: '/about'
					},
				]
			}
		},
		methods: {
			jumpTo(path) {
				this.$router.push(path)
			},
		},
		computed: {
			userimg(){
				return this.$store.getters.getUserInfo.image
			},
			username(){
				return this.$store.getters.getUserInfo.nickName
			},
			...mapGetters([
				'getWeixinUserInfo', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
			]),
		}
	}
</script>

<style>
	.up {
	}
	.dowm {
		margin-top: 0.5rem;
	}
	.user_phone {
		color: white;
		margin-top: 1rem;
	}
	.user {}
	.action_icon {
		margin-right: 1rem;
		margin-left: 0.5rem;
	}
	.chevron{
		margin-right: 0.5rem;
	}
	.circlw{
		border: 0.15rem solid white;
	}
</style>
