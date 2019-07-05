<template>
	<v-layout column fill-height>
		<qmorntoolbar :title='title'></qmorntoolbar>
		<v-list class="babyinfo">
			<v-list-tile v-for="(item,index) in babyTemp" :key="item.fun" avatar @click="changeBabyInfo(item.fun)">
				<v-list-tile-content>
					<v-list-tile-title v-text="item.fun"></v-list-tile-title>
				</v-list-tile-content>
				<v-list-tile-action-text v-if="item.fun == fun2">{{item.value | sexfilter}}</v-list-tile-action-text>
				<v-list-tile-action-text v-else-if="item.fun == fun4">{{item.value | fensfilter}}</v-list-tile-action-text>
				<v-list-tile-action-text v-else v-text="item.value"></v-list-tile-action-text>
				<v-icon>chevron_right</v-icon>
			</v-list-tile>
		</v-list>
		<v-btn class="exit" color="primary" @click="commoiBaby" :disabled="commitDisable">修改</v-btn>
		<!-- 昵称输入 -->
		<v-dialog v-model="nicknameShow">
			<v-card>
				<v-card-text>
					<v-text-field v-model="value1" :rules="nameRules" :counter="10" :label="fun1" required></v-text-field>
				</v-card-text>
			</v-card>
		</v-dialog>
		<!-- 生日选项 -->
		<v-dialog v-model="timeShow">
			<v-date-picker v-model="value3" :reactive="reactive" full-width></v-date-picker>
		</v-dialog>
		<!-- 身份选项 -->
		<v-bottom-sheet v-model="fen">
			<v-list>
				<v-subheader>{{fun4}}</v-subheader>
				<v-list-tile v-for="x in 5" :key="x" @click="changeFen(x)">
					<v-list-tile-avatar :ripple="{ class: 'primary--text' }">
						<v-icon v-if="value4==x" color="primary">radio_button_checked</v-icon>
						<v-icon v-else color="gray">radio_button_unchecked</v-icon>
					</v-list-tile-avatar>
					<v-list-tile-title>{{ x | fensfilter}}</v-list-tile-title>
				</v-list-tile>
			</v-list>
		</v-bottom-sheet>
		<!-- 性别选项 -->
		<v-dialog v-model="sexShow">
			<v-card class="qmorn_card">
				<v-layout align-left justify-center fill-height row>
					<v-radio-group v-model="value2" @click="sexShow = false">
						<v-radio v-for="n in 2" :key="n" :label="n | sexfilter" :value="n"></v-radio>
					</v-radio-group>
				</v-layout>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
	export default {
		data() {
			return {
				nicknameShow: false,
				timeShow: false,
				sexShow: false,
				fen: false,

				babyid: 1,
				fun1: '昵称',
				value1: '宝宝',
				fun2: '性别',
				value2: 1,
				fun3: '生日',
				value3: new Date().toISOString().substr(0, 10),
				fun4: '我是宝宝的',
				value4: 1,

				landscape: false,
				reactive: true,

				title: '宝宝信息',
				nameRules: [
					v => !!v || 'Name is required',
					v => v.length <= 10 || 'Name must be less than 10 characters'
				],
				sheet: false,
				paremskey: ['babyId', 'nickName', 'sex', 'birthday', 'relation'],
			}
		},
		methods: {
			getBabyInfo() {
				this.$api.user.getUserBabyInfo().then(res => {
					//vuex 存储user信息
					this.$store.commit('updateBabyInfo', res.data.babyList)
					this.updateBaby();
				}).catch(res => {
					//登陆失败
					this.$message(res.msg)
				})
			},
			changeBabyInfo(key) {
				if (key == this.fun1) {
					this.nicknameShow = true
				} else if (key == this.fun2) {
					this.sexShow = true
				} else if (key == this.fun3) {
					this.timeShow = true
				} else if (key == this.fun4) {
					this.fen = true
				} else {
					console.log(key)
				}
			},
			updateBaby() {
				let temp = this.$store.getters.getUserBabyInfo;
				if (temp == undefined) {
					return
				}
				this.babyid=temp[this.paremskey[0]];
				this.value1 = temp[this.paremskey[1]];
				this.value2 = temp[this.paremskey[2]];
				this.value3 = temp[this.paremskey[3]];
				this.value4 = temp[this.paremskey[4]];
			},
			changeFen(x) {
				this.value4 = x;
				this.fen = false;
			},
			commoiBaby() {
				let parems = {}
				parems[this.paremskey[0]]=this.babyid;
				parems[this.paremskey[1]]=this.value1;
				parems[this.paremskey[2]]=this.value2;
				parems[this.paremskey[3]]=this.value3;
				parems[this.paremskey[4]]=this.value4;
				this.$api.user.commitBabyInfo(parems).then(res => {
					//vuex 存储user信息
					this.$store.commit('updateBabyInfo', [parems])
					this.updateBaby();
					Message({
						message: "修改成功",
						type: 'success'
					});
				}).catch(res => {
					//登陆失败
					this.$message(res.msg)
				})
			}
		},
		computed: {
			babyTemp() {
				return [{
						fun: this.fun1,
						value: this.value1
					},
					{
						fun: this.fun2,
						value: this.value2
					},
					{
						fun: this.fun3,
						value: this.value3
					},
					{
						fun: this.fun4,
						value: this.value4
					},
				]
			},
			commitDisable() {
				// 判断四个值是否与本地相同
				let temp = this.$store.getters.getUserBabyInfo;
				if (temp == undefined) {
					return false;
				}
				let needChange = temp.nickName != this.value1 || temp.sex != this.value2 || temp.birthday != this.value3 || temp.relation !=
					this.value4
				return !needChange;
			}
		},
		mounted: function() {
			this.getBabyInfo();
		}
	}
</script>

<style>
	.babyinfo {
		margin-bottom: 4rem;
	}

	.qmorn_card {
		padding: 1rem;
	}
</style>
