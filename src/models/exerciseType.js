const mongoose = require('mongoose')
const { Schema } = mongoose

const exerciseTypeSchema = new Schema(
  {
    description: String,
    muscleGroups: [String],
    name: String,
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

const ExerciseType = mongoose.model('ExerciseType', exerciseTypeSchema)

module.exports = ExerciseType
