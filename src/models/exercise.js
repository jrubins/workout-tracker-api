const mongoose = require('mongoose')
const { Schema } = mongoose

const SetSchema = require('./nested/setSchema')

const exerciseSchema = new Schema(
  {
    date: Number,
    description: String,
    muscleGroups: [String],
    name: String,
    sets: [SetSchema],
    type: String,
    user: {
      ref: 'User',
      type: Schema.Types.ObjectId,
    },
    variation: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise
