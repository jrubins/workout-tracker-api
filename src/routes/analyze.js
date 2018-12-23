const { Types } = require('mongoose')
const express = require('express')

const { daysBetween } = require('../utils/dates')
const { error } = require('../utils/logs')
const Exercise = require('../models/exercise')
const Weight = require('../models/weight')

const AnalyzeRouter = express.Router()

/**
 * Analyzes the attendance at the gym (e.g. days per week).
 */
AnalyzeRouter.get('/attendance', async (req, res) => {
  try {
    const queryOpts = {}
    if (req.user) {
      queryOpts.user = req.user.userId
    }

    const firstExercise = await Exercise.findOne().sort('createdAt')
    const elapsedDays = daysBetween(firstExercise.date * 1000, Date.now())
    const elapsedWeeks = elapsedDays / 7
    const exercisesByDay = await Exercise.aggregate([
      {
        $match: {
          user: Types.ObjectId(req.user.userId),
        },
      },
      {
        $group: {
          _id: { date: '$date' },
        },
      },
    ])
    const totalExerciseDays = exercisesByDay.length

    res.send({
      daysPerWeek: totalExerciseDays / elapsedWeeks,
      elapsedDays,
      elapsedWeeks,
      totalExerciseDays,
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

/**
 * Analyzes weight trends.
 */
AnalyzeRouter.get('/weight', async (req, res) => {
  try {
    const queryOpts = {}
    if (req.user) {
      queryOpts.user = req.user.userId
    }

    const last7Weights = await Weight.aggregate([
      {
        $match: {
          user: Types.ObjectId(req.user.userId),
        },
      },
      { $sort: { createdAt: -1 } },
      { $limit: 7 },
      { $group: { _id: '$user', average: { $avg: '$weight' } } },
    ])

    res.send({
      average: last7Weights[0].average,
    })
  } catch (err) {
    error(err)
    res.status(500).send(err)
  }
})

module.exports = AnalyzeRouter
