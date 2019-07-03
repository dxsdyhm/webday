import { fetchUserAction } from '../actions/userAction'
import { userInfo } from '../getters/userGetter'
import { fetchUserMutation } from '../mutations/userMutation.js'

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
    },
    actions: fetchUserAction,
    getters: userInfo,
    mutations: fetchUserMutation,
}