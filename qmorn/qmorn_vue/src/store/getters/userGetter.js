export const userInfo = {
    getUserInfo (state) {
        return state.userInfo
    },
	getUserDeviceList(state){
		return state.deviceList
	},
	getSelectDevice(state){
		return state.selectDevice
	},
	getUserBabyInfo(state){
		if(state.babyinfo.length==0){
			return [];
		}
		return state.babyinfo[0];
	}
}