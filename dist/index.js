
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./isolib.cjs.production.min.js')
} else {
  module.exports = require('./isolib.cjs.development.js')
}
