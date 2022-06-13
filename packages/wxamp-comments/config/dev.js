const env = require('./env.development.json')

console.log(env)

module.exports = {
  env: {
    NODE_ENV: '"development"',
    ...env
  },
  defineConstants: {},
  mini: {},
  h5: {
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
