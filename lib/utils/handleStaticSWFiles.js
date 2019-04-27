const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin')
const { resolve } = require('path')
const log = require('./logger')
const ENTRY_NAME = 'serviceworker'
/**
 * handleStaticSWFiles
 * @param {*} compiler
 * @param {*} compilation
 * @returns {Promise}
 */
function handleStaticSWFiles (compiler, compilation) {
  const childCompiler = compilation.createChildCompiler(ENTRY_NAME, {
    filename: this.options.filename
  })
  const swFilePath = resolve(__dirname, '../static/sw.js')
  const childEntryCompiler = new SingleEntryPlugin(compiler.context, swFilePath)
  childEntryCompiler.apply(childCompiler)

  return new Promise((resolve, reject) => {
    log.success('handle success !')
    childCompiler.runAsChild(err => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

module.exports = handleStaticSWFiles
