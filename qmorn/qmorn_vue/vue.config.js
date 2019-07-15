const path = require('path')
module.exports = {
	devServer: {
		proxy: {
			'/app': {
				target: 'https://api1.q-links.net:10081',
				changeOrigin: true,
				secure: false,
			},
			'/online': {
				target: 'https://online-state.api1.q-links.net:10081',
				changeOrigin: true,
				secure: false,
				pathRewrite: {
					'^/online': ''
				}
			},
			'/cgi-bin': {
				target: 'https://api.weixin.qq.com',
				changeOrigin: true,
				secure: false,
			},
			'/sns': {
				target: 'https://api.weixin.qq.com',
				changeOrigin: true,
				secure: false,
			}
		},
		disableHostCheck: true,
	},
}
