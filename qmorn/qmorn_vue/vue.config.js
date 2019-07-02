const path = require('path')
module.exports = {
  devServer: {
    proxy: {
      '/app': {
        target: 'https://api1.q-links.net:10081',
        ws: true,
        changeOrigin: true
      }
    }
  }
}