module.exports = class ServiceWorkerPlugin {
  constructor (options) {
    this.options = Object.assign({
      publicPath: '',
      excludes: ['**/*'],
      entry: '',
      filename: 'sw.js'
    })
  }
  apply (compiler) {
    compiler.plugin('normal-module-factory', compilation => {
      compilation.plugin('after-resolve', (compilation, cb) => {
        console.log('after-resolve', compilation)
        cb()
      })
    })
    compiler.plugin('make', (compilation, cb) => {
      console.log('make', compilation)
      cb()
    })
    compiler.plugin('emit', (compilation, cb) => {
      console.log('emit', compilation)
      cb()
    })
  }
}
