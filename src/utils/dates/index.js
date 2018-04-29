const moment = require('moment')

module.exports = {
  /**
   * Returns the number of seconds from the Epoch for the given date.
   *
   * @param {Date|String|Number} date
   * @returns {Number}
   */
  getTimestamp: date => moment(date).unix(),
}
