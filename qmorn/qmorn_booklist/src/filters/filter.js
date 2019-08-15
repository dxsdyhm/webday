/**
 * 性别转义
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

export default {
    ossurl,
}