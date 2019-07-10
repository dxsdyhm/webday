export const fetchUserMutation = {
    updateUserInfo (state, action) {
        state.userinfo = action
		state.headers.sid=state.userinfo.sid
		state.headers.uid=state.userinfo.uid
        state.lastUpdated = (new Date()).getTime()
    },
	updateUserDevcie (state, action){
		state.deviceList=action
		if(action.length>0&&state.selectDevice==null){
			state.selectDevice=action[0]
		}
		state.lastUpdated = (new Date()).getTime()
	},
	setWindowSize (state,action){
		state.windSize=action
	},
	setSelectDevice (state,action){
		state.selectDevice=action
	},
	updateBabyInfo (state,action){
		state.babyinfo=action
	},
	updateBookList (state,action){
		state.booklist=action
	},
	updateActive (state,action){
		state.active=action
	},
	updateSelectOnline (state,action){
		action.forEach(function(device){
			if(device.id==state.selectDevice.id){
				state.selectDeviceOnline=device
			}
		})
	},
	updataeAliyunState (state,action){
		state.aliiotstate=action
	},
	updateDeviceSetting (state,action){
		state.deviceSetting=action;
	},
	updateDeviceOsInfo (state,action){
		state.deviceOsInfo=action;
	},
	updateSettingsParems (state,action){
		Object.keys(action).forEach(function(key){
			state.deviceSetting[key]=action[key];
		});
	},
	updateGuestList (state,action){
		state.guestList=action;
	}
}