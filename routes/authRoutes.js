const passport = require('passport')
require('connect-flash')

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/z/dashboard',
      failureRedirect: '/',
      failureFlash: true
    })
  )
}
