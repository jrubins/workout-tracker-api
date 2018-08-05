const mongoose = require('mongoose')

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

    const exerciseTypes = await ExerciseType.find({})
    info(`Processing ${exerciseTypes.length} exercises...`)
    for (let i = 0; i < exerciseTypes.length; i++) {
      const exerciseType = exerciseTypes[i]
      exerciseType.category = exerciseType.type
      await exerciseType.save()

      if (i % 10 === 0) {
        info(`Processed ${i} exercise types...`)
      }
    }
    info(`Done processing exercise types.`)
  },
  err => {
    error('Could not connect to DB', err)
  }
)
