/**
 * 阿里云下载地址转换
 * @param {*} value 
 */
const ossurl=function(url){
    let index = url.indexOf("?")
    if (index != -1) {
    	let sig = url.slice(index)
    	let urlexp = decodeURIComponent(url.slice(0, index))
    	return `${urlexp}${sig}`
    }
    return url
}

/**
 * 购买链接转换
 * @param {Object} key 搜索关键词
 */
const buyurl=function(key){
	let url=encodeURI(key)
    return `http://search.dangdang.com/?key=${url}`
}

export default {
    ossurl,
	buyurl,
}