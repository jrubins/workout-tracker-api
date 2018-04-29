const { isDevelopment } = require('../src/utils/environment')

if (isDevelopment()) {
  // Read in our environment variables.
  require('dotenv').config()
}

// Start our server.
require('../src')
