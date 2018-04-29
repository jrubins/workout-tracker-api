const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
    password: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
