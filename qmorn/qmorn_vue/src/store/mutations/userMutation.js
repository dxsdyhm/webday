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
	},
	addGuestList (state,action){
		//字段不同需要转换
		let temp={
			id:action.guestId,
			image:action.image,
			permission:action.permission,
			remarkName:action.remarkName,
			status:action.status,
			time:action.addTime,
			nickName:action.nickName
		}
		state.guestList.push(temp);
	},
	deleteGuestList (state,action){
		state.guestList.forEach((guest,index)=>{
			if(guest.id===action){
				state.guestList.splice(index,1)
			}
		})
	},
	deleteSelectDevice (state,action){
		state.selectDevice=null;
		state.deviceList.forEach((device,index)=>{
			if(guest.id===action){
				state.deviceList.splice(index,1)
			}
		})
		//如果还有设备，则挑选第一个作为选中设备
		if(state.deviceList.length>0){
			state.selectDevice=state.deviceList[0];
		}
	}
}