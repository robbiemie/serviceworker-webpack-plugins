const chalk = require('chalk')
const log = console.log
const logger = {}

logger.success = msg => {
  log(chalk.green(msg))
}
logger.error = msg => {
  log(chalk.red(msg))
}
logger.warning = msg => {
  log(chalk.yellow(msg))
}
logger.info = msg => {
  log(chalk.blue(msg))
}

module.exports = logger
