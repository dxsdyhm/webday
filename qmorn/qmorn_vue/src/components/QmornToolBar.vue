<template>
	<v-toolbar dark color="primary" scroll-off-screen scroll-target="#scrolling-techniques">
		<v-btn icon @click="goBack">
			<v-icon>arrow_back</v-icon>
		</v-btn>
		<v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
		<v-spacer></v-spacer>
	</v-toolbar>
</template>

<script>
	export default{
		methods: {
			goBack() {
				this.$router.go(-1)
			}
		},
		props: {
			title: {
				type: String,
				default: '启萌星'
			},
		},
	}
</script>
<style>
</style>
