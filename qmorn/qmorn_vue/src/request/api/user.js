/**
  * article模块接口列表
  */

import base from './base'; // 导入接口域名列表
import instance from '../http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const user = {
    login (params) {
        return instance.post(`/app/user/login`, params);
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
	}
}

export default user;