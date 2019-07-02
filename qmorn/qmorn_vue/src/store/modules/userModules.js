import { fetchUserAction } from '../actions/userAction'
import { userInfo } from '../getters/userGetter'
import { fetchUserMutation } from '../mutations/userMutation.js'

export const activeUser = {
    state: {
        userinfo: {},
		lastUpdated:'',
    },
    actions: fetchUserAction,
    getters: userInfo,
    mutations: fetchUserMutation,
}