/**
 * 性别转义
 * @param {*} value 
 */
const sexfilter = function(value) {
	let sex = ['女', '男']
	return value === 1 ? sex[0] : sex[1];
}
const fensfilter = function(value) {
	let fens = ['其他', '妈妈', '爸爸', '奶奶', '爷爷']
	if (value >= fens.length) {
		return fens[0]
	}
	return fens[value];
}
const batteryfilter = function(value) {
	let fens = ['#F44336', '#F9A825', '#4CAF50']
	if (value <= 40) {
		return fens[0]
	} else if (value <= 80) {
		return fens[1]
	}
	return fens[2]
}

const batteryiconfilter = function(value) {
	if (value == '-1') {
		return "battery_unknown"
	} else {
		return "battery_full"
	}
}
export default {
	sexfilter,
	fensfilter,
	batteryfilter,
	batteryiconfilter
}
