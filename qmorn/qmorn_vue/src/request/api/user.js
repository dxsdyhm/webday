/**
  * article模块接口列表
  */

import base from './base'; // 导入接口域名列表
import instance from '../http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const user = {
    login (params) {
        return instance.post(`/app/user/login`, params);
    }
    // 其他接口…………
}

export default user;