const ExercisesRouter = require('./exercises')

/**
 * The different route handlers for the application.
 *
 * @param {Object} app
 */
module.exports = {
  routeHandlers: app => {
    app.use('/exercises', ExercisesRouter)
  },
}
