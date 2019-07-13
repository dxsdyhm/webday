export const weixinMutation = {
	setWeixinAccessToken (state,action){
		state.token=action;
	},
	updateWeixinInfo (state,action){
		state.weixininfo=action;
	},
	setJsTiket (state,action){
		state.jstiket=action
	}
}