const mongoose = require('mongoose')
const { Schema } = mongoose

const SetSchema = require('./nested/setSchema')

const exerciseSchema = new Schema(
  {
    date: Number,
    name: String,
    sets: [SetSchema],
    type: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise
