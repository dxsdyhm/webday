import App from '../App'

import login from '../page/user/Login.vue'
import weixin from '../page/user/WeiXin.vue'
import main from '../page/main/Main.vue'
import voice from '../page/main/Voice.vue'
import device from '../page/main/Device.vue'
import userinfo from '../page/main/UserInfo.vue'
import devicesetting from '../page/main/DeviceSetting.vue'
import moniter from '../page/main/Moniter.vue'
import osinfo from '../page/main/DeviceOsInfo.vue'
import light from '../page/main/Light.vue'
import membermanager from '../page/main/MemberManager.vue'
import empty from '../page/main/Empty.vue'

import about from '../page/action/About.vue'
import devicelist from '../page/action/DeviceList.vue'
import webview from '../page/action/WebView.vue'
import babyinfo from '../page/action/BabyInfo.vue'
import help from '../page/action/Help.vue'

import booklist from '../page/book/BookList.vue'
import userdetail from '../page/user/UserInfoDetail.vue'

function isWeixin() {
	var ua = navigator.userAgent.toLowerCase();
	var isWeixin = ua.indexOf('micromessenger') != -1;
	if (isWeixin) {
		return true;
	} else {
		return false;
	}
}

var s = [{
		path: '/',
		component: App,
		// redirect: '/user'
	}, {
		path: '/user',
		component: login,
		props: (route) => ({ logintype: route.query.logintype})
	}, {
		path: '/main',
		component: main,
		redirect: '/main/device',
		children: [{
			path: '/main/voice',
			component: voice
		}, {
			path: '/main/device',
			component: device
		}, {
			path: '/main/userinfo',
			component: userinfo
		}, {
			path: '/main/empty',
			component: empty
		}]
	},
	{
		path: '/about',
		component: about
	},
	{
		path: '/devicelist',
		component: devicelist
	}, {
		path: '/webview',
		component: webview
	},
	{
		path: '/babyinfo',
		component: babyinfo
	},
	{
		path: '/help',
		component: help
	},
	{
		path: '/booklist',
		component: booklist
	},
	{
		path: '/userdetail',
		component: userdetail
	},
	{
		path: '/devicesetting',
		component: devicesetting
	},
	{
		path: '/moniter',
		component: moniter
	},
	{
		path: '/deviceosinfo',
		component: osinfo
	},
	{
		path: '/light',
		component: light
	},
	{
		path: '/membermanager',
		component: membermanager
	},
	{
		path: '/weixin',
		component: weixin
	}
]
export default s
