const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const UsersRouter = express.Router()

/**
 * Returns a new JWT token for the provided user.
 *
 * @param {Object} user
 * @param {Number} user.id
 * @returns {String}
 */
function getNewJwtToken(user) {
  return jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
}

/**
 * Logs a user in.
 */
UsersRouter.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(404).send({
          message: 'Incorrect email or password.',
        })
      }

      return res.status(200).send({
        jwt: getNewJwtToken(user),
      })
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

/**
 * Signs up a new user.
 */
UsersRouter.post('/signup', (req, res) => {
  try {
    const { password, ...rest } = req.body
    bcrypt.hash(password, 12, async (err, hash) => {
      const user = new User({
        ...rest,
        password: hash,
      })

      await user.save()

      return res.status(201).send({
        jwt: getNewJwtToken(user),
      })
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = UsersRouter
