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
import qrcode from '../page/main/Qrcode.vue'

import about from '../page/action/About.vue'
import devicelist from '../page/action/DeviceList.vue'
import webview from '../page/action/WebView.vue'
import babyinfo from '../page/action/BabyInfo.vue'
import help from '../page/action/Help.vue'

import booklist from '../page/book/BookList.vue'
import booksearch from '../page/book/BookSearchResult.vue'
import userdetail from '../page/user/UserInfoDetail.vue'
import netconfig from '../page/main/NetConfig.vue'
import bookdetail from '../page/book/BookDetail.vue'

import regist from '../page/user/Regist.vue'
import findpwd from '../page/user/FindPwd.vue'

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
		name:'app',
		component: App,
	}, {
		path: '/user',
		name:'user',
		component: login,
		props: (route) => ({
			logintype: route.query.logintype
		})
	}, {
		path: '/main',
		component: main,
		name:'main',
		redirect: '/main/voice',
		children: [{
			path: '/main/voice',
			component: voice
		}, {
			path: '/main/device',
			name:'maindevice',
			component: device
		}, {
			path: '/main/userinfo',
			name:'mainuserinfo',
			component: userinfo
		}, {
			path: '/main/empty',
			name:'mainempty',
			component: empty
		}]
	},
	{
		path: '/about',
		name:'about',
		component: about
	},
	{
		path: '/devicelist',
		name:'devicelist',
		component: devicelist
	}, {
		path: '/webview',
		name:'webview',
		component: webview
	},
	{
		path: '/babyinfo',
		name:'babyinfo',
		component: babyinfo
	},
	{
		path: '/help',
		name:'help',
		component: help
	},
	{
		path: '/booklist',
		name:'booklist',
		component: booklist,
		meta: {
			keepAlive: true // 需要被缓存
		}
	},
	{
		path: '/userdetail',
		name:'userdetail',
		component: userdetail
	},
	{
		path: '/devicesetting',
		name:'devicesetting',
		component: devicesetting
	},
	{
		path: '/moniter',
		name:'moniter',
		component: moniter
	},
	{
		path: '/deviceosinfo',
		name:'deviceosinfo',
		component: osinfo
	},
	{
		path: '/light',
		name:'light',
		component: light
	},
	{
		path: '/membermanager',
		name:'membermanager',
		component: membermanager
	},
	{
		path: '/weixin',
		name:'weixin',
		component: weixin
	},
	{
		path: '/netconfig',
		name:'netconfig',
		component: netconfig
	},
	{
		path: '/booksearch',
		component: booksearch,
		name:'booksearch',
		props: (route) => ({
			keyword: route.query.keyword
		}),
		meta: {
			keepAlive: true // 需要被缓存
		}
	},
	{
		path: '/bookdetail',
		name: 'bookdetail',
		component: bookdetail,
	},
	{
		path: '/qrcode',
		name: 'qrcode',
		component: qrcode,
	},
	{
		path: '/regist',
		name: 'regist',
		component: regist,
	},
	{
		path: '/findpwd',
		name: 'findpwd',
		component: findpwd,
	}
]
export default s
