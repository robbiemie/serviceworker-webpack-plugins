const MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin')
const { resolve } = require('path')
const log = require('./logger')
const ENTRY_NAME = 'serviceworker'
module.exports = function handleStaticSWFiles (compiler, compilation) {
  const childCompiler = compilation.createChildCompiler(ENTRY_NAME, {
    filename: this.options.filename
  })
  const serviceworkerLoader = resolve(__dirname, '../static/sw.js')
  childCompiler.context = compiler.context
  childCompiler.apply(new MultiEntryPlugin(
    compiler.context,
    [serviceworkerLoader, this.options.entry],
    ENTRY_NAME
  ))
  childCompiler.plugin('compilation', newCompilation => {
    log.info('|> newCompilation', newCompilation)
  })

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
