module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    port: 5110,
    proxy: {
      '/api': {
        target: 'http://49.234.113.197:5100/',
        changeOrigin: true,
        autoRewrite: true,
        cookieDomainRewrite: true,
        pathRewrite: {
          '^/api/': '/'
        }
      }
    }
  }
}