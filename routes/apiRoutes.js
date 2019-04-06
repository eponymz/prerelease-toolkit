const bodyParser = require('body-parser')
const winLog = require('../logger')
const userController = require('../controllers/userController')

module.exports = app => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  // random api based routes
  app.get('/api/logout', (req, res) => {
    req.logout()
    res.redirect('/')
    winLog.info('Logged out successfully...')
  })
  app.get('/api/health', (req, res) => {
    res.json({ health: 'super good' })
  })
  app.get('/api/current_user', (req, res) => {
    // res.send(req.session);
    res.send(req.user)
    // res.status(200).JSON(req.user);
  })
  app.get('/z/utilities', (req, res) => {
    if (req.user) {
      req.user.role === 'admin' ? res.status(200) : res.status(401)
    } else {
      res.redirect('/')
      winLog.warn('Invalid user session. Redirecting to login.')
    }
  })

  // user routes
  app.post('/api/create_user', userController.createUser)
  app.get('/api/search_user/:userName', userController.searchSingleUser)
  app.get('/api/search', userController.searchAll)
  app.put('/api/update_user/:userName', userController.updateUser)
  app.delete('/api/delete_user/:userName', userController.deleteUser)
}
