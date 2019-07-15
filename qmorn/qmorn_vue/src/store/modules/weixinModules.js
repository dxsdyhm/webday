import { weixinAction } from '../actions/weixinAction'
import { weixinGetter } from '../getters/weixinGetter'
import { weixinMutation } from '../mutations/weixinMutations.js'

export const weixinState = {
    state: {
		token:{},
		weixininfo:{},
		tiketToken:{},
		jstiket:{},
    },
    actions: weixinAction,
    getters: weixinGetter,
    mutations: weixinMutation,
}