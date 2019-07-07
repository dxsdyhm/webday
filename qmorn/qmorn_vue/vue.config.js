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
				target: 'http://online-state.api1.q-links.net:10081',
				changeOrigin: true,
				secure: false,
				pathRewrite: {'^/online': ''}
			}
		},
		disableHostCheck: true,
	},
}
