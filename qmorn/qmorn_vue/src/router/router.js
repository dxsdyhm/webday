import App from '../App'

import login from '../page/user/Login.vue'
import main from '../page/main/Main.vue'
import voice from '../page/main/Voice.vue'
import device from '../page/main/Device.vue'
import userinfo from '../page/main/UserInfo.vue'

import about from '../page/action/About.vue'
import devicelist from '../page/action/DeviceList.vue'
import webview from '../page/action/WebView.vue'
import babyinfo from '../page/action/BabyInfo.vue'

export default [{
    path: '/',
    component: App,
    children: [{
        path: '',
        redirect: '/user'
    }, {
        path: '/user',
        component: login
    }, {
        path: '/main',
        component: main,
		redirect: '/main/device',
		children:[{
			path:'/main/voice',
			component:voice
		},{
			path:'/main/device',
			component:device
		},{
			path:'/main/userinfo',
			component:userinfo
		}]
    },
	{
		 path: '/about',
		component: about
	},
	{
		 path: '/devicelist',
		component: devicelist
	},{
		 path: '/webview',
		component: webview
	},
	{
		path:'/babyinfo',
		component:babyinfo
	}
	]
}]