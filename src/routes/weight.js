const express = require('express')

const Weight = require('../models/weight')

const WeightRouter = express.Router()

/**
 * Returns weights.
 */
WeightRouter.get('/', async (req, res) => {
  try {
    const exercises = await Weight.find({})

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
    const exercise = new Weight(req.body)

    await exercise.save()

    res.send(exercise)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = WeightRouter
