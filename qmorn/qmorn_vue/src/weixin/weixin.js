import acount, {
	info
} from './config';
function getCode() {
	return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${acount.appID}&redirect_uri=${info.redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
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
	getCode,
	isWeixin,
}
