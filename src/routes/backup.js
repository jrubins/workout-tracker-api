const express = require('express')

const Exercise = require('../models/exercise')
const User = require('../models/user')
const Weight = require('../models/weight')

const BackupRouter = express.Router()

/**
 * Returns a backup dump of the data.
 */
BackupRouter.get('/', async (req, res) => {
  try {
    const apiKey = req.get('X-API-KEY')
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(401).send({})
    }

    const exercisesPromise = Exercise.find({})
    const usersPromise = User.find({})
    const weightPromise = Weight.find({})

    const [exercises, users, weight] = await Promise.all([
      exercisesPromise,
      usersPromise,
      weightPromise,
    ])

    res.send({
      exercises,
      users: users.map(({ _id, email, firstName, lastName }) => ({
        email,
        firstName,
        id: _id,
        lastName,
      })),
      weight,
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = BackupRouter
