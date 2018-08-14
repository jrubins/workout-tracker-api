const { Types } = require('mongoose')
const _ = require('lodash')
const express = require('express')

const Exercise = require('../models/exercise')

const ExercisesRouter = express.Router()

/**
 * Returns exercises.
 */
ExercisesRouter.get('/', async (req, res) => {
  try {
    const queryOpts = {}
    if (req.user) {
      queryOpts.user = req.user.userId
    }

    const exercises = await Exercise.find(queryOpts).populate('exerciseType')

    res.send(exercises)
  } catch (err) {
    res.status(500).send(err)
  }
})

/**
 * Creates a new exercise.
 */
ExercisesRouter.post('/', async (req, res) => {
  try {
    const { exerciseType } = req.body
    if (!exerciseType) {
      return res.status(422).send({
        message: 'An exercise type is required.',
      })
    }

    const exercise = new Exercise({
      ...req.body,
      user: req.user.userId,
    })

    await exercise.save()
    await exercise.populate('exerciseType').execPopulate()

    res.status(201).send(exercise)
  } catch (err) {
    res.status(500).send(err)
  }
})

/**
 * Adds a set to an exercise.
 */
ExercisesRouter.post('/:id/sets', async (req, res) => {
  try {
    const { id } = req.params

    const exercise = await Exercise.findById(id)

    exercise.sets.push(req.body)

    await exercise.save()
    await exercise.populate('exerciseType').execPopulate()

    res.status(201).send(exercise)
  } catch (err) {
    res.status(500).send(err)
  }
})

/**
 * Edits a set for an exercise.
 */
ExercisesRouter.patch('/:id/sets/:setId', async (req, res) => {
  try {
    const { id, setId } = req.params

    const exercise = await Exercise.findById(id)
    const set = _.find(exercise.sets, { _id: Types.ObjectId(setId) })
    _.merge(set, req.body)

    await exercise.save()
    await exercise.populate('exerciseType').execPopulate()

    res.send(exercise)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = ExercisesRouter
