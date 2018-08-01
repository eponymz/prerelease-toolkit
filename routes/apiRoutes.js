module.exports = app => {
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
    console.log('Logged out successfully...');
  });

  app.get('/api/current_user', (req, res) => {
    // res.send(req.session);
    res.send(req.user);
    //res.status(200).JSON(req.user);
  });
};
