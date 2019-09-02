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
	},
	getSelectOnline (state){
		return state.selectDeviceOnline;
	},
	getAliyunState (state){
		return state.aliiotstate;
	},
	getDeviceSettings (state){
		return state.deviceSetting;
	},
	getDeviceOSInfo (state){
		return state.deviceOsInfo;
	},
	getTheme (state){
		return state.theme;
	},
	getGuestList (state){
		return state.guestList;
	},
	getGroupInfo (state){
		return state.groupinfo;
	},
	selectDeviceOnlineState (state){
		for (var i = 0; i < state.stateList.length; i++) {
			if(state.stateList[i].id===state.selectDevice.id){
				return (state.stateList[i].state&0x1)===1;
			}
		}
		return false;
	},
	getGroupMessage (state){
		return state.groupmessage;
	},
	getLoginState (state){
		return state.headers['sid']==='0'
	},
	showSpecial (state){
		//账号登陆默认返回true
		return state.logintype===0
	}
}