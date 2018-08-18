const getLocalIp = require('./config/getLocalIp');
const localIp = getLocalIp('以太网') || getLocalIp() || 'localhost';

module.exports = {
  lintOnSave: false,

  // 取消生产环境的 sourcemaps
  productionSourceMap: false,

  // 资源交互验证
  // integrity: true,

  baseUrl: '',

  outputDir: 'docs', // github 针对性设置

  assetsDir: 'static',

  devServer: {
    host: process.env.npm_config_host || (process.env.npm_config_lan ? localIp : 'localhost'),
    // 指定端口
    port: 7005,
    // 自动打开浏览器进行访问
    open: true,
    // 开发时进行本地代理
    proxy: {
      '/api': {
        target: 'http://192.168.11.12:3002', // 接口的域名
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/api': ''
        }
      },
      '/ap2': {
        target: 'http://118.76.40.250:9000', // 接口的域名
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/ap2': ''
        }
      },
      '/ap3': {
        target: 'http://192.168.11.118:9003', // 接口的域名
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/ap3': ''
        }
      },
      '/ap4': {
        target: 'http://118.76.40.250:9003', // 接口的域名
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/ap4': ''
        }
      },
    }
  }
}
