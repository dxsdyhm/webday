export const weixinGetter = {
	getWeixinToken (state){
		return state.token;
	},
	getWeixinUserInfo (state){
		return state.weixininfo;
	},
	getJssToken (state){
		return state.tiketToken;
	}
}