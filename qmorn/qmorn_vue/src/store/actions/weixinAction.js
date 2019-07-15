import axios from 'axios'
import acount, {
	info
} from '../../weixin/config';
const sha1 = require('js-sha1');

function signature(info) {
	var str = "jsapi_ticket=" + info.jsapi_ticket + '&noncestr=' + info.noncestr + "&timestamp=" + info.timestamp +
		"&url=" + info.url;
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
					console.log(response)
					console.log(response.data.errcode)
					if (!!response.data.errcode) {
						reject(new Error('get accessToken error'));
					} else {
						commit('setWeixinAccessToken', response.data)
						resolve(response)
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
					console.log(response)
					if (!!response.data.errcode) {
						reject(new Error('getWeixinInfo error'));
					} else {
						commit('updateWeixinInfo', response.data)
						resolve(response)
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
	async getTiketAccToken({
		commit,
		state
	}, param) {
		return new Promise((resolve, reject) => {
			//https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx65f9f2332760c43d&secret=9bd1a29396531fb4b7ae4ede9ee6e0a6
			axios.get(
					`cgi-bin/token?grant_type=client_credential&appid=${acount.appID}&secret=${acount.appsecret}`
				)
				.then(function(response) {
					console.log(response)
					console.log(response.data.errcode)
					if (!!response.data.errcode) {
						reject(new Error('get tiket accessToken error'));
					} else {
						commit('setJsToken', response.data)
						resolve(response)
					}
				})
				.catch(function(error) {
					reject(error);
				});
		})
	},
	async getJsApiTiket({
		commit,
		state
	}, config) {
		let token = state.tiketToken.access_token;
		if (token === undefined) {
			console.log("[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]")
		}
		return new Promise((resolve, reject) => {
			let tiket = state.jstiket.ticket
			console.log(!!tiket)
			if (!!tiket) {
				let sigh = {
					noncestr: config.nonceStr,
					jsapi_ticket: tiket,
					timestamp: config.timestamp,
					url: location.href.split('#')[0]
				}
				var sigtu = signature(sigh)
				console.log(sigtu)
				resolve(sigtu)
			} else {
				axios.get(`/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`)
					.then(function(response) {
						if (!!response.data.errcode) {
							console.log(response);
							reject(new Error(response.data.errmsg))
						} else {
							console.log("获取签名文件关键信息成功");
							console.log(response.data);
							commit('setWeixinAccessToken', response.data)
							tiket = response.data.ticket
							let sigh = {
								noncestr: config.nonceStr,
								jsapi_ticket: tiket,
								timestamp: config.timestamp,
								url: location.href.split('#')[0]
							}
							var sigtu = signature(sigh)
							console.log(sigtu)
							resolve(sigtu)
						}
					})
					.catch(function(error) {
						reject(error);
					});
			}
		});
	},
	async weixinLogin({
		dispatch,
		commit
	}, code) {
		//code 先取token
		await dispatch('getAccessToken', code)
		await dispatch('getWeixinInfo')
		await dispatch('getTiketAccToken')
		return new Promise((resolve, reject) => {
			resolve(1)
		})
	}
}
