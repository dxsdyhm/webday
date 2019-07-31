<template>
	<v-layout column>
		<qmorntoolbar :title="title"></qmorntoolbar>
		<v-list subheader>
			<v-subheader>
				<v-chip color="primary" text-color="white" small>
					<v-avatar>
						<v-icon>account_circle</v-icon>
					</v-avatar>
					管理员
				</v-chip>
			</v-subheader>
			<v-list-tile avatar>
				<v-list-tile-avatar>
					<img :src="user.image">
				</v-list-tile-avatar>

				<v-list-tile-content row>
					<v-list-tile-title v-html="user.nickName"></v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</v-list>

		<v-divider></v-divider>

		<v-list subheader>
			<v-subheader>
				<v-chip color="primary" text-color="white" small>
					<v-avatar>
						<v-icon>account_circle</v-icon>
					</v-avatar>
					成员
				</v-chip>
			</v-subheader>
			<v-list-tile v-for="item in members" :key="item.id" avatar>
				<v-list-tile-avatar>
					<img :src="item.image">
				</v-list-tile-avatar>
				<v-list-tile-content>
					<v-list-tile-title v-html="item.remarkName"></v-list-tile-title>
				</v-list-tile-content>
				<v-list-tile-action>
					<v-btn flat icon color="primary" @click="showDelete(item)">
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
								<v-text-field :prefix="phonepresufix" label="手机号" required v-model="newGeust.guestAccount"></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-text-field label="备注" required v-model="newGeust.guestRemark"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6>
								<v-radio-group v-model="newGeust.rsBaby" row>
									<v-radio color="primary" v-for="n in 5" :key="n" :label="(n-1) | fensfilter" :value="n-1"></v-radio>
								</v-radio-group>
							</v-flex>
						</v-layout>
					</v-container>
					<small class="tips">*添加后，成员将共享你的设备，可以使用设备的部分功能</small>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" flat @click="addShow = false">取消</v-btn>
					<v-btn color="primary" flat @click="addGuest()">确定</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="deleteShow">
			<v-card>
				<v-card-title class="headline">删除成员</v-card-title>
				<v-card-text>删除成员后，成员将不能在远程操作设备的功能</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green darken-1" flat @click="deleteShow = false">取消</v-btn>
					<v-btn color="green darken-1" flat @click="deleteGuest()">确定</v-btn>
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
				phonepresufix: '86-',
				newGeust: {
					deviceId: '',
					guestAccount: '',
					guestRemark: '',
					permission: 0,
					rsBaby: 1,
				},
				fab: '',
				deletid:0,
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
			showDelete(guesi) {
				this.deleteShow = true;
				this.deletid=guesi.id;
			},
			showAdd() {
				this.addShow = true;
			},
			deleteGuest() {
				this.deleteShow=false;
				this.$api.user.deleteDeviceMember({
					guestId: this.deletid,
					deviceId: this.selectdevice.id
				}).then(res => {
					this.$store.commit('deleteGuestList', this.deletid)
					this.deletid=0;
				}).catch(res => {
					this.$message(res.msg)
					this.deletid=0;
				})
			},
			addGuest() {
				this.addShow = false;
				this.newGeust.deviceId = this.selectdevice.id;
				let parems = Object.assign({}, this.newGeust);
				parems.guestAccount = this.phonepresufix + this.newGeust.guestAccount;
				this.$api.user.addDeviceMember(parems).then(res => {
					let data = res.data
					//判断id 提示未注册
					if (data.guestId === 0) {
						this.$message({
							message: "用户还没有注册",
							type: 'warning'
						});
					}
					this.$store.commit('addGuestList', data)
					//插入访客列表
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
	.tips {
		font-size: 0.5rem;
		color: #A1A1A0;
	}
</style>
