const userController = require('../controllers/userController')

module.exports = app => {
  app.get('/api/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })
  app.get('/api/health', (req, res) => {
    res.json({ health: 'super good' })
  })
  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  })
  app.get('/z/utilities', (req, res) => {
    if (req.user) {
      req.user.role === 'admin' ? res.status(200) : res.status(401)
    } else {
      res.redirect('/')
    }
  })

  // user routes
  app.post('/api/create_user', userController.createUser)
  app.get('/api/search_user', userController.searchSingleUser)
  app.get('/api/search', userController.searchAll)
  app.put('/api/update_user', userController.updateUser)
  app.delete('/api/delete_user', userController.deleteUser)
}
