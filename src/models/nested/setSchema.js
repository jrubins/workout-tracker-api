const { Schema } = require('mongoose')

const setSchema = new Schema({
  distance: Number,
  distanceUnit: String,
  reps: Number,
  time: Number,
  timeUnit: String,
  weight: Number,
  weightUnit: String,
})

module.exports = setSchema
