import { fetchUserAction } from '../actions/userAction'
import { userInfo } from '../getters/userGetter'
import { fetchUserMutation } from '../mutations/userMutation.js'

//{"msg":"成功","code":"0","data":{"total":1,"deviceList":[{"id":10043,"name":"小精灵慧读机器人","pkey":"a1gsxwfY5uS","dname":"DQME10FFFIFIm7dCYrOidW2SZCeaZG","secret":"8Xqi4xUzDA1xtOWy6jRwxIGlmIRMYMlP","role":1,"perm":0,"remark":"小精灵"}]}}
//https://static.qmorn.com/help/app/?lan=%s&version=%s
export const activeUser = {
    state: {
		headers:{
			'Content-Type':'application/json; charset=UTF-8',
			apiV:'1',
			appV:'16777228',
			appID:'D2FCF180E43044859F3AD196F3E1F0EC',
			Lan:'zh',
			uid:'0',
			sid:'0'
		},
        userinfo: {},
		deviceList:[],
		lastUpdated:'',
		versionName:'v1.0.0.13',
		windSize:{x:0,y:0},
		selectDevice:null,
		babyinfo:[],
		booklist:[],
		active:1,
		selectDeviceOnline:{},
    },
    actions: fetchUserAction,
    getters: userInfo,
    mutations: fetchUserMutation,
}