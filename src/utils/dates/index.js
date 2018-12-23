const moment = require('moment')

module.exports = {
  /**
   * Returns the number of days between the second date and the first date.
   *
   * @param {Date|Number|String|Moment} date1
   * @param {Date|Number|String|Moment} date2
   * @returns {Number}
   */
  daysBetween: (date1, date2) => {
    const firstDate = moment(date1)
    const secondDate = moment(date2)

    return secondDate.diff(firstDate, 'days')
  },

  /**
   * Returns the number of seconds from the Epoch for the given date.
   *
   * @param {Date|String|Number} date
   * @returns {Number}
   */
  getTimestamp: date => moment(date).unix(),
}
