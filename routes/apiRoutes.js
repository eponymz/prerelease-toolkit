const User = require('../models/user');
const bodyParser = require('body-parser');

module.exports = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

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

  app.get('/api/create_user', (req, res) => {
    res.send({ success: true });
  });

  app.post('/api/create_user', (req, res) => {
    const googleId = req.body.googleId;
    const email = req.body.emailVal;

    var newUser = new User({
      googleId: googleId,
      email: [
        {
          value: email,
          type: 'account'
        }
      ]
    });

    User.createUser(newUser, function(err) {
      if (err) throw err;
      console.log('User created by:' + req.user + '. Moving along...');
    });

    // const user = await new User({
    //   googleId: req.body.googleId,
    //   email: req.body.emailVal
    // }).save();
    // done(null, user);
    console.log('User created. Moving along...');
    res.redirect('/z/lazy');
  });
};
