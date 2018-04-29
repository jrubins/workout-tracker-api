module.exports = {
  /**
   * Returns if we're currently in development.
   *
   * @returns {Boolean}
   */
  isDevelopment: () => process.env.NODE_ENV === 'development',

  /**
   * Returns if the app environment is development.
   *
   * @returns {Boolean}
   */
  isAppEnvDevelopment: () => process.env.APP_ENV === 'development',
}
