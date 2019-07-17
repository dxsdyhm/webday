import store from '../store/index';
import {
	CMD
} from './cmd.js';
const iot = require('alibabacloud-iot-device-sdk');
const SrvNotify = 'SrvNotifyMesgRecv';
const Forward = 'ForwardMesgRecv';
const Group = 'GroupMesgRecv';
// 订阅
// 接收服务器通知类消息
// /a1d3EgnxD1M/${deviceName}/user/SrvNotifyMesgRecv
// 发布
// 发送p2p转发消息
// /a1d3EgnxD1M/${deviceName}/user/ForwardMesgSend
// 订阅
// 接收p2p转发消息
// /a1d3EgnxD1M/${deviceName}/user/ForwardMesgRecv
// 订阅
// 群组消息接收
// /a1d3EgnxD1M/${deviceName}/user/GroupMesgRecv
// 发布
// 群组消息发送
// /a1d3EgnxD1M/${deviceName}/user/GroupMesgSend

//创建iot.device对象将会发起到阿里云IoT的连接
export function iotinit() {
	//本机设备信息
	let deviceinfo = store.getters.getUserInfo
	let device = iot.device({
		productKey: deviceinfo.productKey, //将<productKey>修改为实际产品的ProductKey
		deviceName: deviceinfo.deviceName, //将<deviceName>修改为实际设备的DeviceName
		deviceSecret: deviceinfo.deviceSecret, //将<deviceSecret>修改为实际设备的DeviceSecret
	});
	// store.commit('setAliIotDevice', device)
	//监听connect事件
	device.on('connect', () => {
		//连接后立马订阅相关topic
		store.commit('updataeAliyunState', true)
		console.log('connect successfully!');
		device.subscribe(`/${deviceinfo.productKey}/${deviceinfo.deviceName}/user/${SrvNotify}`);
		device.subscribe(`/${deviceinfo.productKey}/${deviceinfo.deviceName}/user/${Forward}`);
		device.subscribe(`/${deviceinfo.productKey}/${deviceinfo.deviceName}/user/${Group}`);
	});
	device.on('offline', () => {
		console.log('offline');
		store.commit('updataeAliyunState', false)
	});
	device.on('error', () => {
		console.log("error");
		store.commit('updataeAliyunState', false)
	});
	//监听message事件
	device.on('message', (topic, payload) => {
		const topicArray = topic.split('/')
		//非本设备的消息不予处理
		console.log(topic)
		if(topic.indexOf('/ext/error')==0){
			//发生错误
			return;
		}
		if (payload) {
			let remote = JSON.parse(payload.toString())
			console.log(remote)
			let msgBody = JSON.parse(remote.MesgBody)
			switch (remote.dwMesgType) {
				case 1:
					//设置类的消息
					console.log("--------------")
					switch (msgBody.cmd) {
						case CMD.OPTION_SET:
							store.commit('updateDeviceSetting', msgBody)
							break;
						case CMD.JSON_CODE_INFOOS:
							store.commit('updateDeviceOsInfo', msgBody)
							break
						default:
							break;
					}
					break;
				case 2:
					//呼叫消息
					break;
				case 800:
					//群组消息
					if(parseInt(remote.DstGrpId)===store.getters.getGroupInfo.id){
						store.commit('addGroupMessage', msgBody)
					}else{
						console.log("非本群消息 :" + remote)
					}
					break;
				default:
					console.log("not device msg :" + topic)
					break;
			}
		} else {
			console.log("payload is null:" + topic)
		}
	});
	return device;
}

export function sendSettingMesg(device, msg) {
	//目标设备信息
	let target = store.getters.getSelectDevice
	let deviceinfo = store.getters.getUserInfo
	let msgStr = JSON.stringify(msg)
	let msgParen = {
		"SrcProName": deviceinfo.productKey,
		"SrcDevName": deviceinfo.deviceName,
		"DstProName": target.pkey,
		"DstDevName": target.dname,
		"dwMesgType": 1,
		"dwMesgID": device.mqttClient.nextId,
		"tLocMesgTimeMs": new Date().getTime(),
		"dwMesgSize": msgStr.length,
		"BodyFmt": 1,
		"MesgBody": msgStr
	};
	console.log(msgStr)
	device.publish(`/${deviceinfo.productKey}/${deviceinfo.deviceName}/user/ForwardMesgSend`, JSON.stringify(msgParen));
}
export function sendGroupMesg(device, msg, role) {
	//目标设备信息
	let target = store.getters.getSelectDevice
	let deviceinfo = store.getters.getUserInfo
	let msgStr = JSON.stringify(msg)
	let msgParen = {
		"SrcRole": role,
		"SrcID": deviceinfo.uid,
		"SrcProName": deviceinfo.productKey,
		"SrcDevName": deviceinfo.deviceName,
		"DstGrpId": msg.groupid.toString(),
		"dwMesgType": 800,
		"dwMesgID": msg.msgid,
		"tLocMesgTimeMs": msg.time,
		"dwMesgSize":msgStr.length,
		"BodyFmt": 1,
		"MesgBody": msgStr,
	};
	device.publish(`/${deviceinfo.productKey}/${deviceinfo.deviceName}/user/GroupMesgSend`, JSON.stringify(msgParen));
}

export function disconnect(device) {
	//目标设备信息
	if (device) {
		device.end();
	}
}
export default iot
