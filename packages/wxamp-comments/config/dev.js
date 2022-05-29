module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {},
  mini: {},
  h5: {
    esnextModules: ['taro-ui'],
    devServer: {
      proxy: {
        '/v1': {
          target: 'http://127.0.0.1:8233',
          changeOrigin: true
        }
      }
    }
  }
}
