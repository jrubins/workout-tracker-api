const mongoose = require('mongoose')

const Exercise = require('../models/exercise')
const ExerciseType = require('../models/exerciseType')
const { error, info } = require('../utils/logs')
const { isDevelopment } = require('../utils/environment')

if (isDevelopment()) {
  // Read in our environment variables.
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI).then(
  async () => {
    info('Successfully connected to MongoDB:', process.env.MONGODB_URI)

    const exercises = await Exercise.find({})
    info(`Processing ${exercises.length} exercises...`)
    for (let i = 0; i < exercises.length; i++) {
      const exercise = exercises[i]
      if (!exercise.exerciseType) {
        let exerciseType = await ExerciseType.findOne({
          name: exercise.name,
          user: exercise.user,
        })

        if (!exerciseType) {
          exerciseType = ExerciseType({
            name: exercise.name,
            user: exercise.user,
            type: exercise.type,
          })
          await exerciseType.save()
        }

        exercise.exerciseType = exerciseType
        await exercise.save()
      }

      if (i % 10 === 0) {
        info(`Processed ${i} exercises...`)
      }
    }
    info(`Done processing exercises.`)
  },
  err => {
    error('Could not connect to DB', err)
  }
)
