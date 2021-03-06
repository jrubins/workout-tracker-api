const mongoose = require('mongoose')
const { Schema } = mongoose

const SetSchema = require('./nested/setSchema')

const exerciseSchema = new Schema(
  {
    date: Number,
    exerciseType: {
      ref: 'ExerciseType',
      type: Schema.Types.ObjectId,
    },
    sets: [SetSchema],
    user: {
      ref: 'User',
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise
