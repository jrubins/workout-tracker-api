const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const UsersRouter = express.Router()

/**
 * Logs a user in.
 */
UsersRouter.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(404).send()
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      return res.status(200).send({
        jwt: token,
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

      return res.status(201).send()
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = UsersRouter
