/**
 * 性别转义
 * @param {*} value 
 */
const sexfilter=function(value){
    let sex=['女','男']
	return value===1?sex[0]:sex[1];
}
const fensfilter=function(value){
    let fens=['妈妈','爸爸','奶奶','爷爷','其他']
	if(value>=fens.length){
		return fens[fens.length-1]
	}
	return fens[value-1];
}
const batteryfilter=function(value){
    let fens=['#F44336','#F9A825','#4CAF50']
	if(value<=40){
		return fens[0]
	}else if(value<=80){
		return fens[1]
	}
	return fens[2]
}
export default {
    sexfilter,
	fensfilter,
	batteryfilter
}