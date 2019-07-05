export const userInfo = {
    getUserInfo (state) {
        return state.userinfo
    },
	getUserDeviceList (state){
		return state.deviceList
	},
	getSelectDevice (state){
		return state.selectDevice
	},
	getUserBabyInfo (state){
		if(state.babyinfo.length==0){
			return [];
		}
		return state.babyinfo[0];
	},
	getBookLists (state){
		return state.booklist;
	},
	getActive (state) {
		return state.active;
	}
}