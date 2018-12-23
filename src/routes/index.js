const AnalyzeRouter = require('./analyze')
const BackupRouter = require('./backup')
const ExercisesRouter = require('./exercises')
const ExerciseTypesRouter = require('./exerciseTypes')
const UsersRouter = require('./users')
const WeightRouter = require('./weight')

/**
 * The different route handlers for the application.
 *
 * @param {Object} app
 */
module.exports = {
  routeHandlers: app => {
    app.use('/analyze', AnalyzeRouter)
    app.use('/backups', BackupRouter)
    app.use('/exercises', ExercisesRouter)
    app.use('/exercise_types', ExerciseTypesRouter)
    app.use('/users', UsersRouter)
    app.use('/weight', WeightRouter)
  },
}
