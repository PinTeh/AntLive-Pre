module.exports = {
  publicPath: '',
  devServer: {
    host: 'localhost',
    port: 8088,
    proxy: {
      '/api': {
        target: 'http://localhost:8088',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
