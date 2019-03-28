const { resolve } = require('path')
// const log = require('./utils/logger')
const handleStaticSWFiles = require('./utils/handleStaticSWFiles')
module.exports = class ServiceWorkerPlugin {
  constructor (options) {
    // initialize plugin default params
    console.log('compiler.options', options)
    this.options = Object.assign({
      publicPath: '',
      excludes: ['**/*'],
      entry: resolve(__dirname, '../static/sw-register.js'),
      filename: 'sw.js'
    })
  }
  apply (compiler) {
    compiler.plugin('make', (compilation, cb) => {
      // log.info('>| make')
      handleStaticSWFiles.call(this, compiler, compilation).then(_ => {
        cb()
      })
    })
    compiler.plugin('normal-module-factory', compilation => {
      compilation.plugin('after-resolve', (compilation, cb) => {
        // log.info('>| after-resolve')
        cb()
      })
    })
    compiler.plugin('emit', (compilation, cb) => {
      // log.info('>| emit')
      cb()
    })
  }
}
