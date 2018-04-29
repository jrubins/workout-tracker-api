const ExercisesRouter = require('./exercises')
const WeightRouter = require('./weight')

/**
 * The different route handlers for the application.
 *
 * @param {Object} app
 */
module.exports = {
  routeHandlers: app => {
    app.use('/exercises', ExercisesRouter)
    app.use('/weight', WeightRouter)
  },
}
