const express = require('express')

const { error } = require('../utils/logs')
const ExerciseType = require('../models/exerciseType')

const ExerciseTypesRouter = express.Router()

/**
 * Returns exercise types.
 */
ExerciseTypesRouter.get('/', async (req, res) => {
  try {
    const queryOpts = {}
    if (req.user) {
      queryOpts.user = req.user.userId
    }

    const exerciseTypes = await ExerciseType.find(queryOpts)

    res.send(exerciseTypes)
  } catch (err) {
    error('Error getting exercise types:', err)
    res.status(500).send(err)
  }
})

/**
 * Creates a new exercise type.
 */
ExerciseTypesRouter.post('/', async (req, res) => {
  try {
    const { name } = req.body
    const existingExerciseType = await ExerciseType.findOne({ name })
    if (existingExerciseType) {
      return res.status(409).send({
        message: `An exercise type with the name "${name}" already exists.`,
      })
    }

    const exerciseType = new ExerciseType({
      ...req.body,
      user: req.user.userId,
    })

    await exerciseType.save()

    res.status(201).send(exerciseType)
  } catch (err) {
    error('Error creating exercise type:', err)
    res.status(500).send(err)
  }
})

/**
 * Edits an exercise type.
 */
ExerciseTypesRouter.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const exerciseType = await ExerciseType.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    res.status(200).send(exerciseType)
  } catch (err) {
    error('Error updating exercise type:', err)
    res.status(500).send(err)
  }
})

module.exports = ExerciseTypesRouter
