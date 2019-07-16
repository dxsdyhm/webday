/**
  * article模块接口列表
  */

import base from './base'; // 导入接口域名列表
import instance from '../http'; // 导入http中创建的axios实例
import store from '../../store/index';

const user = {
    login (params) {
        return instance.post('/app/user/login', params);
    },
    getdeviceinfo(params){
		return instance.post('/app/relation/device/list',params)
	},
	getUserBabyInfo(){
		return instance.post('/app/user/baby/list')
	},
	commitBabyInfo(params){
		return instance.post('/app/user/baby/addormodify',params)
	},
	getBookList(params){
		return instance.post('/app/device/bookself/list',params)
	},
	getdevicebatter(params){
		return instance.post('/app/device/stateinfo',params)
	},
	getAlionline(params){
		return instance.post('/app/device/onlinestate',params)
	},
	getMember(params){
		return instance.post('/app/relation/guest/list',params)
	},
	addDeviceMember(params){
		return instance.post('/app/relation/guest/add',params)
	},
	deleteDeviceMember(params){
		return instance.post('/app/relation/guest/delete',params)
	},
	unbindDevice(params){
		return instance.post('/app/relation/master/unbind',params)
	},
	getGroupList(params){
		return instance.post('/app/group/member/getbydeviceid',params)
	},
	searchBook(params){
		return instance.post('/app/res/book/search',params)
	},
	addbook(params){
		return instance.post('/app/device/bookself/add',params)
	},
	deletebook(params){
		return instance.post('/app/device/bookself/delete',params)
	},
	checknewdevice(){
		return instance.post('/app/relation/device/new')
	}
}

export default user;