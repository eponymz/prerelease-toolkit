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

    let newUser = new User({
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

module.exports.searchSingleUser = (req, res) => {
  const userName = req.query.userName
  if (req.user) {
    const requestor = util.format('%s', req.user.userName)
    const reqRole = util.format('%s', req.user.role)

    if (reqRole === 'admin') {
      winLog.info(
        'DB query by userName for: ' +
        userName +
        ' initiated by: ' +
        requestor
      )

      const query = User.where({ userName: userName })
      query
        .findOne()
        .then(post => {
          if (!post) {
            return res
              .status(404)
              .send({ message: `User not found with userName: ${userName}` })
          }
          let output = [
            { siteId: post._id },
            { email: post.email },
            { googleId: post.googleId },
            { userName: post.userName },
            { role: post.role },
            { createdDt: post.createdAt },
            { updatedDt: post.updatedAt }
          ]

          res.send({
            singleUser: true,
            userData: output
          })
        })
        .catch(err => {
          winLog.error(err.stack)
          if (err.kind === 'ObjectId') {
            return res
              .status(404)
              .send({ message: `User not found with userName: ${userName}` })
          }
          return res.status(500).send({
            message: `Error retrieving user with userName: ${userName}`
          })
        })
    } else {
      res
        .send(
          'You managed to defeat client-side vaildation but my server caught you. ;)'
        )
        .status(401)
      winLog.error(`unauthorized attempt to search user by: ${requestor}`)
    }
  } else {
    res.redirect('/')
    winLog.warn('Invalid user session. Redirecting to login.')
  }
}

module.exports.searchAll = (req, res) => {
  let userName, role, email
  if (req.user) {
    const requestor = util.format('%s', req.user.userName)
    const reqRole = util.format('%s', req.user.role)

    if (reqRole === 'admin' || reqRole === 'engLead') {
      winLog.info(`DB query for all initiated by: ${requestor}`)
      User.find()
        .then(post => {
          if (!post) {
            return res.status(404).send({ message: 'Request not found' })
          }
          let output = []
          for (let i = 0; i < post.length; i++) {
            userName = post[i].userName
            role = post[i].role
            email = post[i].email
            output.push(
              { userName: userName, userRole: role, userEmail: email }
            )
          }
          res.send({
            allUsers: true,
            userList: output
          })
          winLog.info('query for all completed')
        })
        .catch(err => {
          if (err.kind === 'ObjectId') {
            return res.status(404).send({ message: 'Request not found' })
          }
          winLog.error(err.stack)
          return res.status(500).send({
            message: 'Error retrieving users'
          })
        })
    } else {
      res
        .send(
          'You managed to defeat client-side vaildation but my server caught you. ;)'
        )
        .status(401)
      winLog.error(`unauthorized attempt to search user by: ${requestor}`)
    }
  } else {
    res.redirect('/')
    winLog.warn('Invalid user session. Redirecting to login.')
  }
}

module.exports.updateUser = (req, res) => {
  let userName
  const whom = req.query.whom
  const opts = req.query.opts
  const updatedVal = req.query.updatedVal
  const Obj = {}
  Obj[opts] = updatedVal

  if (req.user) {
    const requestor = util.format('%s', req.user.userName)
    const reqRole = util.format('%s', req.user.role)

    if (reqRole === 'admin') {
      winLog.info(`DB update to: ${whom} initiated by: ${requestor}`)

      User.findOneAndUpdate({ userName: whom }, Obj, {
        returnOriginal: false
      })
        .then(post => {
          if (!post) {
            return res.status(404).send({
              message: `User not found with userName: ${userName}`
            })
          }
          res.send(post)
        })
        .catch(err => {
          if (err.kind === 'ObjectId') {
            return res.status(404).send({
              message: `User not found with userName: ${userName}`
            })
          }
          return res.status(500).send({
            message: `Error retrieving user with userName: ${userName}`
          })
        })
    } else {
      res
        .send(
          'You managed to defeat client-side vaildation but my server caught you. ;)'
        )
        .status(401)
      winLog.error(`unauthorized attempt to search user by: ${requestor}`)
    }
  } else {
    res.redirect('/')
    winLog.warn('Invalid user session. Redirecting to login.')
  }
}

module.exports.deleteUser = (req, res) => {
  const whom = req.query.whom
  let userName

  if (req.user) {
    const requestor = util.format('%s', req.user.userName)
    const reqRole = util.format('%s', req.user.role)

    if (reqRole === 'admin') {
      winLog.info(`${whom} deleted by: ${requestor}`)

      User.findOneAndDelete({ userName: whom }, { returnOriginal: false })
        .then(post => {
          if (!post) {
            return res.status(404).send({
              message: `User not found with userName: ${userName}`
            })
          }
          res.send(post)
        })
        .catch(err => {
          if (err.kind === 'ObjectId') {
            return res.status(404).send({
              message: `User not found with userName: ${userName}`
            })
          }
          return res.status(500).send({
            message: `Error retrieving user with userName: ${userName}`
          })
        })
    } else {
      res
        .send(
          'You managed to defeat client-side vaildation but my server caught you. ;)'
        )
        .status(401)
      winLog.error(`unauthorized attempt to search user by: ${requestor}`)
    }
  } else {
    res.redirect('/')
    winLog.warn('Invalid user session. Redirecting to login.')
  }
}
