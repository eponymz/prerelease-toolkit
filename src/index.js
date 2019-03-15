const express = require('express')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const winlog = require('./utils/logger')
const bodyParser = require('body-parser')
const util = require('util')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
require('./models/user')
require('./services/passport')

mongoose
  .connect(
    keys.mongoURI,
    { useNewUrlParser: true, promiseLibrary: require('bluebird') }
  )
  .then(() => winlog.info({ message: 'DB connected successfully' }))
  .catch(err => winlog.error({ message: err }))

const app = express()

// Parsers
// app.use(bodyParser.json({
//   type: () => {
//     return true
//   }
// }))
app.use(bodyParser.urlencoded({ extended: true }))

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   )
//   res.header('Accept', 'application/json')
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
//   next()
// })

app.use(
  cookieSession({
    maxAge: 60 * 60 * 1000, // expires after 60 minutes
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)
require('./routes/apiRoutes')(app)
require('./routes/dictRoutes')(app)

if (process.env.NODE_ENV === 'production') {
  // Express will serve prod assets
  app.use(express.static('client/build'))

  // Express will serve up index.html if it doesnt recognize route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// // Custom error handler
// app.use((err, req, res, next) => {
//   if (err.name === 'SyntaxError') {
//     winlog.error(`${err.name} occurred trying to ${req.method} | '${util.format(req.url)}'`)
//     res
//       .status(400)
//       .send({
//         message: 'Bad Request!',
//         desc: err.message
//       })
//   } else if (err.name === 'TypeError') {
//     winlog.error(err)
//     return res
//       .status(500)
//       .send({
//         message: 'Server Error!',
//         desc: err.message
//       })
//   }
//   next()
// })

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  winlog.info({ message: `Server running on port: ${PORT}` })
})
