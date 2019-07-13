import axios from 'axios';
import acount, {
	info
} from './config';

function initweixin() {
	axios.get(`/cgi-bin/token?grant_type=client_credential&appid=${acount.appID}&secret=${acount.appsecret}`)
		.then(function(response) {
			console.log(response);
		})
		.catch(function(error) {
			console.log(error);
		});
}

function getCode() {
	console.log(acount, info)
	return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${acount.appID}&redirect_uri=${info.redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
}

function getAccessToken(newcode) {
	axios.get(
			`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${acount.appID}&secret=${acount.appsecret}&code=${newcode}&grant_type=authorization_code`
		)
		.then(function(response) {
			console.log(response);
		})
		.catch(function(error) {
			console.log(error);
		});
}

function refrushToken(){
	
}
/**
 * 本地计算签名
 */
function captureConfig(){
	
}

/**
 * 是否微信打开
 */
function isWeixin(){
	var ua = navigator.userAgent.toLowerCase();
　　var isWeixin = ua.indexOf('micromessenger') != -1;
　　if (isWeixin) {
   　　 return true;
　　}else{
   　　 return false;      
　　}
}

export default {
	initweixin,
	getCode,
	getAccessToken,
	captureConfig,
	isWeixin,
}
