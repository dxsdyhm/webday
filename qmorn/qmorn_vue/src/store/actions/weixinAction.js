import axios from 'axios'
import acount, {
	info
} from '../../weixin/config';
sha1 = require('js-sha1');

function signature(info){
	var str="jsapi_ticket="+info.jsapi_ticket+'&noncestr=Wm3WZYTPz0wzccnW'+info.noncestr+"&timestamp="+info.timestamp+"&url="+info.url;
	console.log(str)
	return sha1(str)
}


export const weixinAction = {
	//获取token
	async getAccessToken({
		commit,
		state
	}, param) {
		return new Promise((resolve, reject) => {
			axios.get(
					`/sns/oauth2/access_token?appid=${acount.appID}&secret=${acount.appsecret}&code=${param}&grant_type=authorization_code`
				)
				.then(function(response) {
					if (response.data.errcode === 0) {
						commit('setWeixinAccessToken', response.data)
						resolve(response)
					} else {
						reject(new Error('get accessToken error'));
					}
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//模拟接口获取页面配置信息
	getConfigInfo({
		commit,
		state
	}, param) {

	},
	//获取用户信息
	//获取失败后再检查token是否过期
	//如果过期，则刷新token,再次获取用户信息
	async getWeixinInfo({
		commit,
		state
	}, param) {
		let token = state.token.access_token;
		let openid = state.token.openid;
		return new Promise((resolve, reject) => {
			axios.get(
					`/sns/userinfo?access_token=${token}&openid=${openid}&lang=zh_CN`
				)
				.then(function(response) {
					if (response.data.errcode === 0) {
						commit('updateWeixinInfo', response.data)
						resolve(response)
					} else {
						reject(new Error('getWeixinInfo error'));
					}
				})
				.catch(function(error) {
					reject(error)
				});
		})
	},
	refrushToken({
		commit,
		state
	}, param) {
		let frushToken = state.token.refresh_token;
		console.log(frushToken)
		axios.get(
				`/sns/oauth2/refresh_token?appid=${acount.appID}&grant_type=refresh_token&refresh_token=${frushToken}`
			)
			.then(function(response) {
				console.log(response);
				commit('setWeixinAccessToken', response.data)
			})
			.catch(function(error) {
				console.log(error);
			});
	},
	getJsApiTiket(config) {
		let token = state.token.access_token;
		return 
		axios.get(`/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`)
			.then(function(response) {
				if (response.data.errcode === 0) {
					console.log("获取签名文件关键信息成功");
					commit('setWeixinAccessToken', response.data)
					let sigh={
						noncestr: config.noncestr,
						jsapi_ticket : response.data.ticket,
						timestamp : config.timestamp,
						url:config.url
					}
					var sigtu=signature(sigh)
					console.log(sigtu)
				} else {
					console.log(response)
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	},
	async weixinLogin(code) {
		//code 先取token
		await dispatch('getAccessToken', code)
		await dispatch('getWeixinInfo')
		return new Promise((resolve, reject) =>{
			resolve(1)
		})
	}
}
