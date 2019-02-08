const User = require('../models/user')
const winLog = require('../logger')
const util = require('util')

module.exports.createUser = (req, res) => {
  const googleId = req.body.googleId
  const email = req.body.emailVal
  const userName = req.body.userName
  const role = req.body.role
  if (req.user) {
    const requestor = util.format('%s', req.user.userName)
    const reqRole = util.format('%s', req.user.role)

    var newUser = new User({
      googleId: googleId,
      email: email,
      userName: userName,
      role: role
    })
    if (reqRole === 'admin') {
      User.createUser(newUser, function (err) {
        if (err) throw err
        winLog.info({
          message: `User: ${userName} created by: ${requestor}`
        })
      })
      res.redirect('/z/crud')
    } else {
      res.send(401, {
        unauthorized:
          'You managed to defeat client-side vaildation but my server caught you. ;)'
      })
      winLog.error(`unauthorized attempt to create user by: ${requestor}`)
    }
  } else {
    res.redirect('/')
    winLog.warn('Invalid user session. Redirecting to login.')
  }
}
