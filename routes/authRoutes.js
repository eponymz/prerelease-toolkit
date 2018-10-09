const passport = require('passport');
require('connect-flash');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/z/ops-utilities',
      failureRedirect: '/',
      failureFlash: true
    })
  );

  // app.get('/api/logout', (req, res) => {
  //   req.logout();
  //   res.redirect('/');
  //   console.log('Logged out successfully...');
  // });

  // app.get('/api/current_user', (req, res) => {
  //   // res.send(req.session);
  //   res.send(req.user);
  //   //res.status(200).JSON(req.user);
  // });

  // app.post('/z/no-auth', (req, res, next) => {
  //   res.sendStatus(401, 'You are not authorized to access this application.')
  //   console.log('Unauthorized attempt to login in by' + profile.emails)
  // })
};
