const _ = require('lodash')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const jwt = require('express-jwt')
const mongoose = require('mongoose')

const { error, info } = require('./utils/logs')
const { routeHandlers } = require('./routes')

const app = express()

// Express third-party middleware.
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_BASE_URL,
  })
)
app.use(helmet())
app.use(bodyParser.json())
app.use(
  jwt({
    secret: process.env.JWT_SECRET,
  }).unless(req => {
    const apiKey = req.get('X-API-KEY')
    const hasValidApiKey = apiKey && apiKey === process.env.API_KEY

    return (
      _.includes(['/users/login', '/users/signup'], req.path) || hasValidApiKey
    )
  })
)

// Set up our routes.
routeHandlers(app)

mongoose.connect(process.env.MONGODB_URI).then(
  () => {
    info('Successfully connected to MongoDB:', process.env.MONGODB_URI)

    app.listen(process.env.PORT, err => {
      if (err) {
        error(`Error starting Express server: ${err}`)

        return
      }

      info(`Server listening on port ${process.env.PORT}...`)
    })
  },
  err => {
    error('Could not connect to DB', err)
  }
)
