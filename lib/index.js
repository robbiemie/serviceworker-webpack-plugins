/* eslint-disable */
const handleStaticSWFiles = require('./utils/handleStaticSWFiles')
const plugin = { name: 'ServiceWorkerPlugin' }
const log = require('./utils/logger') 
class ServiceWorkerPlugin {
  constructor (options) {
    console.log('options', options)
    this.options = {
      filename: options.filename,
      include: []
    }
  }
  apply (compiler) {
    if (compiler.hooks) {
      // webpack4.x API
      compiler.hooks.make.tapAsync(plugin, async (compilation, cb) => {
        await handleStaticSWFiles.call(this, compiler, compilation)
        log.success('make success')
        cb()
      })
    } else {
      throw new Error('service-worker-plugins requires webpack >=4.x. Please upgrade your webpack version.')
    }
  }
}

module.exports = ServiceWorkerPlugin
