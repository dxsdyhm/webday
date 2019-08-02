const path = require('path')
module.exports = {
	devServer: {
		proxy: {
			'/cgi-bin': {
				target: 'https://api.weixin.qq.com',
				changeOrigin: true,
				secure: false,
			},
			'/sns': {
				target: 'https://api.weixin.qq.com',
				changeOrigin: true,
				secure: false,
			},
			'/qmorn': {
				target: 'https://dev.oss.qmorn.com',
				changeOrigin: true,
				secure: false,
			},
			'/res': {
				target: 'https://api1.q-links.net:10081',
				changeOrigin: true,
				secure: false,
			}
		},
		disableHostCheck: true,
	},
	publicPath:'./',
}
