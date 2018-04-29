const mongoose = require('mongoose')
const { Schema } = mongoose

const weightSchema = new Schema(
  {
    date: Number,
    user: {
      ref: 'User',
      type: Schema.Types.ObjectId,
    },
    weight: Number,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

const Weight = mongoose.model('Weight', weightSchema)

module.exports = Weight
