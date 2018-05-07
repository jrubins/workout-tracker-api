const BackupRouter = require('./backup')
const ExercisesRouter = require('./exercises')
const UsersRouter = require('./users')
const WeightRouter = require('./weight')

/**
 * The different route handlers for the application.
 *
 * @param {Object} app
 */
module.exports = {
  routeHandlers: app => {
    app.use('/backups', BackupRouter)
    app.use('/exercises', ExercisesRouter)
    app.use('/users', UsersRouter)
    app.use('/weight', WeightRouter)
  },
}
