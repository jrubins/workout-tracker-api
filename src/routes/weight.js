const express = require('express')

const Weight = require('../models/weight')

const WeightRouter = express.Router()

/**
 * Returns weights.
 */
WeightRouter.get('/', async (req, res) => {
  try {
    const queryOpts = {}
    if (req.user) {
      queryOpts.user = req.user.userId
    }

    const exercises = await Weight.find(queryOpts)

    res.send(exercises)
  } catch (err) {
    res.status(500).send(err)
  }
})

/**
 * Creates a new weight.
 */
WeightRouter.post('/', async (req, res) => {
  try {
    const exercise = new Weight({
      ...req.body,
      user: req.user.userId,
    })

    await exercise.save()

    res.send(exercise)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = WeightRouter
