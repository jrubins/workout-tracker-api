const winston = require('winston')

/**
 * The logging instance.
 *
 * @type {?Object}
 */
const logger = winston

logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  })
)

module.exports = {
  /**
   * Outputs an info message.
   *
   * @param {...String} rest
   */
  info: (...rest) => {
    logger.info(...rest)
  },

  /**
   * Outputs an error message.
   *
   * @param {...String} rest
   */
  error: (...rest) => {
    logger.error(...rest)
  },
}
