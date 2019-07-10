<template>
	<v-layout column>
		<qmorntoolbar :title="title"></qmorntoolbar>
		<v-list subheader>
			<v-subheader>管理员</v-subheader>
			<v-list-tile avatar>
				<v-list-tile-avatar>
					<img :src="user.image">
				</v-list-tile-avatar>

				<v-list-tile-content column>
					<v-list-tile-title v-html="user.nickName"></v-list-tile-title>
					<v-chip color="primary" text-color="white" small>
						<v-avatar>
							<v-icon>account_circle</v-icon>
						</v-avatar>
						管理员
					</v-chip>
				</v-list-tile-content>
			</v-list-tile>
		</v-list>

		<v-divider></v-divider>

		<v-list subheader>
			<v-subheader>成员</v-subheader>
			<v-list-tile v-for="item in members" :key="item.id" avatar>
				<v-list-tile-avatar>
					<img :src="item.image">
				</v-list-tile-avatar>
				<v-list-tile-content>
					<v-list-tile-title v-html="item.remarkName"></v-list-tile-title>
				</v-list-tile-content>
				<v-list-tile-action>
					<v-btn flat icon color="primary" @click="deleteGuest(item)">
						<v-icon color="primary">clear</v-icon>
					</v-btn>
				</v-list-tile-action>
			</v-list-tile>
		</v-list>
		<v-btn v-model="fab" color="primary" dark fab fixed bottom right @click="showAdd()">
			<v-icon dark>add</v-icon>
		</v-btn>
		<!-- 添加成员 -->
		<v-dialog v-model="addShow" value="addShow" max-width="600px" lazy>
			<v-card>
				<v-card-title>
					<span class="headline">添加成员</span>
				</v-card-title>
				<v-card-text>
					<v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12>
								<v-text-field prefix="86-" label="手机号" required v-model="newGeust.guestAccount"></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-text-field label="备注" required v-model="newGeust.guestRemark"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6>
								<v-radio-group v-model="newGeust.rsBaby" row>
									<v-radio color="primary" v-for="n in 5" :key="n" :label="n | fensfilter" :value="n"></v-radio>
								</v-radio-group>
							</v-flex>
						</v-layout>
					</v-container>
					<small class="tips">*添加后，成员将共享你的设备，可以使用设备的部分功能</small>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" flat @click="dialog = false">取消</v-btn>
					<v-btn color="primary" flat @click="dialog = false">确定</v-btn>
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
				title: '成员管理',
				deleteShow: false,
				addShow: false,
				fun4: '我是宝宝的',
				newGeust:{
					deviceId:'',
					guestAccount:'',
					guestRemark:'',
					permission:0,
					rsBaby:1,
				}
			}
		},
		methods: {
			getMembers() {
				this.$api.user.getMember({
					pageIndex: 0,
					pageSize: 200,
					deviceId: this.selectdevice.id
				}).then(res => {
					this.$store.commit('updateGuestList', res.data.guestList)
				}).catch(res => {
					//登陆失败
					this.$message(res.msg)
				})
			},
			showDelete() {
				this.deleteShow = true;
			},
			showAdd() {
				this.addShow = true;
			},
			deleteGuest(guest) {

			},
			addGuest() {
				this.newGeust.deviceId=selectdevice.id;
				this.$api.user.addDeviceMember(this.newGeust).then(res => {
					//判断id 提示未注册
					//插入访客列表
					//消失
				}).catch(res => {
					//登陆失败
					this.$message(res.msg)
				})
			}
		},
		computed: {
			...mapGetters({
				selectdevice: 'getSelectDevice',
				user: 'getUserInfo',
				members: 'getGuestList'
			}),
		},
		mounted() {
			this.getMembers()
		}
	}
</script>

<style>
	.tips{
		font-size: 0.5rem;
		color: #A1A1A0;
	}
</style>
