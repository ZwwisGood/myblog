const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,//关闭语法检查
  devServer: {
    host: 'localhost',
    open: true,
    //配置代理
    proxy: {
      '/api': {
        //服务器地址
        // target: 'http://120.24.182.3:3001',
        // target: 'http://127.0.0.1:3001',
        target: 'http://81.71.165.39:3001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
})
