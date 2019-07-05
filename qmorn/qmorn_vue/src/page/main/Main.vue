<template>
	<v-layout column fill-height justify-space-between>
		<router-view class="content"></router-view>
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
		methods: {

		},

	}
</script>

<style>
	.content {
		margin-bottom: 3.5rem;
	}
</style>
