import axios from 'axios';
import acount,{info} from './config';

export function initweixin() {
	axios.get(`/cgi-bin/token?grant_type=client_credential&appid=${acount.appID}&secret=${acount.appsecret}`)
		.then(function(response) {
			console.log(response);
		})
		.catch(function(error) {
			console.log(error);
		});
}

export function getCode(){
	console.log(acount,info)
	return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${acount.appID}&redirect_uri=${info.redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
}
