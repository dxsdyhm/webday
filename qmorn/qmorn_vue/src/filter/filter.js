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
export default {
    sexfilter,
	fensfilter
}