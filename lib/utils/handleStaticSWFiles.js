const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin')
// const MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin')
const { resolve } = require('path')
const log = require('./logger')
const ENTRY_NAME = 'serviceworker'
/**
 * handleStaticSWFiles
 * @param {*} compiler
 * @param {*} compilation
 * @returns {Promise}
 */
async function handleStaticSWFiles (compiler, compilation) {
  await handleDiffFile(compiler, compilation, this.options.sw.filename || 'sw.js')
  await handleDiffFile(compiler, compilation, this.options.register.filename || 'sw-register.js')
}

function handleDiffFile (compiler, compilation, filename) {
  const childCompiler = compilation.createChildCompiler(ENTRY_NAME, {
    filename: filename
  })
  const swFilePath = resolve(__dirname, `../static/${filename}`)
  // const childEntryCompiler = new MultiEntryPlugin(compiler.context, swFilePath)
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
